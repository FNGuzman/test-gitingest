import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface TagTypeResponse {
    data: TagTypeEntity[];
    metadata: MetadataEntity;
}

export interface TagTypeEntity {
    id: number;
    nombre?: string;
}