import { atom, selector } from "recoil";

interface homePageAtom {
    page: number,
}

export const homePageState = atom<homePageAtom>({
    key: "homePageState",
    default : {
        page: 0,
    }
});

export const homePageSelector = selector({
    key: "homePageSelector",
    get: ({get}) => {
        const state = get(homePageState);
        return state;
    },
    set: ({set}, newValue) => {
        set(homePageState, newValue);
    }
})