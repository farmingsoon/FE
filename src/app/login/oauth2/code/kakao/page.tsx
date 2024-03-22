import { loginSelector } from "@/stores/loginState";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function RedirectKakao({ userInfo }:any) {
    const [, setLogin] = useRecoilState(loginSelector);
    const [ , setIsTokenInValid ] = useRecoilState(tokenState);
    const router = useRouter();

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            // localStorage에 유저 정보 저장
            LocalStorage.setItem('userInfo', JSON.stringify(userInfo));
            setLogin((prev)=> ({
                ...prev,
                isLogin: true,
                memberId: userInfo.memberId,
            }));
            setIsTokenInValid({tokenExpired: false}); //토큰 유효
            LocalStorage.setItem("loginState", String(true));
            LocalStorage.setItem("memberId", String(userInfo.memberId));
            LocalStorage.setItem("userName", userInfo.nickname);
            LocalStorage.setItem("userProfileImg", userInfo.profileImgUrl);
            
            // 원하는 페이지로 리디렉션
            router.push('/');
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, userInfo]);

    return (
        <div className="mx-auto mt-16">
            <svg className="animate-spin h-5 w-5 mr-3"></svg>
            로그인 중입니다.
        </div>
    );
}

// 이 함수는 서버 사이드에서 실행됩니다.
export async function getServerSideProps(context:any) {
    const { code } = context.query;
    const BASER_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const getUserInfo = `${BASER_URL}/login/oauth2/code/kakao`;
    
    // 여기서 백엔드에 유저 정보 요청을 보내고 응답을 받습니다.
    let userInfo = {};
    if (code) {
        try {
            const res = await fetch(`${getUserInfo}?code=${code}`);
            if(res.ok){
                userInfo = await res.json();
            } else {
                throw new Error("서버로부터 응답이 올바르지 않습니다.");
            }
            
        } catch (error) {
            // 에러 처리
            console.error('Error fetching user info:', error);
        }
    }

    // userInfo를 페이지 props로 넘겨줍니다.
    return { props: { userInfo } };
}