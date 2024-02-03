import { atom, selector } from "recoil";

interface loginAtomTypes {
    isLogin : boolean;
    ACCESS_TOKEN : string;
    REFRESH_TOKEN: string;
}

export const loginState = atom<loginAtomTypes>({
    key: "loginState",
    default : {
        isLogin: false,
        ACCESS_TOKEN: "",
        REFRESH_TOKEN: "",
    }
});

export const loginSelector = selector({
    key: "loginSelector",
    get: ({get}) => {
        const state = get(loginState);
        return state;
    },
    set: ({set}, newValue) => {
        set(loginState, newValue);
    }
})