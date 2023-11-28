import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

// ReflectCode コンポーネントの定義
const ReflectCode = ({ code }:{code:string}) => {
  // useRefの型をHTMLDivElementに指定
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (code && containerRef.current) {
      const script = document.createElement('script');
      script.textContent = code;
      containerRef.current.appendChild(script);
    }
  }, [code]);

  return <div ref={containerRef} />;
};

const OpenAIQueryComponent = ({ prompt }:{prompt:string}) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (prompt) {
      fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 150,
        }),
      })      
      .then((res) => res.json())
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          const code = data.choices[0].text.trim();
          setResponse(code);
        } else {
          console.error('No choices returned from OpenAI');
        }
      })
      .catch((err) => console.error('Error querying OpenAI:', err));
    }
  }, [prompt]);

  return (
    <Box>
      <ReflectCode code={response} />
    </Box>
  );
};

export default OpenAIQueryComponent;
