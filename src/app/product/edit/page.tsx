"use client";
import { useState } from "react";
import Image from "next/image";
// import Fileuploader from "@/common/FileUploader"
import PlusCircle from "../../../../public/svg/PlusCircle";
import axios from "axios";
import { useRouter } from "next/navigation";
import LocalStorage from "@/util/localstorage";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import { categoryState } from "@/stores/categoryState";
import Close from "../../../../public/svg/Close";

export default function ProductEdit() {
    const inputStyle = "border-b border-LINE_BORDER placeholder:text-zinc-300 text-sm py-1 mb-12 pl-2 font-light ";
    const btnStyle = `rounded-full w-20 h-10 text-sm font-normal mx-3 mt-2 text-TEXT_BLACK border border-indigo-500 rounded-lg shadow-sm cursor-pointer  `
    const checkBtnStyle = `bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500  font-semibold text-white`;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const [imageFile, setImageFile] = useState<File[]>([]);
    const [contents, setContents] = useState("");
    const accessToken = LocalStorage.getItem("accessToken");
    const [, setIsToken] = useRecoilState(tokenState);
    const [ selectCategory, setSelectCategory ] = useRecoilState(categoryState);
    const [priceValue, setPriceValue] = useState("");

    const [err, setErr] = useState(""); //img, title, price, period, content

    const handleCategoryClick = ( category: string ) => {
        setSelectCategory({ category: category });
    }

    const handleImageFile = (e:any) => {
        e.preventDefault();
        const selectedFile = e.target.files;
        setImageFile([...imageFile, ...selectedFile])
    };

    //이미지 배열 삭제 
    const deleteImgArr = (imgIdx: number) => {
        const newArr = [...imageFile]
        newArr.splice(imgIdx, 1);
        setImageFile(newArr)
    }

    const formatNumber = (value: string) => {
        return new Intl.NumberFormat().format(Number(value.replace(/,/g, '')));
    }

    const handlePriceWon = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const formattedNum = formatNumber(value);
        setPriceValue(formattedNum)
    }

    //유효성 검증 
    const isValidImg = (img: File) => {
        return img ? true : false
    };

    const isValidTitle = (title: string) => {
        return title.length < 30 && title.length > 0
    };

    const isValidPrice = (formattedPrice: string) => {
        const price = Number(formattedPrice.replace(/,/g, ''));
        return price >= 100 && price % 100 === 0;
    }

    const isValidPeriod = (period: number) => {
        const isInteger = Number.isInteger(Number(period));
        return isInteger && period <= 7 &&  period > 0;
    };

    const isValidContent = (content: string) => {
        return content.length > 5
    }


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setErr("");
        const formData = new FormData();
        const title = e.target[1].value;
        const hopePrice = (e.target[2].value).replace(/,/g, '');
        const period = e.target[3].value;

        formData.append("title", title);
        formData.append("hopePrice", hopePrice);
        formData.append("period", period);
        formData.append("description", contents);
        formData.append("category", selectCategory.category)

        if(imageFile){
            formData.append("thumbnailImage", imageFile[0]);
            // formData.append("images", JSON.stringify(imageFile))
            imageFile.forEach((el) => {
                formData.append('images', el)
            })
        };        

        if(!isValidImg(imageFile[0])){
            //setErr(err.map((value, index) => index === 0 ? false : value));
            setErr("이미지를 반드시 하나 이상을 등록해주세요.");
            return;
        };

        if(!isValidTitle(title)){
            setErr("제목을 1 ~ 30 자 이내로 입력해주세요.");
            return;
        };

        if(!isValidPrice(hopePrice)){
            setErr("희망 판매 가격을 100원 단위로 입력해주세요.");
            return;
        }

        if(!isValidPeriod(period)){
            setErr("경매 기간은 최대 7일 이내로 설정해주세요.");
            return;
        };


        if(!isValidContent(contents)){
            setErr("본문은 최소 5글자 이상 작성해주세요!");
            return;
        };

        if(isValidImg(imageFile[0]) && isValidTitle(title) && isValidPrice(hopePrice) && isValidPeriod(period) && isValidContent(contents)){

            try { 
                const res = await axios.post(`${BASE_URL}/api/items`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    }
                });
    
                //성공
                if(res.status === 200){
                    console.log(formData);
                    console.log(res.data);
                    console.log(res.data.result);
                    const id = res.data.result;
                    router.push(`/product/detail/${id}`)
                }
    
            } catch (err){
                console.log(`상품 등록 수정 실패 ${err}`)
                if(axios.isAxiosError(err) && err.response){
                    if(err.response.status === 404){
                        setErr("로그인이 만료 되었습니다. 로그인을 다시 진행해주세요. ");
                        setIsToken({tokenExpired: true})
                    }
                    
                }
            }
    
        }
    };


    return(
        <div className="flex min-h-screen flex-col mb-5 ">
            <h1>상품 등록</h1>
            <form  onSubmit={handleSubmit} className="flex flex-col">
                <div className="my-5 flex flex-row overflow-x-scroll">
                    <label
                        htmlFor="editImg_file" 
                        className="flex border min-h-32 min-w-44  rounded-lg border-LINE_BORDER bg-zinc-500 justify-center items-center"
                    >  <PlusCircle width={"35px"} height={"35px"}/> </label>
                    { imageFile && imageFile.map((el, idx) => (

                        
                        <div key={idx} className="relative">
                            <span 
                                className="rounded-lg w-6 h-6 bg-POINT_RED absolute top-0 right-2 z-10 flex justify-center items-center"
                                onClick={() => deleteImgArr(idx)}
                            >
                                <Close width={"13px"} height={"13px"} fillColor="#Fefefefe"/>
                            </span>
                            <div className="relative h-32 w-44 rounded-lg mx-3 overflow-hidden border border-LINE_BORDER">
                                <Image src={URL.createObjectURL(el)} alt={"select product image"} layout="fill" objectFit="cover" /> 
                            </div>                           
                        </div>

                    ))}
                  
                    <input 
                        id="editImg_file"
                        type="file" 
                        className="hidden"
                        accept="image/jpg, image/png, image/jpeg" 
                        onChange={handleImageFile}
                    />
                </div>
                <p className="text-xs text-POINT_RED mb-5 ">{err && `!! ${err}`}</p>
                <label className="">제목</label>
                <input type="text" className={`${inputStyle} mt-5`} placeholder="제목을 입력해주세요."/>

                <div className="flex flex-row ">
                    <label className="mr-3 whitespace-nowrap">희망 판매가격</label>
                    <input type="text" className={`${inputStyle} w-full`} placeholder="최소 희망판매가격을 입력해주세요 (100원단위)"
                        value={priceValue}
                        onChange={handlePriceWon}/>
                </div>

                <div className="flex flex-row ">
                    <label className="mr-10 whitespace-nowrap">경매 기간</label>
                    <input type="text" className={`${inputStyle} w-full`} placeholder="경매 기간을 입력해주세요 (기본 최대 7일)"/>
                </div>

                <div className="flex flex-row mb-10">
                    <label className="mr-10 whitespace-nowrap mt-2">카테고리</label>
                    <input type="text" className="hidden"  placeholder="거래 가능 지역을 입력해주세요." />
                    <ul className="flex flew-row flex-wrap">
                        <li > <button type="button"
                                className={`${btnStyle} ${selectCategory.category === "의류" ?  checkBtnStyle : ""}`} 
                                onClick={(e) => {e.preventDefault(); handleCategoryClick("의류")}}
                                >의류
                        </button></li>
                        <li> <button type="button"
                                className={`${btnStyle} ${selectCategory.category === "신발" ?  checkBtnStyle : " "}`} 
                                onClick={(e) => {e.stopPropagation();  handleCategoryClick("신발");}} >신발
                            </button></li>
                        <li><button type="button" 
                                className={`${btnStyle} ${selectCategory.category === "악세사리" ? checkBtnStyle : ""}`} 
                                onClick={(e) => {e.stopPropagation();  setSelectCategory({ category: "악세사리" });}}  >악세사리
                        </button></li>
                        <li><button type="button" 
                                className={`${btnStyle} ${selectCategory.category === "가구" ? checkBtnStyle : ""}`} 
                                onClick={(e) => {e.stopPropagation();  setSelectCategory({ category: "가구" });}} >가구
                        </button></li>
                        <li><button  type="button"
                                className={`${btnStyle} ${selectCategory.category === "앨범" ? checkBtnStyle : ""}`}  
                                onClick={(e) => {e.stopPropagation(); handleCategoryClick("앨범")}} >앨범
                        </button></li>
                        <li><button  type="button"
                                className={`${btnStyle} ${selectCategory.category === "전자제품" ? checkBtnStyle : ""}`}  
                                onClick={(e) => {e.stopPropagation(); handleCategoryClick("전자제품")}} >전자제품
                        </button></li>
                        <li><button type="button"
                                className={`${btnStyle} ${selectCategory.category === "악기" ? checkBtnStyle : ""}`} 
                                onClick={(e) => {e.stopPropagation();  setSelectCategory({ category: "악기" });}} >악기
                        </button></li>
                        <li><button type="button"
                                className={`${btnStyle} ${selectCategory.category === "펫용품" ? checkBtnStyle : ""}`} 
                                onClick={(e) => {e.stopPropagation();  setSelectCategory({ category: "펫용품" });}} >펫용품
                        </button></li>
                        <li><button type="button" 
                                className={`${btnStyle} ${selectCategory.category === "기타" ? checkBtnStyle : ""}`}  
                                onClick={(e) => {e.stopPropagation();  setSelectCategory({ category: "기타" });}} >기타
                        </button></li>
                    </ul>
                </div>


                <label className="">상세 설명</label>
                <textarea 
                    rows={6}
                    className="form-textarea mt-1 block w-full border rounded-lg border-LINE_BORDER p-2 placeholder:text-zinc-300 text-sm font-light "
                    placeholder="상품을 자세히 설명해주세요."
                    onChange={(e) => setContents(e.target.value)} 
                ></textarea>
                <button type="submit" className="mt-5 bg-black text-white font-semibold text-sm rounded-md w-full h-11">
                    상품 등록
                </button>
            </form>
        </div>
    )
}