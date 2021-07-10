import {useState, useEffect} from 'react';

const useFetch = (url, errorMessage) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const abortController = new AbortController();

        // fake loading with setTimeout
        setTimeout(() => {
            fetch(url, { signal: abortController.signal })
                .then(res => {
                    if(!res.ok) {
                        throw Error(errorMessage);
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch((err) => {
                    if(err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                })
        }, 500)

        return () => abortController.abort();

    }, [url, errorMessage]);

    return {data, isLoading, error};
}

export default useFetch;
