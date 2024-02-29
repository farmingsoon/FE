import { DefaultValue, atom, atomFamily, selectorFamily } from "recoil";

interface ModalInfo {
    sseState: boolean;
}

type ModalId = string;

export const sseNotiAtomFamily = atomFamily<ModalInfo, ModalId>({
    key: "sseNotiAtomFamily",
    default: () => ({
        // type,
        sseState: false,
    })

});

export const sseNotiAtom = atom<ModalId[]>({
    key: "sseNotiAtom",
    default : ["chatPING", "notiPING", "chatMSG", "notiMSG"],
});


export const sseNotiSelectorFamily = selectorFamily<ModalInfo, ModalId>({
    key: "sseNotiSelectorFamily",
    get: (type) => ({get}) => get(sseNotiAtomFamily(type)),
    set: (type) => ({set, reset}, newValue) => {
        if(newValue instanceof DefaultValue){
            reset(sseNotiAtomFamily(type))
            set(sseNotiAtom, (prev) => prev.filter((item) => item !== type))
            
            return
        }


    set(sseNotiAtomFamily(type), newValue)
    },
})