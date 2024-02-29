"use client";
import { loginSelector } from "@/stores/loginState";
import LocalStorage from "@/util/localstorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Error({
    error,
}: {
    error: Error
}) {
    const [, setLoginState] = useRecoilState(loginSelector);
    const router = useRouter();

    useEffect(() => {
        console.log(error);

    }, [error]);

    const handleMove = () => {
        setLoginState((prev) => ({
            ...prev,
            isLogin: false
        }));
        LocalStorage.setItem("loginState", "false");
        router.push("/login");
    }

    return(
        <div>
            <h2>이런.. 에러가 발생했습니다. 재로그인을 시도해주세요. </h2>
            <button onClick={handleMove}>로그인 하러 가기</button>
        </div>
    )
}