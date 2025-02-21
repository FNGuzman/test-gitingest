export const ModuleName = "/categoria";

export const ModuleNameURL = {
    get: `${ModuleName}/search`,
    getById: `${ModuleName}/:id`,
    post: `${ModuleName}`,
    patch: `${ModuleName}/:id`,
    delete: `${ModuleName}/:id`
};