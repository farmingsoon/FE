import Link from "next/link";

export default function Signup() {
    const inputStyle = "border rounded-md border-LINE_BORDER px-3 h-11 my-1 w-full font-light text-sm outline-none";

    return (
        <div className="flex justify-center mt-12">
            <div></div>
            <div className="flex flex-col w-80">
                <div className="font-semibold text-2xl text-center mb-3">회원가입</div>
                <span className="border-b-2 border-black"></span>
                <form className="my-3 ">
                    <input className={inputStyle} type="text" placeholder="아이디(이메일)"></input>
                    <input className={inputStyle} type="password" placeholder="비밀번호"></input>
                    <input className={inputStyle} type="text" placeholder="비밀번호 확인"></input>
                    <input className={inputStyle} type="password" placeholder="닉네임"></input>
                    <input className={inputStyle} type="password" placeholder="휴대폰 번호"></input>
                    <button className="bg-black mt-3 text-white font-semibold text-sm rounded-md w-full h-11">회원가입 하기</button>
                </form>

                <div className="mt-5 text-center">
                    <Link href="/login"><button className="border border-LINE_BORDER rounded-lg py-2 mt-3 text-sm w-full h-11 hover:bg-LINE_BORDER">로그인하러 가기</button></Link>
                    <span className="text-xs text-red-500">이미 계정을 가지고 있어요!!</span>
                </div>
            </div>
    </div>
    ) 
}