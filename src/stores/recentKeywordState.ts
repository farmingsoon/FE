import LocalStorage from "@/util/localstorage";
import { atom, selector } from "recoil";

const localKeyworad = LocalStorage.getItem("recentKeyword") ?  JSON.parse(LocalStorage.getItem("recentKeyword")!) : [];
export const recentKeywordState = atom<string[]>({
    key: "recentKeywordState",
    default: localKeyworad
});

export const recentKeywordSelector = selector<string[]>({
    key: "recentKeywordSelector",
    get: ({get}) => {
        const state = get(recentKeywordState);
        return state;
    },
    set: ({set}, newValue) => {
        if(Array.isArray(newValue)){
            console.log("new ", newValue)
            const newState = [...newValue].slice(-3);
            set(recentKeywordState, newState);
            LocalStorage.setItem("recentKeyword", JSON.stringify(newState))
        };
    }
})