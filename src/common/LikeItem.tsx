import axios from "axios";
import { useRecoilState } from "recoil";
import debounce from 'lodash.debounce';

import { tokenState } from "@/stores/tokenModal";
// import { likeSelector } from "@/stores/likeItemState";

import BookmarkSVG from "../../public/svg/BookmarkSVG"
import PersonSVG from "../../public/svg/PersonSVG"
import { axiosCall, rotateRefresh } from "@/util/axiosCall";
import LocalStorage from "@/util/localstorage";
import { useEffect, useState } from "react";

interface LikeItemTypes {
    itemId: number;
    bidCount?: number;
    likeCount?: number;
    likeStatus?: boolean;
}

const LikeItem = ({bidCount, likeCount, itemId, likeStatus}: LikeItemTypes) => {
    const [, setOpenTokenModal] = useRecoilState(tokenState);
    const isLogin = LocalStorage.getItem("loginState");

    //로컬 상태 추가 
    const [localLikeStatus, setLocalLikeStatus] = useState(likeStatus);
    const [localLikeCount, setLocalLikeCount] = useState(likeCount || 0);

    useEffect(() => {
        setLocalLikeStatus(likeStatus);
        setLocalLikeCount(likeCount as number)
    }, [likeStatus, likeCount])


    const handleLikeItem = debounce(async () => {

        const config = { withCredentials: true };

        try { 
            if(!likeStatus){
                setLocalLikeStatus(true); // UI 즉시 업데이트
                setLocalLikeCount(prevCount => (prevCount || 0) + 1); // 좋아요 수 증가
                const likeRes = await axiosCall( `/api/likeable-items/${itemId}`, "POST", {}, config );

                //좋아요 클릭 성공
                if(likeRes.status === 200){
                    console.log("북마크 좋아요 클릭 성공");
                }
            };

            if(likeStatus){
                setLocalLikeStatus(false); // UI 즉시 업데이트
                setLocalLikeCount(prevCount => Math.max(0, prevCount - 1)); // 좋아요 수 감소
                const cancelRes = await axios.delete(`https://server.farmingsoon.site/api/likeable-items/${itemId}`, {
                    withCredentials: true
                })
                
                // 좋아요 취소 클릭 성공 
                if(cancelRes.status === 200){
                    console.log("북마크 취소 성공");
                }
            };

        } catch (err) {
            if(axios.isAxiosError(err) && err.response){
                const status = err.response.status;
                const errorMessage = err.response.data.message;
                
                if(status === 401 && errorMessage === "기한이 만료된 AccessToken입니다."){
                    //AT 만료 
                    console.log("AcessToken 만료");
                    rotateRefresh().catch((refreshErr) => {
                        if(refreshErr.message === "RefreshTokenUnauthorized"){
                            setOpenTokenModal({tokenExpired: true})
                        }
                    });
                };

                if(status === 401 && errorMessage === "기한이 만료된 RefreshToken입니다."){
                    setOpenTokenModal({ tokenExpired: true })
                };
            };

            console.log(`좋아요 아이템 등록 ${err}`);
        }
    }, 500);


    const handleClick = ( ) => {
        if(isLogin === "true"){
            handleLikeItem();
        }

        if(isLogin === "false"){
            setOpenTokenModal({ tokenExpired: true })
        }

    };

    return(
        <div className="flex flex-row items-center">
            <PersonSVG width={"18px"} height={"18px"}/>
            <span className="ml-3 mr-5">{bidCount}</span>
            <button onClick={() =>  handleClick()} className=" p-2 hover:bg-purple-300 z-10">
                <BookmarkSVG width={"15px"} height={"15px"} itemId={itemId} likeStatus={localLikeStatus}/>
            </button>
            <span className="ml-1">{localLikeCount}</span>
        </div>
    )
}

export default LikeItem;