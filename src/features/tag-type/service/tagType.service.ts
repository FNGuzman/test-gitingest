import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { TagTypeURL } from "./url/tagType.url";
import { TagTypeDeleteDTO, TagTypePatchDTO, TagTypePostDTO } from "../model/dtos/tagType.dto";


const url = TagTypeURL;

class TagType {
    async getTagTypeSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getTagTypeById(TagTypeId: number) {
        return await Axios.get(replaceParamId(url.getById, TagTypeId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postTagType(req: TagTypePostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchTagType(req: TagTypePatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteTagType(TagTypeId: TagTypeDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, TagTypeId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const TagTypeApi = new TagType();