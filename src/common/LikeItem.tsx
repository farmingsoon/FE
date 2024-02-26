import axios from "axios";
import { useRecoilState } from "recoil";
import debounce from 'lodash.debounce';

import { tokenState } from "@/stores/tokenModal";
import { likeSelector } from "@/stores/likeItemState";

import BookmarkSVG from "../../public/svg/BookmarkSVG"
import PersonSVG from "../../public/svg/PersonSVG"
import { axiosCall } from "@/util/axiosCall";

interface LikeItemTypes {
    itemId: number;
    bidCount?: number;
    likeCount?: number;
}

const LikeItem = ({bidCount, likeCount, itemId}: LikeItemTypes) => {
    // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    // const accessToken = LocalStorage.getItem("accessToken");
    const [, setIsToken] = useRecoilState(tokenState);
    const [ likeItemColor , setLikeItemColor ] = useRecoilState(likeSelector);


    const handleLikeItem = debounce(async () => {
        const isLikedItem = likeItemColor.includes(String(itemId));
        const config = { withCredentials: true };

        try { 
            if(!isLikedItem){
                setLikeItemColor((prev) => (
                    [...prev, String(itemId) ]
                ));
                
                const likeRes = await axiosCall( `/api/likeable-items/${itemId}`, "POST", {}, config )

                //좋아요 클릭 성공
                if(likeRes.status === 200){
                    console.log("북마크 좋아요 클릭 성공");
                }
            };

            if(isLikedItem){
                setLikeItemColor((prev) => (
                    prev.filter(item => item !== String(itemId))
                ));

                
                // const cancelRes = await axiosCall( `/api/likeable-items/${itemId}`, "DELETE", config );
                const cancelRes = await axios.delete(`https://server.farmingsoon.site/api/likeable-items/${itemId}`, {
                    withCredentials: true
                })
                
                // 좋아요 취소 클릭 성공 
                if(cancelRes.status === 200){
                    console.log("북마크 취소 성공");
                }
            };

        } catch (err) {
            console.log(`좋아요 아이템 등록 ${err}`);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 404){
                    setIsToken({tokenExpired: true})
                }
                
            }
        }
    }, 500);


    const handleClick = ( ) => {
        handleLikeItem();

    };

    return(
        <div className="flex flex-row items-center">
            <PersonSVG width={"18px"} height={"18px"}/>
            <span className="ml-3 mr-5">{bidCount}</span>
            <button onClick={() =>  handleClick()} className=" p-2 hover:bg-purple-300 z-10">
                <BookmarkSVG width={"15px"} height={"15px"} itemId={itemId}/>
            </button>
            <span className="ml-1">{likeCount}</span>
        </div>
    )
}

export default LikeItem;