import { 
    useParams, 
    // useRouter, 
    useSearchParams } from "next/navigation";
import { useEffect } from "react";

// import LocalStorage from "@/util/localstorage";
// import { useRecoilState } from "recoil";
// import { loginSelector } from "@/stores/loginState";

export default function RedirectKakao () {
    // const [, setLogin] = useRecoilState(loginSelector);
    // const router = useRouter();
    const oauthCode = useParams<{ code: string; }>();
    const searchParams = useSearchParams ();
    const tempQuery = searchParams.get("code");
    console.log("카카오 OAUTH : ", oauthCode); 
    console.log("카카오 파람 : ", tempQuery);

    useEffect(() => {
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

    }, [])

    return(
        <div className="mx-auto mt-16">
            <svg className="animate-spin h-5 w-5 mr-3"></svg>
            로그인 중입니다. 
        </div>
    )
}