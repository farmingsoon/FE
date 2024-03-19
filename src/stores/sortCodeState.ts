import { atom, selector } from "recoil";

interface sortCodeAtom {
    sortCode: string;
    isCheckBox: boolean;
}

export const sortCodeAtom = atom<sortCodeAtom>({
    key: "sortCodeAtom",
    default: {
        sortCode: "recent", 
        isCheckBox: false,
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