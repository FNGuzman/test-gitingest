import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface ModuloResponse {
    data: ModuloEntity[];
    metadata: MetadataEntity;
}

export interface ModuloEntity {
    id: number;
    nombre: string;
    descripcion: string;
    iva: Iva;
}

export interface Iva {
    id: string;
    desc: string;
}
