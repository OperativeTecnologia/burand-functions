import { FieldValue } from 'firebase-admin/firestore';
import { Model } from '../firestore/Model.js';

export type AddDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]: T[P] | FieldValue;
};

export type SetDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]: T[P] | FieldValue;
} & Pick<T, 'id'>;

export type UpdateDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]?: T[P] | FieldValue;
} & Pick<T, 'id'>;
