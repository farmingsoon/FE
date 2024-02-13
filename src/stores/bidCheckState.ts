import { atom, selector } from "recoil";

interface bidCheckAtomTypes {
    isCheck : boolean;
    itemId: number;
}

export const bidCheckState = atom<bidCheckAtomTypes>({
    key: "bidCheckState",
    default : {
        isCheck: false,
        itemId: 0,
    }
});

export const bidCheckSelector = selector({
    key: "bidCheckSelector",
    get: ({get}) => {
        const state = get(bidCheckState);
        return state;
    },
    set: ({set}, newValue) => {
        set(bidCheckState, newValue);
    }
})