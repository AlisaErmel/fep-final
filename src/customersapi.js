export function fetchCustomers() {
    return fetch(import.meta.env.VITE_API_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        })
}


export function deleteCustomer(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText)

            return response.json();
        })
}

export function saveCustomer(newCar) {
    return fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newCar)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in saving: " + response.statusText);

            return response.json();
        })
}

export function updateCustomer(url, updatedCar) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedCar)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in update: " + response.statusText);

            return response.json();
        })
}