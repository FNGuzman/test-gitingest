export const Noticia = "/noticia";

export const NoticiaURL = {
    get: `${Noticia}/search`,
    getById: `${Noticia}/:id`,
    post: `${Noticia}`,
    patch: `${Noticia}/:id`,
    delete: `${Noticia}/:id`
};