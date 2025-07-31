import { Alchemy, Network } from 'alchemy-sdk';

const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const settings = {
    apiKey: alchemyApiKey,
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
