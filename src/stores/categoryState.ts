import { atom, selector } from "recoil";

interface CategoryAtomTypes {
    category : string;
}

export const categoryState = atom<CategoryAtomTypes>({
    key: "categoryState",
    default: {category: "의류"}
});

export const categorySelector = selector({
    key: "categorySelector",
    get: ({get}) => {
        const state = get(categoryState);
        return state;
    },
    set: ({set}, newValue) => {
        set(categoryState, newValue);
    }
})