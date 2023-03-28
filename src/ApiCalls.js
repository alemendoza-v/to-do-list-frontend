export async function fetchAllToDos() {
    return fetch('/todos') 
    .then((response) => response.json())
    .then((response) => {
        if(response.status === 200) {
            const toDos = response.data;
            const prev = response.prev;
            const next = response.next;
            const pages = response.pages;
            return {
                'toDos': toDos,
                'prev': prev,
                'next': next,
                'pages': pages
            }
        } else if(response.status === 400) {
            return null;
        }
    })
}

export async function createToDo(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch('/todos', requestOptions)
    .then(response => response.json())
    .then((response => {
        return response;
    }))
}

export async function deleteToDo(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`/todos/${id}`, requestOptions)
    .then(response => {
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    })
}

export async function getMetrics() {
    return fetch('/todos/metrics')
    .then((response) => response.json())
    .then((response) => { return response })
}

export async function setToDoAsDone(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`/todos/${id}/done`, requestOptions)
    .then(response => response.json())
    .then(response => { return response })
}

export async function setToDoAsUndone(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`/todos/${id}/undone`, requestOptions)
    .then(response => response.json())
    .then(response => { return response })
}

export async function fetchApi(url) {
    return fetch(url)
    .then(response => response.json())
    .then(response => { return response })
}

export async function updateToDo(id, data) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`/todos/${id}`, requestOptions)
    .then(response => response.json())
    .then(response => { return response })
}