// import Close from "../../../public/svg/Close";
import SearchIcon from "../../../public/svg/SearchIcon";

type RecentKeywordTypes = {
    keyword: string;
}

const RecentSearchItem = ({keyword}: RecentKeywordTypes) => {
    return(
        <div className="flex flex-row justify-between items-center my-3 text-sm">
            <SearchIcon width={"20px"} height={"20px"} />
            <div className="font-light flex-1 mx-3">{keyword}</div>
            {/* <Close width={"20px"} height={"20px"} /> */}
        </div>
    )
}

export default RecentSearchItem;