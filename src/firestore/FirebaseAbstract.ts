import { getFirestore } from 'firebase-admin/firestore';
import type { DocumentReference, WriteResult, CollectionReference, SetOptions } from 'firebase-admin/firestore';

import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { AddDocument, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
import { serverTimestamp } from './serverTimestamp.js';
import { Model } from './Model.js';

type IOptions = {
  timestamps: boolean;
};

export abstract class FirebaseAbstract<T extends Model> {
  public constructor(protected collectionName: string) {}

  public add(data: AddDocument<T>, options: IOptions = { timestamps: true }): Promise<DocumentReference> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    return this.collection().add(clone);
  }

  public update(data: UpdateDocument<T>, options: IOptions = { timestamps: true }): Promise<WriteResult> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.updatedAt = serverTimestamp();
      delete clone.createdAt;
    }

    delete clone.id;

    return this.collection().doc(data.id).update(clone);
  }

  public set(data: SetDocument<T>, options: SetOptions & IOptions = { timestamps: true }): Promise<WriteResult> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    return this.collection().doc(data.id).set(clone, options);
  }

  public delete(id: string): Promise<WriteResult> {
    return this.collection().doc(id).delete();
  }

  public async getById(id: string, options: IOptions = { timestamps: true }): Promise<T> {
    const doc = await this.collection().doc(id).get();

    if (!doc.exists) {
      throw new DocumentNotFoundError();
    }

    return ofFirestore(doc, options.timestamps);
  }

  public async getByIds(ids: string[], options: IOptions = { timestamps: true }): Promise<T[]> {
    const promises = ids.map(id => this.getById(id, options));
    return Promise.all(promises);
  }

  public async getAll(options: IOptions = { timestamps: true }): Promise<T[]> {
    const { docs } = await this.collection().get();
    return docs.map(doc => ofFirestore(doc, options.timestamps));
  }

  protected collection(): CollectionReference {
    return getFirestore().collection(this.collectionName);
  }
}
