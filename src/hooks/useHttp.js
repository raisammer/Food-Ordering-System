import { useCallback, useState } from "react"

const useHttp=()=>{
    const [isLoading,setLoading]=useState(false);
    const [errors,setError]=useState("");
    const sendRequest=useCallback(async(requestConfig,applyData)=>{
        setLoading(true);
        setError("");
        try {
            const response=await fetch(requestConfig.url,{
                method:requestConfig.method?requestConfig.method:"GET",
                body:requestConfig.body?JSON.stringify(requestConfig.body):null,
                header:requestConfig.header?requestConfig.header:{}
            })
            if(!response.ok){
                throw new Error("There is an error! Please try again.")
            }
            const data=await response.json();
            if(data==null)
                setError("There are no meals added")
            applyData(data)
        } catch (error) {
            setError(error.message||"Something went wrong");
        } 
        setLoading(false);
    },[])
    return {
        isLoading,
        errors,
        sendRequest
    }
}
export default useHttp