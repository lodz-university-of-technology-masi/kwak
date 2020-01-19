import {API} from "aws-amplify";

const dataProvider = {
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

    getMany: async (resource, params) => {
        const objects = Promise.all(params.ids.map(async function(x) {
            return await API.get('kwakApi', `/${resource}/${x}`, {});
        }));

        return {
            data: await objects
        };
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
                id: params.id
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

const dataProviderCSV = {
    ...dataProvider,
    create: async (resource, params) => {
        if (resource !== 'tests' || !params.data.file) {
            return dataProvider.create(resource, params);
        }

        const {key, url} = await API.post('kwakApi', `/upload`, {});
        await fetch(url, {
            method: 'PUT',
            body:  params.data.file.rawFile
        });

        const test = await API.post('kwakApi', `/tests/import`, {
            body: {
                testTitle: params.data.title,
                fileKey: key
            }
        });
        return {
            data: test
        }
    }
};

const errorHandlingDataProvider = {};
for (let [k, v] of Object.entries(dataProviderCSV)) {
    errorHandlingDataProvider[k] = async (resource, params) => {
        try {
            return await v(resource, params)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                throw new Error(err.response.data.message)
            }

        }
    }
}

export const apiDataProvider = {...errorHandlingDataProvider};