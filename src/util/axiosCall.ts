import axios from "axios";
import LocalStorage from "./localstorage";

export const rotateRefresh = async () => {
    try { 
        const res = await axios.get(`https://server.farmingsoon.site/api/members/refresh-token/rotate`, {
            withCredentials: true
        });

        if(res.status === 200){
            console.log("RefreshToken 업데이트 완료 ");
            //페이지 리로드 || 함수 재 실행 -> 불가
            
        }
        
    } catch (err){
        if(axios.isAxiosError(err) && err.response){
            if(err.response.status === 401){
                LocalStorage.setItem("loginState", "false");
                console.log("RefreshToken 만료");
                throw new Error("RefreshTokenUnauthorized");
            } else if (err.response.status === 400){
                LocalStorage.setItem("loginState", "false");
                console.log("RefreshToken 만료: 02");
                throw new Error("RefreshTokenUnauthorized");
            }       
        };

        console.log("rotate 함수 에러", err);
    }
}


export const axiosCall = async (url: string, method:string, data = {}, options = {} ) => {

    const baseURL = "https://server.farmingsoon.site" + url;
    const config = {
        ...options,
    };

    try { 
        if(method === "GET") {
            const res = await axios.get(baseURL, config );
            if(res.status === 200){
                // console.log("get 요청 성공")
                return res.data.result;
            }
        }

        if(method === "POST") {
            const res = await axios.post(baseURL, data, config);
            if(res.status === 200) {
                // console.log("post 요청 성공");
                return res;
            }
        }

        if(method === "PATCH"){
            const res = await axios.patch(baseURL, data, config);
            if(res.status === 200){
                // console.log("patch 요청 성공");
                return res;
            }
        }

        if(method === "DELETE"){
            const res = await axios.delete(baseURL, config);
            if(res.status === 200) {
                // console.log("delete 요청 성공");
                return res;
            }
        }

    } catch (err){
        console.log(err);
        if(axios.isAxiosError(err) && err.response){
            if(err.response.status === 401 && err.response.data.message === "기한이 만료된 AccessToken입니다.") {
                //AT 만료 
                console.log("AcessToken 만료");
                rotateRefresh()
            }
            
            if(err.response.status === 401 && err.response.data.message === "기한이 만료된 RefreshToken입니다") {
                //RT 만료
                console.log("RefreshToken 만료");
                throw new Error("RefreshTokenUnauthorized");

            }
            
        }
    }
    
}