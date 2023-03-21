import { getFirestore } from 'firebase-admin/firestore';
import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
import { serverTimestamp } from './serverTimestamp.js';
/**
 * A interface do serviço Cloud Firestore.
 *
 * Não chame esse construtor diretamente.
 * Em vez disso, crie um repositório e estenda o comportamento
 */
export class FirebaseAbstract {
    collectionName;
    /**
     * @param {string} collectionName - Nome da coleção no Firestore
     */
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    /**
     * Adicione um novo documento ao Firestore
     *
     * @param data - Um objeto contendo os dados do novo documento.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvido com o id do documento criado.
     */
    add(data, options = { timestamps: true }) {
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
    update(data, options = { timestamps: true }) {
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
    set(data, options = { timestamps: true }) {
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
    async delete(id) {
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
    async getById(id, options = { timestamps: true }) {
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
     * @throws {DocumentNotFoundError}
     * @returns Um `Promise` resolvida com o conteúdo do documentos.
     */
    async getByIds(ids, options = { timestamps: true }) {
        const promises = ids.map(id => this.getById(id, options));
        return Promise.all(promises);
    }
    /**
     * Busca todos os documentos da coleção.
     *
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida com o conteúdo do documentos.
     */
    async getAll(options = { timestamps: true }) {
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
     * @throws {DocumentNotFoundError} - Se nenhum documento for encontrado com os filtros fornecidos.
     */
    async getWhere(field, operator, value, limit = null, orderBy = null, orderByDirection = null, options = { timestamps: true }) {
        let q = this.collection().where(field, operator, value);
        if (limit) {
            q = q.limit(limit);
        }
        if (orderBy) {
            q = q.orderBy(orderBy, orderByDirection || 'asc');
        }
        const { docs, empty } = await q.get();
        if (empty) {
            throw new DocumentNotFoundError();
        }
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
     * @throws {DocumentNotFoundError} - Se nenhum documento for encontrado com os filtros fornecidos.
     */
    async getWhereMany(filters, limit = null, orderBy = null, orderByDirection = null, options = { timestamps: true }) {
        let q = this.collection().where(filters[0].field, filters[0].operator, filters[0].value);
        filters.slice(1).forEach(({ field, operator, value }) => {
            q = q.where(field, operator, value);
        });
        if (limit) {
            q = q.limit(limit);
        }
        if (orderBy) {
            q = q.orderBy(orderBy, orderByDirection || 'asc');
        }
        const { docs, empty } = await q.get();
        if (empty) {
            throw new DocumentNotFoundError();
        }
        return docs.map(document => ofFirestore(document, options.timestamps));
    }
    /**
     * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
     *
     * @returns A instância de `CollectionReference`.
     */
    collection() {
        return getFirestore().collection(this.collectionName);
    }
}
