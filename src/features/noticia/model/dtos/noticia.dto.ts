export type NoticiaPatchDTO = Partial<NoticiaPostDTO> & { id: number };

export interface NoticiaPostDTO {
    titulo: string;
    bajada: string;
    noticia: string;
    autor: string;
    estado: string;
    fecha: string;
    imgMiniatura: string;
    imgPortada: string;
    categoria: number;
    pagina: number;
}

export interface NoticiaDeleteDTO {
    id: number;
}


