"use client"
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function RedirectKakao() {
    const authCode = useParams<{ id: string; }>()



    useEffect(() => {
        console.log("제발 정보좀 페이지 : ", authCode);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

