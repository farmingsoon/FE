import { SVG } from "@/types/SVG"

const LocationPin = ({width, height}: SVG) => {
    return(
        <svg width={width} height={height} viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g>
                <path d="M27,12   c0-6.075-4.925-11-11-11S5,5.925,5,12c0,8,11,19,11,19S27,20,27,12z" fill="#28CC9E" stroke="#28CC9E" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                <circle cx="16" cy="12" fill="#FFFFFF" r="4" stroke="#FFFFFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
            </g>
        </svg>
    )
}

export default LocationPin;
