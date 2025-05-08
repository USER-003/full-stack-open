import axios from "axios";

const getAll = () => { 
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return request.then(response => response.data)
}

const getCountrie = (countrie) => { 
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countrie}`)
    return request.then(response => response.data)
}

export default {getAll, getCountrie}