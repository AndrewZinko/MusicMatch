export const useHttp = () => {
    const request = async (url, method = "POST", body, headers={"Content-Type": "application/json"}) => {
        try {
            const response = await fetch(url, {method, body, headers});
            
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status}`)
            }

            return await response.json();
        } catch (e) {
            throw e;
        }
    };

    return {request};
}