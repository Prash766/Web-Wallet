import {atom} from 'recoil'

export const MnemonicArray = atom<string[]>({
    key:"mnemonicsAtom",
    default:[]
})