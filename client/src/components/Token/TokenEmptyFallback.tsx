import { Card, CardContent, Typography, Button } from '@mui/material';
import { Add, AccountBalanceWallet } from '@mui/icons-material';

export default function TokenEmptyFallback() {
  return (
    <Card
      sx={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        textAlign: 'center',
        mt: 4,
        px: 2,
      }}
    >
      <CardContent sx={{ py: 8 }}>
        <AccountBalanceWallet
          sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }}
        />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          No tokens found
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255,255,255,0.7)"
          sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
        >
          Your wallet doesn't have any tokens yet, or they're still loading.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: '#6c5ce7',
            '&:hover': { bgcolor: '#5a52d5' },
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
          onClick={() => window.location.reload()}
        >
          Refresh Tokens
        </Button>
      </CardContent>
    </Card>
  );
}
