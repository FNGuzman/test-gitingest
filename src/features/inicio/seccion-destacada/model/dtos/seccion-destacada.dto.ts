export type SeccionDestacadaPatchDTO = Partial<SeccionDestacadaPostDTO> & { id: number };


export interface SeccionDestacadaPostDTO {
    image: string;
    imagePosition: string;
    title: string;
    text: string;
    paginaId: number;
}


export interface SeccionDestacadaDeleteDTO {
    id: number;
}

