export interface TokenBalance {
  contractAddress: string;
  symbol: string;
  name: string;
  balance: string; // raw balance as string
  decimals: number;
  logoURI?: string;
  price?: number;       // optional, fetched from price API
  change24h?: number;   // optional, fetched from price API
}
