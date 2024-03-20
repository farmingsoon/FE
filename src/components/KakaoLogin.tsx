import KAKAO from "@/../public/img/KAKAO.png";
import Image from "next/image";
import { useEffect } from "react";

declare global {
    interface Window {
        Kakao: any
    }
};

const BASER_URL = process.env.NEXT_PUBLIC_BASE_URL;
const redirectURI = `${BASER_URL}/oauth2/authorization/kakao`;
const scope = [
    "profile_nickname",
    "profile_image",
    "account_email",
].join(",");

const KakaoLogin = () => {
    useEffect(() => {
        const initKakao = () => {
            if(window.Kakao && !window.Kakao.isInitialized()){
                //이미 로드된 SDK 있으나, 아직 초기화되지 않았다면 초기화 진행 
                window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
            };
        };

        initKakao();
    }, []);

    const handleoAuth = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.authorize({
                redirectURI,
                scope,
            });
            console.log("카카오 로그잉잉 ")
        } else {
            console.error("Kakao SDK is not initialized.");
        }
    };

    return (
        <div 
            className="mx-auto mt-5 cursor-pointer hover:scale-105 ease-in-out duration-500" 
            onClick={handleoAuth} >
            <Image src={KAKAO} alt={"kakao LOGO"} />
        </div>
    )
};

export default KakaoLogin;