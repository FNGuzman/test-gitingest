import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface NoticiaResponse {
    data: NoticiaEntity[];
    metadata: MetadataEntity;
}


export interface NoticiaEntity {
    id: number;
    titulo: string;
    bajada: string;
    noticia: string;
    autor: string;
    estado: string;
    fecha: string;
    imgMiniatura: string;
    imgPortada: string;
}
