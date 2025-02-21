
import { BaseService } from "../../../service/BaseService";
import { CategoriaTypeEntity } from "../model/entity/categoriaType.entity";
import { CategoriaTypeURL } from "./url/categoriaType.url";

class CategoriaTypeService extends BaseService<CategoriaTypeEntity> {
    constructor() {
        super(CategoriaTypeURL);
    }
}

export const CategoriaTypeApi = new CategoriaTypeService();