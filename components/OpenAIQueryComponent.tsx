import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const OpenAIQueryComponent = ({ prompt }) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (prompt) {
      fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 環境変数からAPIキーを取得
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 150,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        // choices 配列が存在し、要素が含まれているか確認
        if (data.choices && data.choices.length > 0) {
          setResponse(data.choices[0].text);
        } else {
          console.error('No choices returned from OpenAI');
        }
      })
      .catch((err) => console.error('Error querying OpenAI:', err));
    }
  }, [prompt]);

  return (
    <Box
      // ... スタイリング ...
    >
      {response}
    </Box>
  );
};

export default OpenAIQueryComponent;
