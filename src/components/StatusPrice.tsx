interface StatusPriceTypes {
    bidStatus: string;
    highestPrice: number;
    hopePrice: number;
}

const StatusPrice = ( {bidStatus, highestPrice, hopePrice}: StatusPriceTypes ) => {

    const formatPrice = (price: number) => {
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //상태 값에 맞게 가격 적용 조정 필요 

    if(bidStatus === "경매중" ) {
        return (
            <div className="text-sm">
                 <span>
                    {highestPrice !== null ? "현재 최고가" : "희망 판매가"}<span className="text-POINT_BLUE"> ₩ {highestPrice !== null ? formatPrice(highestPrice) : formatPrice(hopePrice)}</span> 원
                </span>
            </div>
        )
    }

    //경매종료, 판매완료
    //lowest Price 말고 biddPrice 필요 - 낙찰된 가격 
    return(
        <div className="text-sm">
            <span>
                현재 최고가<span className="text-POINT_BLUE"> ₩ {formatPrice(highestPrice)}</span> 원
            </span>
        </div>

    )
}

export default StatusPrice;