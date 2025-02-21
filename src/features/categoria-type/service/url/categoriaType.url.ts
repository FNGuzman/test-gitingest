export const CategoriaType = "/categoriaCategoriaNoticia";

export const CategoriaTypeURL = {
    get: `${CategoriaType}/search`,
    getById: `${CategoriaType}/:id`,
    post: `${CategoriaType}`,
    patch: `${CategoriaType}/:id`,
    delete: `${CategoriaType}/:id`
};