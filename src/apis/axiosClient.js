import axios from "axios";
import queryString from "query-string";
import { getAuth } from "firebase/auth";


const getFirebaseToken = async () => {
    const currentUser = getAuth().currentUser;
    if(currentUser) return currentUser.getIdToken();

    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
            console.log('Reject timeout');
        }, 10000);

        const unregisterAuthObserver = getAuth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject(null);
            }

            const token = await user.getIdToken();
            resolve(token);

            unregisterAuthObserver();
            clearTimeout(waitTimer);
        });
    });
}


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    Headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
    
    const token = await getFirebaseToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(function (response) {
    if(response && response.data){
        return response.data;
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default axiosClient;