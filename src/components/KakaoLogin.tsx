"use client"
import KAKAO from "@/../public/img/KAKAO.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

declare global {
    interface Window {
        Kakao: any
    }
};

const BASER_URL = process.env.NEXT_PUBLIC_BASE_URL;
const redirectURI = `${BASER_URL}/oauth2/authorization/kakao`;
// const scope = "profile_nickname,profile_image,account_email";

const KakaoLogin = () => {
    const router = useRouter();
    const oauthCode = useParams<{ code: string; }>();
    console.log("카카오 컴포넌트에서 코드: ", oauthCode)

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
        router.push(redirectURI);
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