const BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
    post: async (endpoint: string, body: object, token?: string) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Autherization: `Bearer ${token}`})
            },
            body: JSON.stringify(body)
        });
        return res;
    },

    get: async (endpoint: string, token?: string) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return res;
    },

    patch: async (endpoint: string, body: object, token: string) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        return res;
    }
}
