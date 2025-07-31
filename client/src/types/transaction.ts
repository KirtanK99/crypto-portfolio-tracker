export interface Transaction {
  id: number;
  token: string;
  type: 'Send' | 'Receive' | 'Swap';
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
  logoURI?: string;
};
