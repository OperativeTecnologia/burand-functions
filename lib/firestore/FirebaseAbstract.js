import { getFirestore } from 'firebase-admin/firestore';
import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
import { serverTimestamp } from './serverTimestamp.js';
export class FirebaseAbstract {
    collectionName;
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    add(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.createdAt = serverTimestamp();
            clone.updatedAt = null;
        }
        delete clone.id;
        return this.collection().add(clone);
    }
    update(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.updatedAt = serverTimestamp();
            delete clone.createdAt;
        }
        delete clone.id;
        return this.collection().doc(data.id).update(clone);
    }
    set(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.createdAt = serverTimestamp();
            clone.updatedAt = null;
        }
        delete clone.id;
        return this.collection().doc(data.id).set(clone, options);
    }
    delete(id) {
        return this.collection().doc(id).delete();
    }
    async getById(id, options = { timestamps: true }) {
        const doc = await this.collection().doc(id).get();
        if (!doc.exists) {
            throw new DocumentNotFoundError();
        }
        return ofFirestore(doc, options.timestamps);
    }
    async getByIds(ids, options = { timestamps: true }) {
        const promises = ids.map(id => this.getById(id, options));
        return Promise.all(promises);
    }
    async getAll(options = { timestamps: true }) {
        const { docs } = await this.collection().get();
        return docs.map(doc => ofFirestore(doc, options.timestamps));
    }
    collection() {
        return getFirestore().collection(this.collectionName);
    }
}
