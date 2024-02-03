"use client";
import { loginSelector } from "@/stores/loginState";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Login() {
    const inputStyle = "border rounded-md border-LINE_BORDER px-3 h-11 my-1 w-full font-light text-sm";
    const [, setLogin] = useRecoilState(loginSelector);
    const [err, setErr] = useState("");
    const router = useRouter();
    const BASER_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const isValidEmail = ( email:string ) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };


    const handleLogin = async (e:any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email);
        console.log(password);

        if(!isValidEmail(email)){
            setErr("잘못된 이메일 형식입니다. ")
        }

        if(password.length < 8 || password.length > 20){
            setErr("비밀번호는 영문 대 소문자, 숫자, 특수문자를 사용하여 최소 8 글자 ~ 최대 20 글자로 작성해주세요.");
        }

        try { 
            const res = await axios.post(`${BASER_URL}/api/members/login`, {
                body: {
                    email: email,
                    password: password,
                }
            });
            
            //실패

            //성공
            if(res.status === 200){
                console.log(res.data);
                setErr("");
                setLogin((prev)=> ({
                    ...prev,
                    // ACCESS_TOKEN: res.data.accessToken,
                    // REFRESH_TOKEN: res.data.refreshToken,
                    isLogin: true,
                }))
                router.push("/")
            }
        } catch(Err) {
            console.log(`로그인 실패 ${Err}`)
        }
    }

    return (
        <div className="flex justify-center mt-12">
            <div></div>
            <div className="flex flex-col w-80">
                <div className="font-semibold text-2xl text-center mb-3">로그인</div>
                <span className="border-b-2 border-black mb-3"></span>
                <p className="text-xs text-POINT_RED ">{err && err}</p>
                <form className="my-3" onSubmit={handleLogin}>
                    <input className={inputStyle} type="text" placeholder="아이디(이메일)"></input>
                    <input className={inputStyle} type="password" placeholder="비밀번호"></input>
                    <button 
                        type="submit" 
                        className="bg-black mt-3 text-white font-semibold text-sm rounded-md w-full h-11"
                    >
                        로그인하기
                    </button>
                </form>
                <div className="flex flex-row justify-end pb-3 mt-3 border-b border-LINE_BORDER text-sm font-light">
                    <button className="pl-4 hover:text-DEEP_MAIN">아이디(이메일)찾기</button>
                    <button className="pl-4 hover:text-DEEP_MAIN">비밀번호 찾기</button>
                </div>

                <div className="font-semibold text-2xl text-center mt-5">SNS</div>

                <div className="mt-5 text-center">
                    <span className="text-xs ">회원가입하고 나에게 필요한 물건을 구해보세요!</span>
                    <Link href="/signup"><button className="border border-LINE_BORDER rounded-lg py-2 mt-3 text-sm w-full h-11 hover:bg-LINE_BORDER">간편 회원가입하기</button></Link>
                </div>
            </div>
        </div>
    )
}