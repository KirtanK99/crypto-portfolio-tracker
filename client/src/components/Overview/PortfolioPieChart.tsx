import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import {
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { useState } from 'react';

type Token = {
  symbol: string;
  balance: string;
  decimals: number;
  price?: number;
};

type Props = {
  tokens: Token[];
};

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50',
  '#00C49F', '#FFBB28', '#0088FE', '#d4a5ff'
];

export default function PortfolioPieChart({ tokens }: Props) {
  const theme = useTheme();
  const [sortType, setSortType] = useState<'value' | 'alphabetical'>('value');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };

  const totalValue = tokens.reduce((sum, token) => {
    const bal = parseFloat(token.balance) / 10 ** token.decimals;
    return sum + bal * (token.price || 0);
  }, 0);

  const data = tokens
    .map((token) => {
      const value =
        (parseFloat(token.balance) / 10 ** token.decimals) *
        (token.price || 0);
      return { name: token.symbol, value };
    })
    .filter((t) => t.value > 0);

  if (sortType === 'alphabetical') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    data.sort((a, b) => b.value - a.value);
  }

  if (tokens.length === 0 || totalValue === 0) {
    return (
      <Card
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.shape.borderRadius,
          background: theme.palette.background.default,
          border: `1px dashed ${theme.palette.divider}`
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No data to display
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Your portfolio allocation will show here once tokens have value.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
        height: 'fit-content'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Portfolio Allocation
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortType}
            onChange={handleSortChange}
            displayEmpty
            sx={{
              color: theme.palette.text.secondary,
              backgroundColor: 'transparent',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light
              },
              '& .MuiSelect-icon': {
                color: theme.palette.text.secondary
              },
              height: '40px',
              borderRadius: 1.5
            }}
          >
            <MenuItem value="value">By Value</MenuItem>
            <MenuItem value="alphabetical">By Symbol</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <PieChart width={480} height={350}>
            <Pie
              data={data}
              cx={240}
              cy={175}
              innerRadius={0}
              outerRadius={120}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
              contentStyle={{
                background: theme.palette.background.default,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.text.primary,
                fontWeight: 500,
                padding: '10px 12px',
                textAlign: 'left'
              }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: theme.palette.text.primary }}
            />
          </PieChart>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.map((entry, index) => (
              <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: COLORS[index % COLORS.length]
                }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                  {entry.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
