import { FieldValue } from 'firebase-admin/firestore';

export function serverTimestamp(): FieldValue {
  return FieldValue.serverTimestamp();
}
