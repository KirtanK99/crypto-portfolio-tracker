import type { TokenBalance } from '../types/token';
import { alchemy } from '../services/alchemy';
import { fetchTokenPrices } from '../services/coinGecko';
import { AssetTransfersCategory } from 'alchemy-sdk';
import { DEV_MODE, MOCK_TOKENS, MOCK_TRANSACTIONS } from '../constants/dev';
import type { Transaction } from '../types/transaction';

export async function getTransactions(address?: string, pageKey?: string): Promise<{
  transactions: Transaction[];
  nextPageKey?: string;
}> {
  if (DEV_MODE || !address) {
    return { transactions: MOCK_TRANSACTIONS };
  }

  const transfers = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toAddress: address,
    excludeZeroValue: true,
    maxCount: 20,
    pageKey,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721
    ]
  });

  const uniqueContracts = Array.from(
    new Set(
      transfers.transfers
        .map((tx) => tx.rawContract?.address)
        .filter(Boolean) as string[]
    )
  );

  // Fetch metadata for unique token contracts
  const metadataMap = new Map<string, string>();
  await Promise.all(
    uniqueContracts.map(async (address) => {
      const meta = await alchemy.core.getTokenMetadata(address);
      metadataMap.set(address, meta.logo || '');
    })
  );

  return {
    transactions: transfers.transfers.map((tx, index) => {
      const contractAddress = tx.rawContract?.address || '';
      const isETH = tx.asset?.toUpperCase() === 'ETH';

      return {
        id: index,
        token: tx.asset || 'ETH',
        type: tx.category === 'external' ? 'Send' : 'Receive',
        amount: parseFloat(tx.value || '0'),
        date: new Date(tx.metadata.blockTimestamp),
        status: 'completed',
        txHash: tx.hash,
        logoURI: isETH
          ? 'https://static.alchemyapi.io/images/assets/eth.png'
          : metadataMap.get(contractAddress) || ''
      };
    })
  };
}



export async function getPortfolioTokens(address?: string): Promise<TokenBalance[]> {
  if (!address) return [];

  if (DEV_MODE) {
    return MOCK_TOKENS;
  }

  const balancesResponse = await alchemy.core.getTokenBalances(address);
  const balances = balancesResponse.tokenBalances.slice(0, 5);

  const metadata = await Promise.all(
    balances.map(async (token) => {
      const meta = await alchemy.core.getTokenMetadata(token.contractAddress);
      return {
        contractAddress: token.contractAddress,
        symbol: meta.symbol || '',
        name: meta.name || '',
        balance: token.tokenBalance || '0',
        decimals: meta.decimals || 18,
        logoURI: meta.logo || '',
      };
    })
  );

  const contractAddresses = metadata.map((t) => t.contractAddress.toLowerCase());
  const priceMap = await fetchTokenPrices(contractAddresses);

  return metadata.map((token) => {
    const priceInfo = priceMap[token.contractAddress.toLowerCase()];
    const price = priceInfo?.usd || 0;
    const change24h = priceInfo?.usd_24h_change || 0;

    const isETH = token.symbol === 'ETH';
    const logoURI = isETH
      ? 'https://static.alchemyapi.io/images/assets/eth.png'
      : token.logoURI || priceInfo?.image || '';

    return {
      ...token,
      price,
      change24h,
      logoURI,
    };
  });

}
