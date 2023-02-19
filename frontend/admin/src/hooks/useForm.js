import { useState, useEffect } from 'react';
import axios from 'axios';

export const useForm = (url, method) => {

    //set different state
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ response, setResponse ] = useState(null);
    const [ options, setOptions ] = useState(null);

    const  postData = (formData) => {
        setOptions({
            method: method,
            url: url,
            data: formData
        })
    }

    // const [ options, setOptions ] = useState(null);

    //State useEffect function
    useEffect(() => {

        const FetchData = async () => {

            setLoading(true)

            try {

                const result = await axios(options);
                setResponse(JSON.stringify(result.data[0].message));
                setLoading(false);

            } catch (error) {

                if (error) {
                    setLoading(false)
                    setError('Data could not be fetched');
                }

            }
        }

        FetchData()
        
    }, [url, options])

    return { response, loading, error, postData };

}
