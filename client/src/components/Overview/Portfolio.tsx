import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Container,
  AppBar,
  Toolbar,
  useTheme
} from '@mui/material';
import { Wallet, Circle } from '@mui/icons-material';
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import TokenList from '../Token/TokenList';
import TokenEmptyFallback from '../Token/TokenEmptyFallback';
import { TotalValueCard, StatsGrid, PortfolioPieChart, CryptoNewsCard } from '.';
import { getPortfolioTokens } from '../../services/tokenServices';
import TransactionsTab from '../Transactions/transactions';


type TokenBalance = {
  contractAddress: string;
  symbol: string;
  balance: string;
  decimals: number;
  price?: number;
  change24h?: number;
  logoURI?: string;
  name?: string;
};

export default function Portfolio() {
  const theme = useTheme();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [tokens, setTokens] = useState<TokenBalance[]>([]);

  const { address, isConnected } = useAccount();

  const { data: ethBalance } = useBalance({
    address,
    chainId: 11155111,
    watch: true,
  });

  useEffect(() => {
    async function loadTokens() {
      const fetched = await getPortfolioTokens(address);
      setTokens(fetched);
    }
    if (address) loadTokens();
  }, [address]);

  const totalValue = tokens.reduce((sum, token) => {
    const bal = parseFloat(token.balance) / 10 ** token.decimals;
    return sum + bal * (token.price || 0);
  }, 0);

  const totalChange24h = tokens.reduce((sum, token) => {
    const bal = parseFloat(token.balance) / 10 ** token.decimals;
    const value = bal * (token.price || 0);
    return sum + (value * (token.change24h || 0)) / 100;
  }, 0);

  const changePct = totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

  const bestPerformer = tokens.reduce((best, token) => {
    return (token.change24h || 0) > (best.change24h || 0) ? token : best;
  }, tokens[0] || null);

  const bestPerformerLabel = bestPerformer
    ? `${bestPerformer.symbol} (+${bestPerformer.change24h?.toFixed(2)}%)`
    : '';

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, color: theme.palette.text.primary }}>

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.paper + 'CC',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[4]
        }}
      >

        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#ff6b6b', width: 40, height: 40 }}>₿</Avatar>
            <Typography variant="h6" fontWeight={600}>Crypto Portfolio Tracker</Typography>
            {isConnected && ethBalance && (
              <Chip
                label={`${parseFloat(ethBalance.formatted).toFixed(4)} ETH`}
                size="small"
                sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)', color: '#4caf50', fontWeight: 500 }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isConnected && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Circle sx={{ color: '#4caf50', fontSize: 8 }} />
                <Typography variant="body2" color="rgba(255,255,255,0.7)">Connected</Typography>
              </Box>
            )}
            <ConnectButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ paddingTop: '100px' }}>
        {isConnected ? (
          <>
            <Box sx={{ mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(e, newVal) => setActiveTab(newVal)}
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    height: 3,
                    borderRadius: '3px 3px 0 0'
                  },
                  '& .MuiTab-root': {
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&.Mui-selected': {
                      color: theme.palette.primary.main
                    }
                  }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Tokens" />
                <Tab label="Transactions" />
              </Tabs>
            </Box>

            {activeTab === 0 && (
              <>
                <Card sx={{ mb: 4, background: theme.palette.background.paper, backdropFilter: 'blur(10px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <TotalValueCard
                      showBalance={showBalance}
                      onToggleShow={() => setShowBalance(!showBalance)}
                      totalValue={totalValue}
                      changePct={changePct}
                      totalChange24h={totalChange24h}
                      formatCurrency={formatCurrency}
                    />
                    <StatsGrid
                      totalAssets={tokens.length}
                      bestPerformerLabel={bestPerformerLabel}
                      totalChange24h={totalChange24h}
                      changePct={changePct}
                      formatCurrency={formatCurrency}
                    />
                  </CardContent>
                </Card>
                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1, minWidth: 250 }}>
                    <PortfolioPieChart tokens={tokens} />
                  </Box>
                  <CryptoNewsCard />
                </Box>
              </>
            )}

            {activeTab === 1 && (
              <>{tokens.length === 0 ? <TokenEmptyFallback /> : <TokenList tokens={tokens} />}</>
            )}

            {activeTab === 2 && <TransactionsTab />}

          </>
        ) : (
          <Card sx={{ background: theme.palette.background.paper, backdropFilter: 'blur(10px)', border: `1px solid ${theme.palette.divider}`, borderRadius: 3, textAlign: 'center' }}>
            <CardContent sx={{ py: 8 }}>
              <Wallet sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight={600}>Connect Your Wallet</Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.7)" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                Connect your wallet to start tracking your crypto portfolio and see real-time token balances and prices.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}
