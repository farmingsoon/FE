import { atom, selector } from "recoil";

interface TokenModalTypes {
    tokenExpired: boolean;
}

export const tokenState = atom<TokenModalTypes>({
    key: "tokenState",
    default: {tokenExpired: false}
});

export const tokenSelector = selector({
    key: "tokenSelector",
    get: ({get}) => {
        const state = get(tokenState);
        return state;
    },
    set: ({set}, newValue) => {
        set(tokenState, newValue);
    }
})