import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface CategoriaTypeResponse {
    data: CategoriaTypeEntity[];
    metadata: MetadataEntity;
}

export interface CategoriaTypeEntity {
    id: number;
    nombre: string;
}

