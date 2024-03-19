import {atom , selector } from "recoil";

export const selectMenu = atom({
    key: "selectMenuTab",
    default : "home",
});

export const amendMenuSelector = selector({
    key: "amendMenuSelector",
    get: ({get}) => {
        const state = get(selectMenu);
        return state;
    },
    set: ({set}, newValue) => {
        set(selectMenu, newValue)
    }
});