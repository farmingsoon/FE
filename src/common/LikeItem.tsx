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
    const [ svgColor, setSvgColor ] = useState<string | null>();
    //이부분 즉각적 변경을 위해 Recoil로 관리해야 할 지도 모름 0207
    // const BookmarkStatus = likeItemColor.isLike === true ? "#FF7171" : "#000000";
    console.log(likeItemColor.isLike)
    console.log(likeStatus)

    useEffect(() => {
        //첫 렌더링에 우선 기존의 값을 받아옵니다. - 1번만
        if(likeStatus){
            setSvgColor("#FF7171");
        }

        setSvgColor("#000000");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //debounce 적용 예정 

    const storeLikeItem = async () => {
        try { 
            const res = await axios.post(`${BASE_URL}/api/likeable-items/${itemId}`,{}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
            //성공
            if(res.status === 200){
                console.log("북마크 좋아요 클릭 성공");
                setLikeItemColor({isLike: true})
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

    const cancelLikeItem = async () => {
        try {
            const res = await axios.delete(`${BASE_URL}/api/likeable-items/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            //성공
            if(res.status === 200){
                console.log("북마크 취소 성공");
                setLikeItemColor({isLike: false})
            }
        } catch (err) {
            console.log(`좋아요 아이템 취소 ${err}`);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 404){
                    setIsToken({tokenExpired: true})
                }
                
            }
        }
    }

    const handleClick = ( originState: boolean | null ) => {
        console.log("버튼 클릭 ")
        if(originState === true){
            //이미 기존에 좋아요 설정된 상태라면 
            cancelLikeItem();

        } else if (originState === null){
            return;
        }

        //좋아요 취소 이벤트 
        storeLikeItem();
    };

//(e) => { e.preventDefault(); if(likeStatus){handleClick(likeStatus) }} 
    return(
        <div className="flex flex-row">
            <PersonSVG width={"16px"} height={"17px"}/>
            <span className="ml-1 mr-5">{bidCount}</span>
            <button onClick={() =>  handleClick(likeStatus ?? null)} className="bg-pink-300 p-2 hover:bg-purple-300 z-10">
                <BookmarkSVG width={"12px"} height={"12px"} fillColor={svgColor ? svgColor : (likeItemColor.isLike === true ? "#FF7171" : "#000000") } />
            </button>
            <span className="ml-1">{likeCount}</span>
        </div>
    )
}

export default LikeItem;