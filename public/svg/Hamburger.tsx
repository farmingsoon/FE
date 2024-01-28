import { SVG } from "@/types/SVG";

const Hamburger = ({width, height}: SVG) => {
    return(
        <svg width={width} height={height} viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12.32H22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 18.32H22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 6.32001H22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default Hamburger;