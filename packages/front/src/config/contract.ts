import { sepolia } from 'wagmi/chains'
import type { Hash } from '../types';
export const CONTRACT_ADDRESS_MANTLE: Hash = '0xB74475009BD955CB8Ef3d930999737DF1Edb96a6';

export interface TGetNumberOfProperties {
  owner: Hash
}

export interface TChainContracts {
  // name: string;
  estate: Hash,
  rent?: Hash;
}

export interface TContracts {
  [id: string]: TChainContracts
}

export const contracts: TContracts = {
  [sepolia.id]: {
    estate: '0x512e9f0bFCC8989D7F4d2016b6b5147ea4089fEC',
    rent: '0x913f18195Dc71A6897Ef6403726bbEE34B3B3c3b'
  },
}
