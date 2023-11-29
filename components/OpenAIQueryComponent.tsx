import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

const OpenAIQueryComponent = ({ prompt }) => {
  const [code, setCode] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 300,
          }),
        });

        const data = await response.json();
        console.log(data)
        // 'text' プロパティから特定のパターンを切り抜く
        if (data.choices && data.choices.length > 0 && data.choices[0].text) {
          const fullText = data.choices[0].text.trim();
          const importIndex = fullText.indexOf("import");
          const codeSnippet = importIndex >= 0 ? fullText.substring(importIndex) : 'No code found.';
          setCode(codeSnippet);
          console.log(codeSnippet)
        } else {
          setCode('No code found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCode('Error loading code.');
      }
    };

    fetchData();
  }, [prompt]);

  useEffect(() => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.body.innerHTML = `<div style="white-space: pre-wrap;">${code}</div>`;
    }
  }, [code]);

  return (
    <Box sx={{ width: '100%', height: '400px', border: '1px solid #ccc', overflow: 'auto' }}>
      <iframe ref={iframeRef} style={{ width: '100%', height: '100%', border: 'none' }} />
    </Box>
  );
};

export default OpenAIQueryComponent;
