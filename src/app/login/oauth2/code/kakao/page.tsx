"use client"
import axios from "axios";
import { 
    useParams, 
} from "next/navigation";
import { useEffect } from "react";

// import LocalStorage from "@/util/localstorage";
// import { useRecoilState } from "recoil";
// import { loginSelector } from "@/stores/loginState";

export default function RedirectKakao () {
    // const [, setLogin] = useRecoilState(loginSelector);
    // const router = useRouter();
    const oauthCode = useParams<{ code: string; }>();
    // const searchParams = useSearchParams ();
    // const tempQuery = searchParams.get("code");
    console.log("카카오페이지 OAUTH : ", oauthCode); 


    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const redirectURI = `${BASE_URL}/oauth2/authorization/kakao`;
    const scope = "profile_nickname,profile_image,account_email";

    useEffect(() => {
        axios.get(`${BASE_URL}/login/oauth2/code/kakao`)
            .then((res: any) => {
                console.log("KAKAO PAGE", res)
            })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.authorize({
                redirectURI,
                scope,
            });
            
            console.log("카카오페이지 로그잉잉 ")
        } else {
            console.error("Kakao SDK is not initialized.");
        }
        // console.log("카카오 파람 : ", code);
        //백엔드 전달 코드 
        //router.push("/");
        // const id = res.data.result.memberId;
        // const userName = res.data.result.nickname;
        // const profile = res.data.result.profileImgUrl;
        // setLogin((prev)=> ({
        //     ...prev,
        //     isLogin: true,
        //     memberId: res.data.result.memberId,
        // }));
        // LocalStorage.setItem("loginState", String(true));
        // // LocalStorage.setItem("accessToken", token);
        // LocalStorage.setItem("memberId", String(id));
        // LocalStorage.setItem("userName", userName);
        // LocalStorage.setItem("userProfileImg", profile);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="mx-auto mt-16">
            <svg className="animate-spin h-5 w-5 mr-3"></svg>
            로그인 중입니다. 
        </div>
    )
}