import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";

import { NoticiaDeleteDTO, NoticiaPatchDTO, NoticiaPostDTO } from "../model/dtos/noticia.dto";
import { NoticiaURL } from "./url/noticia.url";


const url = NoticiaURL;

class Noticia {
    async getNoticiaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getNoticiaById(NoticiaId: number) {
        return await Axios.get(replaceParamId(url.getById, NoticiaId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postNoticia(req: NoticiaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchNoticia(req: NoticiaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteNoticia(NoticiaId: NoticiaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, NoticiaId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const NoticiaApi = new Noticia();