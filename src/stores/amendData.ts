import { atom, selector } from "recoil";

interface AmendAtomTypes {
    title: string;
    description: string;
    hopePrice: number;
    period: number;
    thumbnailImage: string;
    images: string[];
}

export const amendState = atom<AmendAtomTypes>({
    key: "amendState",
    default : {
        title: "",
        description: "",
        hopePrice: 0,
        period: 0,
        thumbnailImage:  "",
        images: [],
    }
});

export const amendSelector = selector({
    key: "amendSelector",
    get: ({get}) => {
        const state = get(amendState);
        return state;
    },
    set: ({set}, newValue) => {
        set(amendState, newValue);
    }
})