import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import SearchBar from './SearchBar';
import TokenSparkline from './TokenSparkline';

function formatCurrency(num: number) {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  });
}

function generateMockHistory(base: number) {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `T-${i}`,
    value: base + (Math.random() - 0.5) * (base * 0.02)
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenList = ({ tokens }: { tokens: any[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<'value' | 'performance' | 'alpha'>('value');
  const theme = useTheme();

  const filteredTokens = tokens.filter((token) => {
    const query = searchQuery.toLowerCase();
    return (
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query)
    );
  });

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    if (sortType === 'value') {
      const aValue = (Number(a.balance) / 10 ** a.decimals) * a.price;
      const bValue = (Number(b.balance) / 10 ** b.decimals) * b.price;
      return bValue - aValue;
    } else if (sortType === 'performance') {
      return (b.change24h || 0) - (a.change24h || 0);
    } else if (sortType === 'alpha') {
      return a.symbol.localeCompare(b.symbol);
    }
    return 0;
  });

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortType={sortType}
        onSortChange={setSortType}
      />

      {sortedTokens.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            color: theme.palette.text.secondary,
            mt: 8
          }}
        >
          <Typography variant="h5" gutterBottom>
            🔍 No tokens found
          </Typography>
          <Typography variant="body2">
            Try a different search or reset your filters.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {sortedTokens.map((token) => {
            const value = (Number(token.balance) / Math.pow(10, token.decimals)) * token.price;
            const historyData = token.history?.length
              ? token.history
              : generateMockHistory(token.price);

            return (
              <Grid item xs={12} sm={6} md={3} key={token.symbol}>
                <Card
                  sx={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: theme.shape.borderRadius,
                    color: theme.palette.text.primary,
                    p: 3,
                    minHeight: 50,
                    minWidth: 300
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={token.logoURI}
                        alt={token.symbol}
                        sx={{
                          bgcolor: 'white',
                          width: 40,
                          height: 40
                        }}
                      />

                      <Box>
                        <Typography variant="h6">{token.symbol}</Typography>
                        <Typography variant="body2" color={theme.palette.text.secondary}>
                          {token.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2, mb: 2, minHeight: 50 }}>
                      <TokenSparkline data={historyData} change24h={token.change24h} />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color={theme.palette.text.secondary}>
                        Balance:
                      </Typography>
                      <Typography>
                        {(Number(token.balance) / Math.pow(10, token.decimals)).toFixed(4)}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color={theme.palette.text.secondary}>
                        Value:
                      </Typography>
                      <Typography>{formatCurrency(value)}</Typography>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      <Chip
                        icon={token.change24h >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
                        label={`${token.change24h.toFixed(2)}% 24h`}
                        size="small"
                        sx={{
                          bgcolor: token.change24h >= 0 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                          color: token.change24h >= 0 ? '#4caf50' : '#f44336',
                          fontWeight: 600,
                          mt: 1,
                          '.MuiChip-icon': {
                            color: token.change24h >= 0 ? '#4caf50' : '#f44336',
                            ml: '-4px'
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default TokenList;
