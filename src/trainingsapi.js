export const fetchTrainings = async () => {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
    if (!response.ok) throw new Error('Failed to fetch trainings');
    return await response.json();
};



export function deleteTrainings(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText)

            return response.json();
        })
}

export function saveTraining(newTraining) {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTraining)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in saving: " + response.statusText);

            return response.json();
        });
}
