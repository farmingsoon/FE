import { atom, selector } from "recoil";

export const sseNotiState = atom<boolean>({
    key: "sseNotiState",
    default: false
});

export const sseNotiSelector = selector({
    key: "sseNotiSelector",
    get: ({get} ) => {
        const state = get(sseNotiState);
        return state;
    },
    set: ({set}, newValue) => {
        set(sseNotiState, newValue)
    }
})