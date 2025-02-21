import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";

// Definir una interfaz base que garantice `id`
export interface BaseEntity {
    id: number;
}

export class BaseService<T extends BaseEntity> {
    protected urls: {
        get: string;
        getById: string;
        post: string;
        patch: string;
        delete: string;
    };

    constructor(urls: {
        get: string;
        getById: string;
        post: string;
        patch: string;
        delete: string;
    }) {
        this.urls = urls;
    }

    getAll = () => Axios.get<T[]>(this.urls.get, { cancelToken: cancelTokenSource.token });

    getById = (id: number) => Axios.get<T>(replaceParamId(this.urls.getById, id), {
        cancelToken: cancelTokenSource.token,
    });

    create = (data: Omit<T, "id">) => Axios.post(this.urls.post, data, {
        cancelToken: cancelTokenSource.token,
    });

    update = (data: Partial<T> & { id: number }) =>
        Axios.patch(replaceParamId(this.urls.patch, data.id), omitId(data), {
            cancelToken: cancelTokenSource.token,
        });


    delete = (id: number) => Axios.delete(replaceParamId(this.urls.delete, id), {
        cancelToken: cancelTokenSource.token,
    });
}
