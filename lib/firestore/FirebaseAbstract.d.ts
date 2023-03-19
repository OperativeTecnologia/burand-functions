import { DocumentReference, WriteResult, CollectionReference, SetOptions } from 'firebase-admin/firestore';
import { AddDocument, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
import { Model } from './Model.js';
type IOptions = {
    timestamps: boolean;
};
export declare abstract class FirebaseAbstract<T extends Model> {
    protected collectionName: string;
    constructor(collectionName: string);
    add(data: AddDocument<T>, options?: IOptions): Promise<DocumentReference>;
    update(data: UpdateDocument<T>, options?: IOptions): Promise<WriteResult>;
    set(data: SetDocument<T>, options?: SetOptions & IOptions): Promise<WriteResult>;
    delete(id: string): Promise<WriteResult>;
    getById(id: string, options?: IOptions): Promise<T>;
    getByIds(ids: string[], options?: IOptions): Promise<T[]>;
    getAll(options?: IOptions): Promise<T[]>;
    protected collection(): CollectionReference;
}
export {};
