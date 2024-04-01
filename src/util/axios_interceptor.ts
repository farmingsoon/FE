import axios from "axios";
import { rotateRefresh } from "./axiosCall";


const instance = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BASE_URL,
});


instance.interceptors.request.use((config) => {
    config.withCredentials = true;

    return config;
}, (error) => {
    console.log(error);

    return Promise.reject(error);
}); 

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if(error.response?.status === 401 && error.response.data.message === "기한이 만료된 AccessToken입니다."){
        //token문제 - 기한이 만료된 accesstoken
        await rotateRefresh();

        //중단된 요청 새로운 토큰으로 재전송
        const originalResponse = await axios.request(error.config);
        return originalResponse;
    }if(error.response?.status === 401 && error.response.data.message === "기한이 만료된 RefreshToken입니다."){
        // recoil 별도의 설정을 위해 코드를 어떻게 수정해야 할까요. 
        throw new Error("RefreshTokenExpired")
    }



    return Promise.reject(error);
});

export default instance;