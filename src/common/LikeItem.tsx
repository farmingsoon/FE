import axios from "axios";
import BookmarkSVG from "../../public/svg/BookmarkSVG"
import PersonSVG from "../../public/svg/PersonSVG"
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { likeState } from "@/stores/likeItemState";
import { useEffect, useState } from "react";

interface LikeItemTypes {
    itemId: number;
    bidCount?: number;
    likeCount?: number;
    likeStatus?: boolean;
}

const LikeItem = ({bidCount, likeCount, likeStatus, itemId}: LikeItemTypes) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = LocalStorage.getItem("accessToken");
    const [, setIsToken] = useRecoilState(tokenState);
    const [ likeItemColor , setLikeItemColor ] = useRecoilState(likeState);
    const [ isBooked, setIsBooked ] = useState(false);
    const [ svgColor, setSvgColor ] = useState<string | null>();
    //이부분 즉각적 변경을 위해 Recoil로 관리해야 할 지도 모름 0207
    // const BookmarkStatus = likeItemColor.isLike === true ? "#FF7171" : "#000000";
    console.log(likeItemColor.isLike)
    console.log(likeStatus)


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
        console.log("버튼 클릭 ")

    };

    return(
        <div className="flex flex-row">
            <PersonSVG width={"16px"} height={"17px"}/>
            <span className="ml-1 mr-5">{bidCount}</span>
            <button onClick={() =>  handleClick()} className="bg-pink-300 p-2 hover:bg-purple-300 z-10">
                <BookmarkSVG width={"12px"} height={"12px"}  />
            </button>
            <span className="ml-1">{likeCount}</span>
        </div>
    )
}

export default LikeItem;