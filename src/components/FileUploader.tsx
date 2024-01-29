import PlusCircle from "../../public/svg/PlusCircle";

const Fileuploader = () => {
    return(
        <form>
            <div className="flex border h-32 w-44  rounded-lg border-LINE_BORDER bg-zinc-500 justify-center items-center">
                <PlusCircle width={"35px"} height={"35px"}/>
                <input type="file" className="hidden" multiple accept="image/*"/>
            </div>
        </form>
    )
}

export default Fileuploader; 