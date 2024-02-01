import Image from "next/image";
import Error404 from "@/../public/svg/Error404.svg";

const NotFound = () => {
    return(
        <div className="flex justify-center mt-12">
            <Image src={Error404} alt="404" />
        </div>
    )
}

export default NotFound;