import { SVG } from "@/types/SVG";

const BookmarkSVG = ({width, height, fillColor}: SVG) => {
    const fillC = fillColor ? fillColor : "#000000";
    return(
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M5.5 1C4.39543 1 3.5 1.89543 3.5 3V22C3.5 22.3612 3.6948 22.6944 4.00961 22.8715C4.32441 23.0486 4.71028 23.0422 5.01903 22.8548L12 18.6157L18.981 22.8548C19.2897 23.0422 19.6756 23.0486 19.9904 22.8715C20.3052 22.6944 20.5 22.3612 20.5 22V3C20.5 1.89543 19.6046 1 18.5 1H5.5Z" 
                fill={fillC}
            />
        </svg>
    )
}

export default BookmarkSVG;