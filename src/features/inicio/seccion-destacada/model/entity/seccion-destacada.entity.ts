import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface SeccionDestacadaResponse {
    data: SeccionDestacadaEntity[];
    metadata: MetadataEntity;
}



export interface SeccionDestacadaEntity {
    id: number;
    image: string;
    imagePosition: string;
    title: string;
    text: string;
    pagina: Pagina;
}

export interface Pagina {
    id: number;
    nombre: string;
    path: string;
    title: string;
}
