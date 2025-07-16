import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('shortenedLinks');
    const links = saved ? JSON.parse(saved) : [];

    const target = links.find(item => item.shortUrl.endsWith(`/${shortcode}`));

    if (!target) {
      alert('Link not found');
      navigate('/');
      return;
    }

    const expired = new Date(target.expiry) < new Date();
    if (expired) {
      alert('Link expired');
      navigate('/');
      return;
    }

    target.clicks = (target.clicks || 0) + 1;
    target.details = [...(target.details || []), {
      time: new Date().toLocaleString(),
      source: window.location.href,
      location: 'Unknown'
    }];

    localStorage.setItem('shortenedLinks', JSON.stringify(links));
    window.location.href = target.url;
  }, [shortcode, navigate]);

  return null;
}

export default RedirectPage;
