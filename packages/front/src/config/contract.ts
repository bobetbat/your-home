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
    estate: '0xA891a06e78B942a3D9f27098672a7FE6074b93aC',
    // rent: ''
  },
}
