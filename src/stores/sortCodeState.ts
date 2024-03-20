import { atom, selector } from "recoil";

interface sortCodeAtom {
    sortCode: string;
    isCheckBox: "BIDDING" | "SOLDOUT";
}

export const sortCodeAtom = atom<sortCodeAtom>({
    key: "sortCodeAtom",
    default: {
        sortCode: "recent", 
        isCheckBox: "BIDDING",
    }
});

export const sortCodeSelector = selector({
    key: "sortCodeSelector",
    get: ({get}) => {
        const state = get(sortCodeAtom);
        return state;
    },
    set: ({set}, newValue) => {
        set(sortCodeAtom, newValue);
    }
})