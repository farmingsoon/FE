import { atom, selector } from "recoil";

interface LikeItemStateTypes {
    isLike: boolean;
}

export const likeState = atom<LikeItemStateTypes>({
    key: "likeState",
    default: {isLike : false}
});

export const likeSelector = selector({
    key: "likeSelector",
    get: ({get}) => {
        const state = get(likeState);
        return state;
    },
    set: ({set}, newValue) => {
        set(likeState, newValue);
    }
})