import Image, { StaticImageData } from "next/image";
import noPhoto from "../../public/img/noPhoto.png";

interface ImgTypes {
    type: "circle" | "normal";
    src: string | undefined | null | StaticImageData;
    width: number;
    height: number;
    status?: "soldout" | "bidding";
}

const Img = ({type, src, width, height, status}: ImgTypes) => {
    const imgStyle = type === "circle" ?  "relative border rounded-full bg-black " : "relative border rounded-lg"
    //src가 StaticImage 인 경우, 객체의 src 속성을 사용
    //그렇지 않은 경우 src가 null 이면 noPhotosrc | src그대로 사용 
    const imageSrc = src instanceof Object ? src.src : (src ?? noPhoto);
   

    return(
        <div className={imgStyle}>
            <Image src={imageSrc} width={width} height={height} alt={src ? "Content" : "No Image"} placeholder="blur"  
                blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMjor6DwAEVwIYw8TrsgAAAABJRU5ErkJggg=="}/>
            {status && status === "soldout" && (
            <div className="absolute inset-0 w-full h-full bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center">
                <div className="font-semibold text-2xl text-white">판매 완료</div>
            </div>
            )}
        </div>
    )
}

export default Img;

// {
//     src === undefined || src === null 
//     ? <Image  src={noPhoto} width={width} height={height} alt="No data" placeholder="blur" />
//     : <Image  src={imageSrc} width={width} height={height} alt="Content" placeholder="blur"/>
// }