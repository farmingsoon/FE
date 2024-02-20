import { atom, selector } from "recoil";
import LocalStorage from "@/util/localstorage";

export const likeState = atom<string[]>({
    key: "likeState",
    default: LocalStorage.getItem("likeItems") ? JSON.parse(LocalStorage.getItem("likeItems")!)  : [],

});

export const likeSelector = selector({
    key: "likeSelector",
    get: ({get}) => {
        const state = get(likeState);
        return state;
    },
    set: ({set}, newValue) => {
        set(likeState, newValue);
        LocalStorage.setItem("likeItems", JSON.stringify(newValue))
    }
})