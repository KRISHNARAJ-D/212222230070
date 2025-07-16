import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { v4 as uuid } from 'uuid';

const MAX = 5;

function ShortenerPage() {
  const [inputs, setInputs] = useState([{ id: uuid(), url: '', code: '', time: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (id, field, value) => {
    setInputs(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addInput = () => {
    if (inputs.length < MAX) {
      setInputs([...inputs, { id: uuid(), url: '', code: '', time: '' }]);
    }
  };

  const handleShorten = () => {
    const updated = inputs.map(item => {
      if (!isValid(item.url)) return { ...item, error: 'Invalid URL' };
      const code = item.code || makeCode();
      const mins = parseInt(item.time) || 30;
      const expiry = new Date(Date.now() + mins * 60000);
      return {
        ...item,
        shortUrl: `http://localhost:3000/${code}`,
        expiry: expiry.toLocaleString(),
        clicks: 0,
        details: []
      };
    });

    setResults(updated);
    localStorage.setItem('shortenedLinks', JSON.stringify(updated));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {inputs.map((item, idx) => (
        <Paper key={item.id} style={{ padding: 12, marginBottom: 10 }}>
          <TextField
            fullWidth label={`URL #${idx + 1}`} value={item.url}
            onChange={e => handleChange(item.id, 'url', e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <TextField
            fullWidth label="Custom Shortcode" value={item.code}
            onChange={e => handleChange(item.id, 'code', e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <TextField
            fullWidth label="Validity (in mins)" value={item.time}
            onChange={e => handleChange(item.id, 'time', e.target.value)}
          />
        </Paper>
      ))}

      {inputs.length < MAX && (
        <Button onClick={addInput} variant="outlined" style={{ marginBottom: 10 }}>
          + Add Another
        </Button>
      )}

      <Button onClick={handleShorten} variant="contained">Shorten</Button>

      <div style={{ marginTop: 20 }}>
        {results.map((res, i) => (
          <Paper key={i} style={{ padding: 10, marginBottom: 10 }}>
            <Typography><strong>Short:</strong> <a href={res.shortUrl}>{res.shortUrl}</a></Typography>
            <Typography><strong>Expires:</strong> {res.expiry}</Typography>
            {res.error && <Typography color="error">{res.error}</Typography>}
          </Paper>
        ))}
      </div>
    </Container>
  );
}

function isValid(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function makeCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default ShortenerPage;
