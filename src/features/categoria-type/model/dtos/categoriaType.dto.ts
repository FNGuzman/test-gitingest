export type CategoriaTypePatchDTO = Partial<CategoriaTypePostDTO> & { id: number };

export interface CategoriaTypePostDTO {
    nombre: string;
}

export interface CategoriaTypeDeleteDTO {
    id: number;
}