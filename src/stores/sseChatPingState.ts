import { atom, selector } from "recoil";

export const sseChattingPing = atom<boolean>({
    key: "sseChattingState",
    default: false
});

export const sseChattingSelector = selector({
    key: "sseChattingSelector",
    get: ({get} ) => {
        const state = get(sseChattingPing);
        return state;
    },
    set: ({set}, newValue) => {
        set(sseChattingPing, newValue)
    }
})