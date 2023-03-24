import {
  getFirestore,
  DocumentReference,
  WriteResult,
  CollectionReference,
  SetOptions,
  WhereFilterOp,
  OrderByDirection
} from 'firebase-admin/firestore';

import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { AddDocument, IFirebaseWhere, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
import { serverTimestamp } from './serverTimestamp.js';
import { Model } from './Model.js';

type IWriteOptions = {
  /**
   * Adicionar atributos `createdAt` em criações e `updatedAt` em atualizações
   */
  timestamps: boolean;
};

type IReadOptions = {
  /**
   * Converter atributos `createdAt` e `updatedAt` no tipo `Date` do JavaScript
   */
  timestamps: boolean;
};

/**
 * A interface do serviço Cloud Firestore.
 *
 * Não chame esse construtor diretamente.
 * Em vez disso, crie um repositório e estenda o comportamento
 */
export abstract class FirebaseAbstract<T extends Model> {
  /**
   * @param {string} collectionName - Nome da coleção no Firestore
   */
  public constructor(protected collectionName: string) {}

  /**
   * Adicione um novo documento ao Firestore
   *
   * @param data - Um objeto contendo os dados do novo documento.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvido com o id do documento criado.
   */
  public add(data: AddDocument<T>, options: IWriteOptions = { timestamps: true }): Promise<DocumentReference> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    return this.collection().add(clone);
  }

  /**
   * Altere um documento existente no Firestore
   *
   * @param data - Um objeto contendo os dados a serem alterados.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida vazia.
   */
  public update(data: UpdateDocument<T>, options: IWriteOptions = { timestamps: true }): Promise<WriteResult> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.updatedAt = serverTimestamp();
      delete clone.createdAt;
    }

    delete clone.id;

    return this.collection().doc(data.id).update(clone);
  }

  /**
   * Grava no documento referenciado pelo `id` especificado. Se
   * o documento ainda não existe, ele será criado. Se você fornecer `merge`
   * ou `mergeFields`, os dados fornecidos podem ser mesclados em um documento existente.
   *
   * @param data - Um objeto contendo os dados a serem adicionados ou alterados.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida vazia.
   */
  public set(data: SetDocument<T>, options: SetOptions & IWriteOptions = { timestamps: true }): Promise<WriteResult> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    return this.collection().doc(data.id).set(clone, options);
  }

  /**
   * Exclui o documento referenciado pelo `id` especificado.
   *
   * @param {string} id - Id do documento a ser excluído.
   * @returns Um `Promise` resolvida vazia.
   */
  public async delete(id: string): Promise<void> {
    await this.collection().doc(id).delete();
  }

  /**
   * Busca um documento pelo seu id.
   *
   * @param id - Id do documento a ser buscado.
   * @param options - Um objeto para configurar o comportamento definido.
   * @throws {DocumentNotFoundError}
   * @returns Um `Promise` resolvida com o conteúdo do documento.
   */
  public async getById(id: string, options: IReadOptions = { timestamps: true }): Promise<T> {
    const doc = await this.collection().doc(id).get();

    if (!doc.exists) {
      throw new DocumentNotFoundError();
    }

    return ofFirestore(doc, options.timestamps);
  }

  /**
   * Busca documentos por seus Ids.
   *
   * @param ids - Ids dos documentos a serem buscados.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida com o conteúdo do documentos.
   */
  public async getByIds(ids: string[], options: IReadOptions = { timestamps: true }): Promise<T[]> {
    const promises = ids.map(id => this.getById(id, options));
    return Promise.all(promises);
  }

  /**
   * Busca todos os documentos da coleção.
   *
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida com o conteúdo do documentos.
   */
  public async getAll(options: IReadOptions = { timestamps: true }): Promise<T[]> {
    const { docs } = await this.collection().get();
    return docs.map(doc => ofFirestore(doc, options.timestamps));
  }

  /**
   * Recupera documentos da coleção com base no campo, operador e valor fornecidos, bem como em opções adicionais.
   *
   * @async
   * @param field - A chave do campo pelo qual os documentos devem ser filtrados.
   * @param operator - O operador a ser usado na filtragem (por exemplo, "==" ou ">").
   * @param value - O valor a ser comparado na filtragem.
   * @param limit - O número máximo de documentos a serem retornados.
   * @param orderBy - A chave do campo pelo qual os resultados devem ser ordenados.
   * @param orderByDirection - A direção na qual os resultados devem ser ordenados.
   * @param options - As opções adicionais para a leitura dos documentos.
   * @returns Uma promessa que resolve em um array de documentos T.
   */
  protected async getWhere(
    field: keyof T,
    operator: WhereFilterOp,
    value: unknown,
    limit: number | null = null,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: IReadOptions = { timestamps: true }
  ): Promise<T[]> {
    let q = this.collection().where(field as string, operator, value);

    if (limit) {
      q = q.limit(limit);
    }

    if (orderBy) {
      q = q.orderBy(orderBy as string, orderByDirection || 'asc');
    }

    const { docs } = await q.get();

    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  /**
   * Recupera vários documentos da coleção com base nos filtros fornecidos e opções adicionais.
   *
   * @async
   * @param filters - Um array de objetos de filtro Firebase, cada um contendo um campo, um operador e um valor.
   * @param limit - O número máximo de documentos a serem retornados.
   * @param orderBy - A chave do campo pelo qual os resultados devem ser ordenados.
   * @param orderByDirection - A direção na qual os resultados devem ser ordenados.
   * @param options - As opções adicionais para a leitura dos documentos.
   * @returns Uma promessa que resolve em um array de documentos T.
   */
  protected async getWhereMany(
    filters: IFirebaseWhere<T>[],
    limit: number | null = null,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: IReadOptions = { timestamps: true }
  ): Promise<T[]> {
    let q = this.collection().where(filters[0].field as string, filters[0].operator, filters[0].value);

    filters.slice(1).forEach(({ field, operator, value }) => {
      q = q.where(field as string, operator, value);
    });

    if (limit) {
      q = q.limit(limit);
    }

    if (orderBy) {
      q = q.orderBy(orderBy as string, orderByDirection || 'asc');
    }

    const { docs } = await q.get();

    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  /**
   * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
   *
   * @returns A instância de `CollectionReference`.
   */
  protected collection(): CollectionReference {
    return getFirestore().collection(this.collectionName);
  }
}
