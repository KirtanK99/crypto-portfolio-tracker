import {
  Card,
  Typography,
  Divider,
  Box,
  Avatar,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Article {
  title: string;
  url: string;
  publishedAt: string;
  source: { name: string };
  urlToImage: string;
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const CryptoNewsCard = () => {
  const theme = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=cryptocurrency OR bitcoin OR ethereum OR crypto&language=en&pageSize=5&sortBy=publishedAt&apiKey=${API_KEY}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <Card
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
        p: 2,
        width: 350,
        minHeight: 'auto'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Recent Crypto News
      </Typography>
      <Divider sx={{ mb: 2, borderColor: 'rgba(235, 15, 15, 0.1)' }} />
      {articles.map((article, i) => (
        <Box
          key={i}
          sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2 }}
        >
          <Avatar
            src={article.urlToImage || '/crypto-icon.png'}
            alt={article.source.name}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              flexShrink: 0,
              mt: 0.25
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.light,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'block',
                mb: 0.3,
                lineHeight: 1.4
              }}
            >
              {article.title}
            </Typography>
            <Typography variant="caption" color="gray">
              {dayjs(article.publishedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Card>
  );
};

export default CryptoNewsCard;
