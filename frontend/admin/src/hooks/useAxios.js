import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url, method="get") => {

    //set different state
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ data, setData] = useState(null);
    const [ options, setOptions ] = useState(null);

    const  postData = (postData) => {
        setOptions({
            method: 'post',
            headers: {
                contentType: 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }

    //State useEffect function
    useEffect(() => {

        const FetchData = async (fetchOptions) => {

            setLoading(true)

            try {

                
                const response = await axios({ url, ...fetchOptions });
                setData(response.data[0]);
                setLoading(false)

            } catch (error) {

                if (error) {
                    setLoading(false)
                    setError('Data could not be fetched');
                }

            }
        }

        if (method === "get") {
            FetchData()
        } else if (method === "post") {
            FetchData(postData)
        }
        

    }, [url, method, options])

    return { data, loading, error, postData };

}
