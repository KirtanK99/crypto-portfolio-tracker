import { Card, CardContent, Box, TextField, InputAdornment, MenuItem, FormControl, Select, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';

type Props = {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  sortType: 'value' | 'performance' | 'alpha';
  onSortChange: (v: 'value' | 'performance' | 'alpha') => void;
};

export default function SearchBar({ searchQuery, onSearchChange, sortType, onSortChange }: Props) {
  const theme = useTheme();

  const searchFieldSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: 'white',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255,255,255,0.5)',
      opacity: 1
    }
  };

  return (
    <Card
      sx={{
        mb: 4,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                )
              }
            }}
            sx={searchFieldSx}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={sortType}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e) => onSortChange(e.target.value as any)}
              sx={{
                color: 'rgba(255,255,255,0.7)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.2)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main
                },
                '& .MuiSelect-icon': {
                  color: 'rgba(255,255,255,0.7)'
                },
                minWidth: 150
              }}
            >
              <MenuItem value="value">Sort by Value</MenuItem>
              <MenuItem value="performance">Sort by Performance</MenuItem>
              <MenuItem value="alpha">Sort A–Z</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}
