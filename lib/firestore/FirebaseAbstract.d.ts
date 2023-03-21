import { DocumentReference, WriteResult, CollectionReference, SetOptions, WhereFilterOp, OrderByDirection } from 'firebase-admin/firestore';
import { AddDocument, IFirebaseWhere, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
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
export declare abstract class FirebaseAbstract<T extends Model> {
    protected collectionName: string;
    /**
     * @param {string} collectionName - Nome da coleção no Firestore
     */
    constructor(collectionName: string);
    /**
     * Adicione um novo documento ao Firestore
     *
     * @param data - Um objeto contendo os dados do novo documento.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvido com o id do documento criado.
     */
    add(data: AddDocument<T>, options?: IWriteOptions): Promise<DocumentReference>;
    /**
     * Altere um documento existente no Firestore
     *
     * @param data - Um objeto contendo os dados a serem alterados.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida vazia.
     */
    update(data: UpdateDocument<T>, options?: IWriteOptions): Promise<WriteResult>;
    /**
     * Grava no documento referenciado pelo `id` especificado. Se
     * o documento ainda não existe, ele será criado. Se você fornecer `merge`
     * ou `mergeFields`, os dados fornecidos podem ser mesclados em um documento existente.
     *
     * @param data - Um objeto contendo os dados a serem adicionados ou alterados.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida vazia.
     */
    set(data: SetDocument<T>, options?: SetOptions & IWriteOptions): Promise<WriteResult>;
    /**
     * Exclui o documento referenciado pelo `id` especificado.
     *
     * @param {string} id - Id do documento a ser excluído.
     * @returns Um `Promise` resolvida vazia.
     */
    delete(id: string): Promise<void>;
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - Id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento definido.
     * @throws {DocumentNotFoundError}
     * @returns Um `Promise` resolvida com o conteúdo do documento.
     */
    getById(id: string, options?: IReadOptions): Promise<T>;
    /**
     * Busca documentos por seus Ids.
     *
     * @param ids - Ids dos documentos a serem buscados.
     * @param options - Um objeto para configurar o comportamento definido.
     * @throws {DocumentNotFoundError}
     * @returns Um `Promise` resolvida com o conteúdo do documentos.
     */
    getByIds(ids: string[], options?: IReadOptions): Promise<T[]>;
    /**
     * Busca todos os documentos da coleção.
     *
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida com o conteúdo do documentos.
     */
    getAll(options?: IReadOptions): Promise<T[]>;
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
     * @throws {DocumentNotFoundError} - Se nenhum documento for encontrado com os filtros fornecidos.
     */
    protected getWhere(field: keyof T, operator: WhereFilterOp, value: unknown, limit?: number | null, orderBy?: keyof T | null, orderByDirection?: OrderByDirection | null, options?: IReadOptions): Promise<T[]>;
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
     * @throws {DocumentNotFoundError} - Se nenhum documento for encontrado com os filtros fornecidos.
     */
    protected getWhereMany(filters: IFirebaseWhere<T>[], limit?: number | null, orderBy?: keyof T | null, orderByDirection?: OrderByDirection | null, options?: IReadOptions): Promise<T[]>;
    /**
     * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
     *
     * @returns A instância de `CollectionReference`.
     */
    protected collection(): CollectionReference;
}
export {};
