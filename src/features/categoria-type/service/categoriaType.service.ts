import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { CategoriaTypeURL } from "./url/categoriaType.url";
import { CategoriaTypeDeleteDTO, CategoriaTypePatchDTO, CategoriaTypePostDTO } from "../model/dtos/categoriaType.dto";


const url = CategoriaTypeURL;

class CategoriaType {
    async getCategoriaTypeSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getCategoriaTypeById(CategoriaTypeId: number) {
        return await Axios.get(replaceParamId(url.getById, CategoriaTypeId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postCategoriaType(req: CategoriaTypePostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchCategoriaType(req: CategoriaTypePatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteCategoriaType(CategoriaTypeId: CategoriaTypeDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, CategoriaTypeId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const CategoriaTypeApi = new CategoriaType();