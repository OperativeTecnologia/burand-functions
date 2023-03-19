import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
/**
 * Convert Firestore data into an object of type T
 */
export declare function ofFirestore<T>(document: DocumentSnapshot<DocumentData>, hasTimestamp?: boolean): T;
