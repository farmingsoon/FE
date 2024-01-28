const NavDropdown = () => {
    const btnStyle = ""
    return(
        <div className="shadow-lg border-zinc-50 rounded-lg pt-3 pb-1 px-4 w-52 absolute bottom-12 left-8 z-20 bg-white">
            <ul className=" text-base">
                <li className="py-3 hover:text-MAIN_COLOR"><button className={btnStyle}>보관 상품</button></li>
                <li className="py-3 hover:text-MAIN_COLOR border-b border-LINE_BORDER"><button className={btnStyle}>프로필</button></li>
                <li className="py-3 hover:text-MAIN_COLOR"><button className={btnStyle}>로그아웃</button></li>
            </ul>
        </div>
    )
}

export default NavDropdown;