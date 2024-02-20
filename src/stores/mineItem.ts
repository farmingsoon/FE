import { atom, selector } from "recoil";

interface mineItemAtomTypes {
    itemId: number;
    type: string;
    highestPrice: number;
    lowestPrice: number;
    sellerBidOpen: boolean;
    buyerBidOpen:  boolean;
}

export const mineItemAtom = atom<mineItemAtomTypes>({
    key: "mineItemState",
    default: {
        itemId: 0,
        type: "seller",
        highestPrice: 0, 
        lowestPrice: 0,
        sellerBidOpen: false,
        buyerBidOpen:  false
    }
});

export const mineItemSelector = selector({
    key: "mineItemSelector",
    get: ({get}) => {
        const state = get(mineItemAtom);
        return state;
    },
    set: ({set}, newValue) => {
        set(mineItemAtom, newValue);
    }
})