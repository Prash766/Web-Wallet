import {atom} from 'recoil'
import { SolanaWallet, Wallet } from '@/interfaces/Wallet'

export const EthWallets = atom<Wallet[]>({
    key:"ethwalletsatom",
    default:[]

})

export const SolanaWallets = atom<SolanaWallet[]>({
    key:"solanawalletkey",
    default:[]
})