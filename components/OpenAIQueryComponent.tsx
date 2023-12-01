import React, { useState, useEffect, FunctionComponent } from 'react';
import Box from "@mui/material/Box";

const OpenAIQueryComponent: FunctionComponent<{ prompt: string }> = ({ 
  prompt,
}) => {
  const [code, setCode] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    if (prompt) {
      const fetchData = async () => {
        try {
          console.log("Making API call with prompt:", prompt);
          const response = await fetch(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                prompt: prompt,
                max_tokens: 1000,
              }),
            }
          );

          const data = await response.json();
          console.log(data); // Log the data for debugging
          if (data.choices && data.choices.length > 0 && data.choices[0].text) {
            const fullText = data.choices[0].text.trim();
            setCode(fullText);
            console.log(fullText)
          } else {
            setCode("No code found.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setCode("Error loading code.");
        }
      };
    fetchData();
    }
  }, [prompt]);

  useEffect(() => {
    if (!code) {
      setIframeSrc(""); // Clear the iframe source if there's no code
      return;
    }
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    // Clean up Blob URL when the component unmounts or code changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [code]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        overflow: "auto",
      }}
    >
      {iframeSrc ? (
        <iframe
          style={{ width: '100%', height: '100%' }}
          src={iframeSrc}
          title="Dynamic Content"
        />
      ) : (
        <div>Loading component...</div>
      )}
    </Box>
  );
};

export default OpenAIQueryComponent;
