const LOG_API = 'http://20.244.56.144/evaluation-service/logs';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJka3Jpc2huYXJhajIwMDVAZ21haWwuY29tIiwiZXhwIjoxNzUyNjYxMjA5LCJpYXQiOjE3NTI2NjAzMDksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJhZjgyOTYzMS1lZjkzLTQ3OWUtYmQwMi0xMDhhYjI1OTU0MWMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrcmlzaG5hcmFqIGQiLCJzdWIiOiJjNDBiNjUyNi0wOTFlLTQ1OTQtYWQ1Ni0xNGM3NTFkOTQ1M2QifSwiZW1haWwiOiJka3Jpc2huYXJhajIwMDVAZ21haWwuY29tIiwibmFtZSI6ImtyaXNobmFyYWogZCIsInJvbGxObyI6IjIxMjIyMjIzMDA3MCIsImFjY2Vzc0NvZGUiOiJxZ3VDZmYiLCJjbGllbnRJRCI6ImM0MGI2NTI2LTA5MWUtNDU5NC1hZDU2LTE0Yzc1MWQ5NDUzZCIsImNsaWVudFNlY3JldCI6Ikp3cEtlSnNISnFhc1dmblgifQ.6a9Stn22oy7kaTcOAsTRCJcbcZ8Gbqhy4OFm1wXLsg0'; 

export async function logEvent({ level = 'info', message = '', stack = 'frontend', pkg = 'shortener' }) {
  try {
    await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (error) {
    console.log('Logger error:', error);
  }
}
