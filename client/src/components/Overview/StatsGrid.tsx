// components/StatsGrid.tsx
import { Grid, Paper, Typography, useTheme } from '@mui/material';

type Props = {
  totalAssets: number;
  bestPerformerLabel: string;
  totalChange24h: number;
  changePct: number;
  formatCurrency: (n: number) => string;
};

export default function StatsGrid({
  totalAssets,
  bestPerformerLabel,
  totalChange24h,
  changePct,
  formatCurrency
}: Props) {
  const theme = useTheme();

  const statPaperSx = {
    p: 3,
    bgcolor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease',
    minHeight: 100,
    '&:hover': {
      bgcolor: theme.palette.action.hover,
      transform: 'translateY(-2px)'
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={statPaperSx}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Total Assets
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary, mt: 1 }}>
            {totalAssets}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={statPaperSx}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Best Performer
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: bestPerformerLabel ? theme.palette.success.main : theme.palette.text.disabled, mt: 1 }}
          >
            {bestPerformerLabel || 'No data yet'}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={statPaperSx}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            24h Change
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: changePct >= 0 ? theme.palette.success.main : theme.palette.error.main, fontWeight: 600, mt: 1 }}
          >
            {formatCurrency(totalChange24h)}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={statPaperSx}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Portfolio Diversity
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary, mt: 1 }}>
            {totalAssets} {totalAssets === 1 ? 'Token' : 'Tokens'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
