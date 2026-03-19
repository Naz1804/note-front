const BASE_URL = import.meta.env.API_URL;

export const getAllNotes = (endpoint: string, token: string) => {
    return fetch(`${BASE_URL}/notes${endpoint}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

export const getTagsNote = (token: string) => {
    return fetch(`${BASE_URL}/notes/tags`, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

export const getTag = (token: string, query: string) => {
    return fetch(`${BASE_URL}/notes/tag?q=${query}`, {
        headers: { Authorization: `Bearer ${token}`}
    })
}

export const createNote = (token: string, body: object) => {
    return fetch(`${BASE_URL}/notes/create`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const getNote = (token: string, id: string) => {
    return fetch(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    })
}

export const updateNote = (token: string, id: string, body: object) => {
    return fetch(`${BASE_URL}/notes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const deleteNote = (token: string, id: string) => {
    return fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const archiveNote = (token: string, id: string) => {
    return fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: 'PATCH',
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const searchNote = (token: string, query: string) => {
    return fetch(`${BASE_URL}/notes/search?q=${query}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
}