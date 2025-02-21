import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { SeccionDestacadaURL } from "./url/seccion-destacada.url";
import { SeccionDestacadaDeleteDTO, SeccionDestacadaPatchDTO, SeccionDestacadaPostDTO } from "../model/dtos/seccion-destacada.dto";


const url = SeccionDestacadaURL;

class SeccionDestacada {
    async getSeccionDestacadaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getSeccionDestacadaById(SeccionDestacadaId: number) {
        return await Axios.get(replaceParamId(url.getById, SeccionDestacadaId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postSeccionDestacada(req: SeccionDestacadaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchSeccionDestacada(req: SeccionDestacadaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteSeccionDestacada(SeccionDestacadaId: SeccionDestacadaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, SeccionDestacadaId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const SeccionDestacadaApi = new SeccionDestacada();