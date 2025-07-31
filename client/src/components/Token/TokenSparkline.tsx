import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

const TokenSparkline = ({
  data,
  change24h
}: {
  data: { time: string; value: number }[];
  change24h: number;
}) => {
  const theme = useTheme();
  const strokeColor = change24h >= 0
    ? theme.palette.success.main
    : theme.palette.error.main;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TokenSparkline;
