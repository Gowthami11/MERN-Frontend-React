import React, { useState, useCallback, useRef, useEffect } from 'react'

export default function useHttpClient() {

    const [isLoading, setisLoading] = useState(false);
    const [error, seterror] = useState(null);
    //to stop previous active requests
    const activeHttpRequests = useRef([])
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setisLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signall: httpAbortCtrl.signal
            })
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );
            
            if (!response.ok)
                throw new Error(responseData.message || 'Something went wrong, please try again');

            setisLoading(false);

            return responseData
        } catch (e) {
            seterror(e.message || 'Something went wrong, Please try again lateer');
            setisLoading(false);
            throw e

        }

    }, [])
    const clearError = () => {
        seterror(null)
    }
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(ctrlr => ctrlr.abort()
            );
        }
    }, [])
    return { isLoading, error, sendRequest, clearError }

}
