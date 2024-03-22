"use client"
import { loginSelector } from "@/stores/loginState";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function RedirectKakao() {
    const [, setLogin] = useRecoilState(loginSelector);
    const [ , setIsTokenInValid ] = useRecoilState(tokenState);
    const router = useRouter();
    const searchParams = useSearchParams();
    const authCode = searchParams.get('code'); // 인가코드가 저장된다.
    console.log("제발 정보좀 : ", authCode);

    useEffect(() => {
    //    axios.get("https://server.farmingsoon.site/login/oauth2/code/kakao")
    }, [])

    // useEffect(() => {
    //     if (userInfo) {
    //         console.log(userInfo)
    //         // localStorage에 유저 정보 저장
    //         LocalStorage.setItem('userInfo', JSON.stringify(userInfo));
    //         setLogin((prev)=> ({
    //             ...prev,
    //             isLogin: true,
    //             memberId: userInfo.memberId,
    //         }));
    //         setIsTokenInValid({tokenExpired: false}); //토큰 유효
    //         LocalStorage.setItem("loginState", String(true));
    //         LocalStorage.setItem("memberId", String(userInfo.memberId));
    //         LocalStorage.setItem("userName", userInfo.nickname);
    //         LocalStorage.setItem("userProfileImg", userInfo.profileImgUrl);
            
    //         // 원하는 페이지로 리디렉션
    //         router.push('/');
    //     }

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [router, userInfo]);

    return (
        <div className="mx-auto mt-16">
            <svg className="animate-spin h-5 w-5 mr-3"></svg>
            로그인 중입니다.
        </div>
    );
}

