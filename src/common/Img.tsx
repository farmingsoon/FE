import { StaticImageData } from "next/image";
import noPhoto from "../../public/img/noPhoto.png";
interface ImgTypes {
    type: "circle" | "normal";
    src: string | undefined | null | StaticImageData;
}

const Img = ({type, src}: ImgTypes) => {
    const imgType = type === "circle" ?  "rounded-full" : "rounded-lg"
    const imgStyle = `w-full h-full border ${imgType}`;
    //src가 StaticImage 인 경우, 객체의 src 속성을 사용
    //그렇지 않은 경우 src가 null 이면 noPhotosrc | src그대로 사용 
    const imageSrc = src instanceof Object ? src.src : (src ?? noPhoto.src);


    return(
        <div className={imgStyle}>
        {
            src === undefined || src === null 
            ? <img src={noPhoto.src} className="object-contain w-full h-full" alt="No data" />
            : <img src={imageSrc} className="object-contain w-full h-full" alt="Content" />
        }
        </div>
    )
}

export default Img;