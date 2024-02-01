import Close from "../../../public/svg/Close";
import SearchIcon from "../../../public/svg/SearchIcon";

const RecentSearchItem = () => {
    return(
        <div className="flex flex-row justify-between items-center">
            <SearchIcon width={"20px"} height={"20px"} />
            <div className="font-normal flex-1 mx-3">신발230</div>
            <Close width={"20px"} height={"20px"} />
        </div>
    )
}

export default RecentSearchItem;