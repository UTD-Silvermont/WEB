import axios from 'axios';

export default function ajax(url, data={}, method='GET'){
    if(method == 'GET'){
        return axios.get(url, {
            params: data
        });
    }
    else if(method == 'POST'){
        return axios.post(url, {
            params: data
        })
    }
}
