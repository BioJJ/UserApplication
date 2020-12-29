import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002'
});

class ApiService{

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return api.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return api.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return api.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return api.get(requestUrl)
    }

}

export default ApiService;