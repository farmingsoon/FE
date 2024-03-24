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
import LocalStorage from "@/util/localstorage";
import StatusPrice from "@/components/StatusPrice";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LikeItem from "@/common/LikeItem";
import { axiosCall, rotateRefresh } from "@/util/axiosCall";


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
    awardPrice: number;
}


export default function ProductDetail(  ) {
    const userId = LocalStorage.getItem("memberId");
    const [sellerBiddOpen, setSellerBiddOpen] = useState(false);
    const [buyerBidOppen, setBuyerBidOpen] = useState(false);
    const [detailData, setDetailData] = useState<DetailPageTypes>();
    const [ amIuser, setAmIuser ] = useState(false); 
    const [, setIsToken] = useRecoilState(tokenState);
    const router = useRouter();
    const params = useParams<{ id: string; }>()

    //뒤로가기 History
    const handleNavigationBack = (e:any) => {
        e.preventDefault();
        router.back();
    };

    //이미지 페이지네이션
    const [ curImg, setCurImg ] = useState(0);


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
        const url = `https://server.farmingsoon.site/api/items/${params.id}`;
        const config = { withCredentials: true }
        try { 
            const res = await axios.get(url, config);
            console.log(res.data.result);

            if(userId === res.data.result.sellerId){
                setAmIuser(true);
            }
            setDetailData(res.data.result);


        } catch (err){
            console.log(`디테일 페이지 ${err}`)   
        }
    };

    const handleDelete = async () => {
        const url = `https://server.farmingsoon.site/api/items/${params.id}`;
        const config = { withCredentials : true };

        try {
            const res = await axios.delete( url, config );
            
            if(res.status === 200){
                console.log("성공적 데이터 삭제 ")
                router.push("/");
            }
            
        } catch (err){
            console.log(`상품 상세 삭제 ${err}`);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 404){
                    LocalStorage.setItem("loginState", "false");
                    setIsToken({tokenExpired: true})
                }

                if(err.response.status === 403){
                    LocalStorage.setItem("loginState", "false");
                    setIsToken({tokenExpired: true})
                }
                
                rotateRefresh().catch((refreshErr) => {
                    if(refreshErr.message === "RefreshTokenUnauthorized"){
                       console.log("rotateRefresh 함수 실행")
                    }
                });
            }
        }
    };

    const handleChatClick = async () => {
        console.log("채팅하기 버튼 클릭 ");
        const chatRoomURL = "/api/chat-rooms";
        const config =  { withCredentials: true }
        const chatRoomBody = {
            buyerId: userId,
            itemId: params.id,
        }

        try { 
            const res = await axiosCall(chatRoomURL, "POST", chatRoomBody, config);
            if(res.status === 200){
                console.log("채팅방 생성 성공 ", res.data.result);
                router.push(`/chat/${res.data.result}`)
            }

        } catch (err){
            console.log(`채팅 연결 ${err}`);

            if(axios.isAxiosError(err) && err.response){
                const status = err.response.status;
                const errorMessage = err.response.data.message;

                if(status === 401 && errorMessage === "기한이 만료된 AccessToken입니다."){
                    //AT토큰 만료 
                    console.log("AT만료+상품 등록 : ", err)
                    rotateRefresh().catch((refreshErr) => {
                        if(refreshErr.message === "RefreshTokenUnauthorized"){
                            setIsToken({tokenExpired: true})
                        }
                    });
                };

                if(status === 401 && errorMessage === "기한이 만료된 RefreshToken입니다."){
                    //RT토큰 만료 
                    console.log("RT만료+상품 등록 : ", err);
                    setIsToken({tokenExpired: true});
                };

                if(status === 403){
                    //로그인 후 이용할 수 있습니다. 
                    setIsToken({ tokenExpired: true });
                };
            };
        }
    }

    const formatDate = (date: string | undefined) => {
        if (date) {
            const expiredAtDate = new Date(date);
            const curDate = new Date();
            const timeLeft = expiredAtDate.getTime() - curDate.getTime();
    
            if (timeLeft <= 0) {
                return expiredAtDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) + " 경매 마감";
            } else {
                const dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hourLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    
                return (`${dayLeft}일 ${hourLeft}시간 남음`);
            }
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
                    { detailData?.itemStatus === "경매종료" && 
                        <div className="absolute inset-0 w-full h-full bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center">
                            <div className="font-semibold text-2xl text-white">경매 종료</div>
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
                        likeStatus={detailData && detailData.likeStatus} 
                    />
                </div>
                <div className="flex flex-row justify-between text-xl mt-2">
                    <h1>{detailData && detailData.title}</h1>
                    <div className="text-sm ">
                        {!amIuser || detailData?.itemStatus !== "경매완료"  &&
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
                <div className="text-xs font-light my-1">{formatDate(detailData && detailData?.expiredAt)}</div>
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
                    awardPrice = {detailData?.awardPrice}
                    />}
        </div>
    )
}
