import { atom, selector } from "recoil";

interface kakaoLoginAtom {
    kakaoInfo : boolean;
}

export const kakaoLoginState = atom<kakaoLoginAtom>({
    key: "kakaoLoginState",
    default : {
        kakaoInfo: false,
    }
});

export const kakaoLoginSelector = selector({
    key: "kakaoLoginSelector",
    get: ({get}) => {
        const state = get(kakaoLoginState);
        return state;
    },
    set: ({set}, newValue) => {
        set(kakaoLoginState, newValue);
    }
})