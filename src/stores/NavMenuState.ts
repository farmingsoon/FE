import { atom , selector } from "recoil";

interface menuAtomTypes {
    menu: string;
    onOff: boolean;
}

export const menuState = atom<menuAtomTypes[]>({
    key: "menuState",
    default: [{menu: "search", onOff: false}, {menu: "alarm", onOff: false}]
});

export const menuSelector = selector({
    key: "menuSelector",
    get: ({get}) => {
        const state = get(menuState);
        return state;
    },
    set: ({set}, newValue) => {
        set(menuState, newValue);
    }
});