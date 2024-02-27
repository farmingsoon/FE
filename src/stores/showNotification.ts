import { atom, selector } from "recoil";

export const showNotificationAtom = atom<boolean>({
    key: "showNotifistate",
    default: true
});

export const showNotificationSelctor = selector({
    key: "showNotifiSelector",
    get: ({get} ) => {
        const state = get(showNotificationAtom);
        return state;
    },
    set: ({set}, newValue) => {
        set(showNotificationAtom, newValue)
    }
})