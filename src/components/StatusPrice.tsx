interface StatusPriceTypes {
    bidStatus?: string ;
    highestPrice?: number | null ;
    awardPrice?: number;
    hopePrice?: number;
    bidCount: number;
}

const StatusPrice = ( {bidStatus, highestPrice, hopePrice, awardPrice, bidCount}: StatusPriceTypes ) => {
    console.log(bidStatus, awardPrice)
    const formatPrice = (price: number | null | undefined) => {
        if (price === null) return "0";
        if (price === undefined) return "0";
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 상태 값에 맞게 가격 적용 조정 필요 
    // bidCount > 0 현재 최고가 , bidCount == 0 희망 판매가격  
    // 낙찰가
    // highestPrice, awardPrice, hopPrice
    if(bidStatus === "경매중") {
        return (
            <div className="text-sm">
                 <span>
                 {bidCount > 0 ? "현재 최고가" : "희망 판매가격"}<span className="text-POINT_BLUE"> ₩ {highestPrice !== null ? formatPrice(highestPrice) :formatPrice(hopePrice)}</span> 원
                </span>
            </div>
        )
    }


    if(bidStatus === "판매완료"){
        return (
            <div className="text-sm">
                <span>
                    낙찰가<span className="text-POINT_BLUE"> ₩ {formatPrice(awardPrice && awardPrice)}</span> 원
                </span>
            </div>
        )
    }

    //경매종료 - 마감 기한 지나서 
    return(
        <div className="text-sm">
            <span>
            {bidCount > 0 ? "현재 최고가" : "희망 판매가격"}<span className="text-POINT_BLUE"> ₩ {highestPrice !== null ? formatPrice(highestPrice) :formatPrice(hopePrice)}</span> 원
            </span>
        </div>

    )
}

export default StatusPrice;