import axios from 'axios';
import qs from 'qs';

export default function ajax(url, data={}, method){
    if(method == 'POST'){
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        };
        return axios(options);
    }
    else if(method == 'GET'){
        console.log('ajax');
        console.log(url, data, method);
        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        }
        return axios(options);
    }
    else{

    }
}
