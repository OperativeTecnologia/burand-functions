import { FieldValue } from 'firebase-admin/firestore';
export function serverTimestamp() {
    return FieldValue.serverTimestamp();
}
