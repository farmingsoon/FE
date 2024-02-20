import axios from "axios";
import BookmarkSVG from "../../public/svg/BookmarkSVG"
import PersonSVG from "../../public/svg/PersonSVG"
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { likeState } from "@/stores/likeItemState";
import { useState } from "react";

interface LikeItemTypes {
    itemId: number;
    bidCount?: number;
    likeCount?: number;
}

const LikeItem = ({bidCount, likeCount, itemId}: LikeItemTypes) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = LocalStorage.getItem("accessToken");
    const [, setIsToken] = useRecoilState(tokenState);
    const [ likeItemColor , setLikeItemColor ] = useRecoilState(likeState);
    const [ isBooked, setIsBooked ] = useState(false);

    console.log(likeItemColor.isLike)
    console.log(isBooked)


    //debounce 적용 예정 
    const handleLikeItem = async () => {
        try { 
            const likeRes = await axios.post(`${BASE_URL}/api/likeable-items/${itemId}`,{}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const cancelRes = await axios.delete(`${BASE_URL}/api/likeable-items/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
            //좋아요 클릭 성공
            if(likeRes.status === 200){
                console.log("북마크 좋아요 클릭 성공");
            }

            //좋아요 취소 클릭 성공 
            if(cancelRes.status === 200){
                console.log("북마크 취소 성공");
            }

        } catch (err) {
            console.log(`좋아요 아이템 등록 ${err}`);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 404){
                    setIsToken({tokenExpired: true})
                }
                
            }
        }
    };


    const handleClick = ( ) => {
        setIsBooked(!isBooked)
        setLikeItemColor({isLike: !likeItemColor.isLike})
        console.log("버튼 클릭 ")

    };

    return(
        <div className="flex flex-row items-center">
            <PersonSVG width={"18px"} height={"18px"}/>
            <span className="ml-3 mr-5">{bidCount}</span>
            <button onClick={() =>  handleClick()} className=" p-2 hover:bg-purple-300 z-10">
                <BookmarkSVG width={"15px"} height={"15px"}  />
            </button>
            <span className="ml-1">{likeCount}</span>
        </div>
    )
}

export default LikeItem;