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
    // name: 'sepolia',
    estate: '0xbA7a18ecF10f054052BF3E9C81dA0e39925491c9',
    // rent: ''
  },
}
