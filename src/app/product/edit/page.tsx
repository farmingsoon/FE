import Fileuploader from "@/common/FileUploader"

export default function ProductEdit() {
    const inputStyle = "border-b border-LINE_BORDER placeholder:text-zinc-300 text-sm py-1 mb-12 pl-2 font-light"

    return(
        <div className="flex min-h-screen flex-col mb-5">
            <h1>상품 등록</h1>
            <div className="my-5">
                <Fileuploader />
            </div>
            <form className="flex flex-col">
                <label className="">제목</label>
                <input type="text" className={`${inputStyle} mt-5`} placeholder="제목을 입력해주세요."/>

                <div className="flex flex-row ">
                    <label className="mr-3 whitespace-nowrap">희망 판매가격</label>
                    <input type="text" className={`${inputStyle} w-full`} placeholder="최소 희망판매가격을 입력해주세요 (100원단위)"/>
                </div>

                <div className="flex flex-row ">
                    <label className="mr-10 whitespace-nowrap">경매 기간</label>
                    <input type="text" className={`${inputStyle} w-full`} placeholder="경매 기간을 입력해주세요 (기본 최대 7일)"/>
                </div>

                <div className="flex flex-row ">
                    <label className="mr-10 whitespace-nowrap">거래 지역</label>
                    <input type="text" className={`${inputStyle} w-full`}  placeholder="거래 가능 지역을 입력해주세요."/>
                </div>


                <label className="">상세 설명</label>
                <textarea 
                    rows={6}
                    className="form-textarea mt-1 block w-full border rounded-lg border-LINE_BORDER p-2 placeholder:text-zinc-300 text-sm font-light "
                    placeholder="상품을 자세히 설명해주세요."
                ></textarea>

            </form>
        </div>
    )
}