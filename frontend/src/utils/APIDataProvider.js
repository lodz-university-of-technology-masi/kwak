import {API} from "aws-amplify";

export const dataProvider = {
    getList: async (resource, params) => {
        const data = await API.get('kwakApi', `/${resource}`, {});
        return {
            data: data,
            total: data.length
        };
    },

    getOne: async (resource, params) => {
        const data = await API.get('kwakApi', `/${resource}/${params.id}`, {});
        return {
            data: data
        }
    },

    getMany: (resource, params) => {
    },

    getManyReference: (resource, params) => {
    },

    create: async (resource, params) => {
        const data = await API.post('kwakApi', `/${resource}`, {body: params.data});
        return {
            data: {...params.data, id: data.id},
        }
    },

    update: async (resource, params) =>
        API.put('kwakApi', `/${resource}/${params.id}`, {body: params.data}).then(() => ({
            data: params.data,
        })),

    updateMany: (resource, params) => {
    },

    delete: async (resource, params) => {
        await API.del('kwakApi', `/${resource}/${params.id}`, {});
        return {
            data: {
                id: params.id,
                previousData: params.data
            }
        }
    },

    deleteMany: async (resource, params) => {
        params.ids.map(id => API.del('kwakApi', `/${resource}/${id}`, {}));
        return {
            data: params.ids
        }
    },
};