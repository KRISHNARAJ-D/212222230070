import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';

function StatsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('shortenedLinks');
    setData(saved ? JSON.parse(saved) : []);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Statistics</Typography>

      {data.length === 0 ? (
        <Typography>No URLs found.</Typography>
      ) : (
        data.map((item, i) => (
          <Paper key={i} style={{ padding: 12, marginBottom: 15 }}>
            <Typography><strong>Original:</strong> {item.url}</Typography>
            <Typography><strong>Short:</strong> <a href={item.shortUrl}>{item.shortUrl}</a></Typography>
            <Typography><strong>Expires:</strong> {item.expiry}</Typography>
            <Typography><strong>Clicks:</strong> {item.clicks || 0}</Typography>

            {item.details && item.details.length > 0 && (
              <>
                <Typography style={{ marginTop: 8 }}><strong>Click Logs:</strong></Typography>
                {item.details.map((d, idx) => (
                  <div key={idx}>
                    <Typography variant="body2">• {d.time} — {d.source}</Typography>
                    <Divider style={{ margin: '4px 0' }} />
                  </div>
                ))}
              </>
            )}
          </Paper>
        ))
      )}
    </Container>
  );
}

export default StatsPage;
