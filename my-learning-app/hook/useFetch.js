import { useState,useEffect } from "react";
import axios from 'axios'
const useFetch = (endpoint,q)=>{
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null) 
    //api options and call
const options = {
  method: 'GET',
  url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  params: {...q},
  headers: {
    'X-RapidAPI-Key': '86ed0b2371msh2f2c511f42263bcp17de50jsn49e04a65b531',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};
const fetchData = async()=>{
    setIsLoading(true)
try {
	const response = await axios.request(options);
    setData(response.data.data)
} catch (error) {
    setError(true)
    alert(error)
	console.error(error);
}
finally{
    setIsLoading(false)
}
}
useEffect(() => {

    if(endpoint!= undefined){

  fetchData()

    }
}, [])
const reFetch=()=>{
    setIsLoading(true)
    fetchData()
}
return {data,isLoading,error,reFetch};
}
export default useFetch