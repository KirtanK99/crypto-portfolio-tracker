import { toRawBalance } from '../utils/formatDecimals';
import type { TokenBalance } from '../types/token';
import type { Transaction } from '../types/transaction';

export const DEV_MODE = true;

export const MOCK_TOKENS: TokenBalance[] = [
  {
    contractAddress: '0x1',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: toRawBalance(2.345, 18),
    decimals: 18,
    logoURI: 'https://static.alchemyapi.io/images/assets/eth.png',
    price: 3250.01,
    change24h: 2.45,
  },
  {
    contractAddress: '0x2',
    symbol: 'USDC',
    name: 'USD Coin',
    balance: toRawBalance(1500, 6),
    decimals: 6,
    logoURI: 'https://static.alchemyapi.io/images/assets/3408.png',
    price: 1.0,
    change24h: 0.03,
  },
  {
    contractAddress: '0x3',
    symbol: 'MATIC',
    name: 'Polygon',
    balance: toRawBalance(870, 18),
    decimals: 18,
    logoURI: 'https://static.alchemyapi.io/images/assets/3890.png',
    price: 0.89,
    change24h: -1.82,
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    token: 'ETH',
    type: 'Send',
    amount: -0.5,
    date: new Date('2025-07-29'),
    status: 'completed',
    txHash: '0xmock1',
    logoURI: 'https://static.alchemyapi.io/images/assets/eth.png'
  },
  {
    id: 2,
    token: 'USDC',
    type: 'Receive',
    amount: 20,
    date: new Date('2025-07-28'),
    status: 'completed',
    txHash: '0xmock2',
    logoURI: 'https://static.alchemyapi.io/images/assets/3408.png'
  },
  {
    id: 3,
    token: 'MATIC',
    type: 'Swap',
    amount: -10,
    date: new Date('2025-07-27'),
    status: 'failed',
    txHash: '0xmock3',
    logoURI: 'https://static.alchemyapi.io/images/assets/3890.png'
  },
  {
    id: 4,
    token: 'BTC',
    type: 'Receive',
    amount: 0.01,
    date: new Date('2025-07-26'),
    status: 'pending',
    txHash: '0xmock4',
    logoURI: 'https://static.alchemyapi.io/images/assets/1.png'
  }
];
