import { SVG } from "@/types/SVG";

interface clickSVG extends SVG {
    onClick?: () => void;
}

const ArrowRight = ( {width, height, onClick}: clickSVG ) => {
    return(
        <button onClick={onClick}>
            <svg width={width} height={height} viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M338.752 104.704a64 64 0 000 90.496l316.8 316.8-316.8 316.8a64 64 0 0090.496 90.496l362.048-362.048a64 64 0 000-90.496L429.248 104.704a64 64 0 00-90.496 0z"/>
            </svg>
        </button>
    )
}

export default ArrowRight;