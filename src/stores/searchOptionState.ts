import { atom , selector } from "recoil";

interface searchAtomTypes {
    option: string;
    keyword: string;
}

export const searchState = atom<searchAtomTypes>({
    key: "searchState",
    default: { option : "" , keyword: ""}
});

export const searchSelector = selector({
    key: "searchSelector",
    get: ({get}) => {
        const state = get(searchState);
        return state;
    },
    set: ({set}, newValue) => {
        set(searchState, newValue);
    }
});