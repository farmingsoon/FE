import Link from "next/link";

export default function Login() {
    const inputStyle = "border rounded-md border-LINE_BORDER px-3 h-11 my-1 w-full font-light text-sm"
    return (
        <div className="flex justify-center mt-12">
            <div></div>
            <div className="flex flex-col w-80">
                <div className="font-semibold text-2xl text-center mb-3">로그인</div>
                <span className="border-b-2 border-black"></span>
                <form className="my-3">
                    <input className={inputStyle} type="text" placeholder="아이디(이메일)"></input>
                    <input className={inputStyle} type="password" placeholder="비밀번호"></input>
                    <button className="bg-black mt-3 text-white font-semibold text-sm rounded-md w-full h-11">로그인하기</button>
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