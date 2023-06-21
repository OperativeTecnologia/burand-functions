import { FieldValue, WhereFilterOp } from 'firebase-admin/firestore';
import { Model } from '../firestore/Model.js';

/**
 * Definição de tipo para adicionar um novo documento a uma coleção do `Firestore`.
 *
 * @template T - O `Model` para o documento que está sendo adicionado.
 * @returns As chaves de `Model` excluindo os atributos `id`, `createdAt` e `updatedAt`
 */
export type AddDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]: T[P] | FieldValue;
};

/**
 * Definição de tipo para criar ou substituir um documento em uma coleção do `Firestore`.
 *
 * @template T - O `Model` para o documento que está sendo adicionado ou substituido.
 * @returns As chaves de `Model` excluindo os atributos `createdAt` e `updatedAt`
 */
export type SetDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]: T[P] | FieldValue;
} & Pick<T, 'id'>;

/**
 * Definição de tipo para atualizar um documento em uma coleção do `Firestore`.
 *
 * @template T - O `Model` para o documento que está sendo atualizado.
 * @returns As chaves de `Model` excluindo os atributos `createdAt` e `updatedAt`, com o `id` como obrigatório e o restante dos atributos como opcional
 */
export type UpdateDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]?: T[P] | FieldValue;
} & Pick<T, 'id'>;

/**
 * Define um tipo para uma cláusula where do Firebase.
 *
 * @template T - Um tipo genérico que estende o modelo de dados.
 * @property {keyof T} field - A chave do campo no modelo de dados a ser usado na cláusula where.
 * @property {WhereFilterOp} operator - O operador a ser usado na cláusula where (por exemplo, "==" ou ">").
 * @property {unknown} value - O valor a ser comparado na cláusula where.
 */
export type FirebaseWhere<T extends Model> =
  | {
      field: keyof T;
      operator: WhereFilterOp;
      value: unknown;
    }
  | [keyof T, WhereFilterOp, unknown];
