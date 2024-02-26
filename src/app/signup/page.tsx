"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import noPhoto from "@/../public/img/noPhoto.png";

export default function Signup() {
    const inputStyle = "border rounded-md border-LINE_BORDER px-3 h-11 mt-1 mb-5 w-full font-light text-sm outline-none";
    const [ err, setErr ] = useState("");
    const [imageFile, setImageFile] = useState<string | null>();
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    
    //유효성 검증 
    const isValidImg = (img:File) => {
        return img ? true : false
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const isValidPasswrord = (pwd:string, rePwd:string) => {
        return pwd === rePwd;
    };

    const isValidNickname = (name:string) => {
        const nameRegex = /^[\w가-힣]{2,20}$/;
        return nameRegex.test(name);
    }

    const handleImageFile = (e:any) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];

        if(selectedFile){
            const blobURL = URL.createObjectURL(selectedFile);
            setImageFile(blobURL); //blob URL을 상태로 설정 
        }
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        
        const profile = e.target[0].files[0];
        const email = e.target[1].value;
        const password = e.target[2].value;
        const rePassword = e.target[3].value;
        const nickname = e.target[4].value;
        formData.append('profileImg', profile); // 파일 추가
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nickname', nickname);

        if(!isValidImg(profile)){
            setErr("프로필 이미지를 등록해주세요!");
            return;
        };

        if(!isValidEmail(email)) {
            setErr("이메일 형식에 맞게 입력해주세요.");
            return;
        };

        if(!isValidPasswrord(password, rePassword) || password.length < 8 || password.length > 20  ){
           setErr("비밀번호는 영문 대 소문자, 숫자, 특수문자를 사용하여 최소 8 글자 ~ 최대 20 글자로 작성해주세요.");
           return;
        };

        if(!isValidNickname(nickname)){
            setErr("닉네임은 영문, 한글, 숫자를 사용해서 작성해주세요.");
            return;
        }

        if(isValidEmail(email) && isValidImg(profile) && isValidPasswrord (password, rePassword) && isValidNickname(nickname)){ 
            console.log("회원가입 유효성 검증 통과 ")
            try {
                const res = await axios.post(`${BASE_URL}/api/members/join`, formData);
                console.log(formData)
                
                //실패 -> 승용님께 등록 해달라고 요청하기 0203
                if(res.status === 400){
                    setErr("이미 등록된 이메일 입니다.")
                }
    
                //성공
                if(res.status === 200){
                    setErr("");
                    router.push("/login");
                }
    
            } catch(error) {
                console.log(`회원가입 에러 ${error}`)
            }
        }


    }

    return (
        <div className="flex justify-center mt-12">
            <div></div>
            <div className="flex flex-col w-80">
                <div className="font-semibold text-2xl text-center mb-3">회원가입</div>
                <span className="border-b-2 border-black"></span>
                <form onSubmit={handleSubmit} className="my-3 ">
                    <div className="flex flex-row justify-between mt-1 mb-5 w-full font-light text-sm outline-none items-center">
                        <div className="w-[80px] h-[80px] bg-black rounded-lg flex items-center object-fill">
                            <Image src={imageFile ? imageFile : noPhoto} alt={"Profile Image"} width={80} height={80}/>
                        </div>
                        <label
                            htmlFor="img_file" 
                            className="bg-MAIN_COLOR hover:bg-DEEP_MAIN hover:shadow-md border rounded-lg px-5 py-3 font-normal text-[#FEFEFE]">
                            프로필 업로드
                        </label>
                        <input 
                            id="img_file" 
                            className="bg-blue-300 hidden" 
                            type="file" 
                            alt="profile image" 
                            accept="image/jpg, image/png, image/jpeg"
                            onChange={handleImageFile}
                        ></input>
                    </div>
                    <input className={inputStyle} type="text" placeholder="아이디(이메일)" ></input>
                    <input className={inputStyle} type="password" placeholder="비밀번호" ></input>
                    <input className={inputStyle} type="password" placeholder="비밀번호 확인" ></input>
                    <input className={inputStyle} type="text" placeholder="닉네임" ></input>
                    <p className="text-xs text-POINT_RED">{err && err}</p>
                    <button type="submit" className="bg-black mt-3 text-white font-semibold text-sm rounded-md w-full h-11">회원가입 하기</button>
                </form>

                <div className="mt-5 text-center">
                    <Link href="/login">
                        <button className="border border-LINE_BORDER rounded-lg py-2 mt-3 text-sm w-full h-11 hover:bg-LINE_BORDER">
                            로그인하러 가기
                        </button>
                    </Link>
                    
                </div>
            </div>
    </div>
    ) 
}
