
export async function doFetch(url, options = {}) {
    const loadingSpinner = document.getElementById('loading-spinner');
    try {
        loadingSpinner.style.display = 'block';
        const headers = {
            "Content-Type": "application/json",
        };
        const combinedOptions = { headers, ...options};
        const response = await fetch(url, combinedOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error:" + error.message);
        alert('An error occurred while fetching data. Please try again later.');
    } finally {
        // Do cleanups
        loadingSpinner.style.display = 'none';
    }
}