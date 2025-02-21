export const TagType = "/categoriaTag";

export const TagTypeURL = {
    get: `${TagType}/search`,
    getById: `${TagType}/:id`,
    post: `${TagType}`,
    patch: `${TagType}/:id`,
    delete: `${TagType}/:id`
};