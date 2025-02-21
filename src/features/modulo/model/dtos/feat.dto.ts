export type ModuloPatchDTO = Partial<ModuloPostDTO> & { id: number };



export interface ModuloDeleteDTO {
    id: number;
}
export interface ModuloPostDTO {
    nombre: string;
    descripcion: string;
    iva: number;
}
