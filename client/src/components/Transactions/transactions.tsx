import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  Box, FormControl, InputLabel, MenuItem, Select, Button,
  Avatar
} from '@mui/material';
import { } from '@mui/material';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getTransactions, type Transaction } from '../../services/tokenServices';

export default function TransactionsTab() {
  const theme = useTheme();
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    token: 'all'
  });
  const [pageKey, setPageKey] = useState<string | undefined>();
  const [loadingMore, setLoadingMore] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const { transactions: txs, nextPageKey } = await getTransactions(address);
      setTransactions(txs);
      setPageKey(nextPageKey);
    }

    fetchData();
  }, [address]);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'failed':
        return theme.palette.error.main;
      case 'pending':
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const filtered = transactions.filter((tx) => {
    const matchType = filters.type === 'all' || tx.type === filters.type;
    const matchStatus = filters.status === 'all' || tx.status === filters.status;
    const matchToken = filters.token === 'all' || tx.token === filters.token;
    return matchType && matchStatus && matchToken;
  });


  if (!isConnected) return null;

  return (
    <Card
      sx={{
        mb: 4,
        background: theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Recent Transactions
        </Typography>

        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <FormControl size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
              label="Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Send">Send</MenuItem>
              <MenuItem value="Receive">Receive</MenuItem>
              <MenuItem value="Swap">Swap</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel>Token</InputLabel>
            <Select
              value={filters.token}
              onChange={(e) => setFilters((f) => ({ ...f, token: e.target.value }))}
              label="Token"
            >
              <MenuItem value="all">All</MenuItem>
              {[...new Set(transactions.map((t) => t.token))].map((token) => (
                <MenuItem key={token} value={token}>
                  {token}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {transactions.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No transactions found.
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Token</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={tx.logoURI}
                          alt={tx.token}
                          sx={{ width: 24, height: 24 }}
                        />
                        {tx.token}
                      </TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell
                        sx={{ color: tx.amount < 0 ? theme.palette.error.main : theme.palette.success.main }}
                      >
                        {tx.amount > 0 ? '+' : ''}
                        {tx.amount} {tx.token}
                      </TableCell>
                      <TableCell>{format(tx.date, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(tx.status) + '22',
                            color: getStatusColor(tx.status),
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {pageKey && (
              <Box textAlign="center" mt={2}>
                <Button
                  variant="outlined"
                  onClick={async () => {
                    setLoadingMore(true);
                    const { transactions: newTxs, nextPageKey: nextKey } = await getTransactions(address, pageKey);
                    setTransactions((prev) => [...prev, ...newTxs]);
                    setPageKey(nextKey);
                    setLoadingMore(false);
                  }}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </Button>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
