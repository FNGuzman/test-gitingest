export type TagTypePatchDTO = Partial<TagTypePostDTO> & { id: number };

export interface TagTypePostDTO {
    nombre: string;
}

export interface TagTypeDeleteDTO {
    id: number;
}