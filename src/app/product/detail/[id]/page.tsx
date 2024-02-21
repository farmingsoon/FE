"use client"; 
import Img from "@/common/Img";
import ArrowRight from "../../../../../public/svg/ArrowRight";
import ArrowLeft from "../../../../../public/svg/ArrowLeft";
import { useEffect, useState } from "react";
import SellerBidModal from "@/components/modal/SellerBidModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import BiddingModal from "@/components/modal/BiddingModal";
import { useParams } from 'next/navigation'
// import { useRecoilState } from "recoil";
// import { amendState } from "@/stores/amendData";
import LocalStorage from "@/util/localstorage";
import StatusPrice from "@/components/StatusPrice";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LikeItem from "@/common/LikeItem";
import Cookies from "js-cookie";

interface DetailPageTypes {
    sellerId: number;
    sellerProfileImgUrl: string;
    sellerNickname : string;
    itemImgUrl: string[];
    thumbnailImgUrl: string;
    title : string;
    description: string;
    highestPrice:number;
    hopePrice: number;
    lowestPrice: number;
    expiredAt: string;
    itemStatus: string;
    bidCount: number;
    likeCount: number;
    viewCount: number;
    likeStatus: boolean;
}

// interface Headers {
//     Authorization?: string; // 'Authorization' 키는 선택적이며, 값은 문자열입니다.
//   }

export default function ProductDetail(  ) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const ACCES_TOKEN = LocalStorage.getItem("accessToken");
    const userId = LocalStorage.getItem("memberId");
    const [sellerBiddOpen, setSellerBiddOpen] = useState(false);
    const [buyerBidOppen, setBuyerBidOpen] = useState(false);
    const [detailData, setDetailData] = useState<DetailPageTypes>();
    const [ amIuser, setAmIuser ] = useState(false); 
    const [, setIsToken] = useRecoilState(tokenState);
    const router = useRouter();
    const params = useParams<{ id: string; }>()

    console.log(Cookies.get("viewCountCookie"));

    //뒤로가기 History
    const handleNavigationBack = (e:any) => {
        e.preventDefault();
        router.back();
    };

    //이미지 페이지네이션
    const [ curImg, setCurImg ] = useState(0);

    //토큰 여부 상세 페이지
    const headers: Record<string, string> = {
        // 예시: Authorization 헤더
        'Authorization': `Bearer ${ACCES_TOKEN}`
      };
    // 토큰이 있는 경우에만 Authorization 헤더 추가
    if (ACCES_TOKEN) {
        headers.Authorization = `Bearer ${ACCES_TOKEN}`;
    }

    const fetchData = async (url: string, options = {}) => {
        try { 
            const config = {
                ...options,
            }
            const response = await axios.get(url, config);
            return response;
        } catch (err){
            console.log(err);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 401){
                    //헤더 없이 다시 요청 
                    const retryRes = await axios.get(url);
                    return retryRes;
                }
                
            }
            console.log(err);
        }
    }


    const handleOpen = (sellerId: number) => {
        if(Number(userId) === sellerId){
            //판매자 
            setSellerBiddOpen(!sellerBiddOpen);
        }
        
        if(Number(userId) !== sellerId){
            //구매자
            setBuyerBidOpen(!buyerBidOppen);
        }

        return;

    }

    const getDetailData = async (userId: number) => {
        const headers = {
            Authorization : `Bearer ${ACCES_TOKEN}`,
            withCredentials: true,
        };

        try { 
            const url = `${BASE_URL}/api/items/${params.id}`;
            const res = await fetchData(url, {headers})

            if(res?.status === 200){
                setDetailData(res.data.result);

                if(userId === res.data.result.sellerId) {
                    setAmIuser(true);
                }
                console.log(res.data);
            }
        } catch (err){
            console.log(`디테일 페이지 ${err}`)
            
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${BASE_URL}/api/items/${params.id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${ACCES_TOKEN}`
                }
            });
            if(res.status === 200){
                console.log("성공적 데이터 삭제 ")
                router.push("/");
            }
        } catch (err){
            console.log(`상품 상세 삭제 ${err}`);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 404){
                    setIsToken({tokenExpired: true})
                }
                
            }
        }
    };

    const handleChatClick = async () => {
        console.log("채팅하기 버튼 클릭 ")
        try { 
            const res = await axios.post(`${BASE_URL}/api/chat-rooms`, {
                buyerId: userId,
                itemId: params.id,
            }, {
                headers: {
                    Authorization : `Bearer ${ACCES_TOKEN}`
                }
            });

            if(res.status === 200){
                console.log("채팅방 생성 성공 ", res.data.result);
                router.push(`/chat/${res.data.result}`)

            }
        } catch (err){
            console.log(`채팅 연결 ${err}`);
        }
    }

    const formatDate = (date: string | undefined) => {
        if(date){
            const expiredAtDate = new Date(date);
            const curDate = new Date();
            const timeLeft = expiredAtDate.getTime() - curDate.getTime();
    
            const dayLeft = Math.floor(timeLeft /  (1000 * 60 * 60 * 24));
            const hourLeft =  Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    
            return (`${dayLeft}일  ${hourLeft}시간`);
        }
        return;
    }

    const handleNextImg = () =>{
        if(detailData && curImg < detailData.itemImgUrl.length - 1){
            setCurImg(curImg + 1);
        } else {
            //맨 마지막 이미지 일 때 
            setCurImg(0);
        }
    }

    const handlePrevImg = () => {
        if(detailData && curImg > 0){
            setCurImg(curImg - 1)           
        } else if (detailData && detailData?.itemImgUrl){
            //맨 처음 페이지 -> 마지막 페이지 이동 
            setCurImg(detailData.itemImgUrl.length -1);
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("memberId"); //recoil
        getDetailData(Number(userId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="flex min-h-screen flex-col mb-5 max-w-[900px] min-w-[500px]">
            <div className="text-sm hover:text-DARK_GRAY cursor-pointer mb-3" onClick={handleNavigationBack}>목록으로</div>
            <div className="flex flex-row justify-center items-center">
                <ArrowLeft width={"25px"} height={"25px"} onClick={handlePrevImg}/>
                <div className="overflow-hidden mx-5 relative">
                    <Img src={detailData && detailData?.itemImgUrl?.[curImg]} type={"normal"} width={500} height={384} status={"bidding"}/>
                    { detailData?.itemStatus === "판매완료" && 
                        <div className="absolute inset-0 w-full h-full bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center">
                            <div className="font-semibold text-2xl text-white">판매 완료</div>
                        </div>
                    }
                </div>
                <ArrowRight width={"25px"} height={"25px"} onClick={handleNextImg}/>
            </div>

            <div className="flex flex-col mt-5 whitespace-nowrap">
                <div className="flex flex-row justify-between items-center">
                    <div>{  }</div>
                    <div className="overflow-hidden rounded-full"><Img src={detailData && detailData.sellerProfileImgUrl} type={"circle"} width={40} height={40}/></div>
                    <div className="text-lg ml-2 flex-1">{detailData && detailData.sellerNickname}</div>
                    <LikeItem 
                        itemId={Number(params.id)} 
                        bidCount={detailData && detailData.bidCount} 
                        likeCount={detailData && detailData.likeCount} 
                        // likeStatus={detailData && detailData.likeStatus} 
                    />
                </div>
                <div className="flex flex-row justify-between text-xl mt-2">
                    <h1>{detailData && detailData.title}</h1>
                    <div className="text-sm ">
                        {!amIuser && 
                            <button className="bg-white rounded-md px-5 py-1.5 border shadow-lg w-36 hover:bg-zinc-200"
                                onClick={handleChatClick}>채팅하기
                            </button>
                        }
                        <button 
                            className="bg-MAIN_COLOR rounded-md px-5 py-1.5 shadow-lg ml-3 w-36 hover:bg-DEEP_MAIN"
                            onClick={() => handleOpen( detailData?.sellerId as number)}
                        >
                        { Number(userId) === detailData?.sellerId
                            ? "입찰 내역"
                            : "입찰 하기"
                        }
                        </button>
                    </div>
                </div>
                <div className="text-xs font-light my-1">{formatDate(detailData && detailData?.expiredAt)}남음</div>
                <div className="text-base  mt-3 mb-8">
                    <StatusPrice bidStatus={detailData && detailData.itemStatus } highestPrice={detailData && detailData.highestPrice} hopePrice={detailData && detailData.hopePrice} />
                </div>
                <div className="font-light text-sm whitespace-pre">{detailData && detailData.description}</div>
            </div>
            <div className="mt-10 flex flex-row justify-end text-sm font-normal border-t border-LINE_BORDER pt-6">
                {amIuser
                 ? <>
                    <button className="w-20 h-10 rounded-lg border border-LINE_BORDER hover:bg-zinc-200 " onClick={handleDelete}>삭제</button>
                    {/* <button className="w-20 h-10 rounded-lg border border-LINE_BORDER  hover:bg-zinc-200 ml-7" onClick={handleAmend}>수정</button> */}
                    </>
                 : null
                }
                
            </div>
            {sellerBiddOpen 
                && <SellerBidModal 
                        handleOpen={ () => handleOpen( detailData?.sellerId as number ) } 
                        itemId={params.id} 
                        priceData={[detailData?.highestPrice, detailData?.lowestPrice]}
                        itemStatus = {detailData?.itemStatus}
                    />
            }
            {buyerBidOppen 
                && <BiddingModal 
                    handleOpen={ () => handleOpen( detailData?.sellerId as number ) } 
                    itemId={params.id} 
                    itemStatus = {detailData?.itemStatus}
                    />}
        </div>
    )
}
