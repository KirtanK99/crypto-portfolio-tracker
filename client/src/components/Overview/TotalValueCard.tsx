import { Box, Typography, IconButton, Chip, useTheme } from '@mui/material';
import { Visibility, VisibilityOff, TrendingUp, TrendingDown } from '@mui/icons-material';

type Props = {
  showBalance: boolean;
  onToggleShow: () => void;
  totalValue: number;
  changePct: number;
  totalChange24h: number;
  formatCurrency: (n: number) => string;
};

export default function TotalValueCard({
  showBalance,
  onToggleShow,
  totalValue,
  changePct,
  totalChange24h,
  formatCurrency
}: Props) {
  const theme = useTheme();
  const isUp = changePct >= 0;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Total Portfolio Value
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '3rem', color: theme.palette.text.primary }}>
            {showBalance ? formatCurrency(totalValue) : '••••••'}
          </Typography>
          <IconButton onClick={onToggleShow} sx={{ color: theme.palette.text.disabled }}>
            {showBalance ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Chip
            icon={isUp ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
            label={`${changePct.toFixed(2)}% (${formatCurrency(totalChange24h)}) 24h`}
            size="small"
            sx={{
              bgcolor: isUp
                ? theme.palette.success.light + '33'
                : theme.palette.error.light + '33',
              color: isUp ? theme.palette.success.main : theme.palette.error.main,
              '& .MuiChip-icon': {
                color: isUp ? theme.palette.success.main : theme.palette.error.main
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
