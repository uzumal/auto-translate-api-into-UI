import React, { useState, useEffect, FunctionComponent } from 'react';
import Box from "@mui/material/Box";

const OpenAIQueryComponent: FunctionComponent<{ prompt: string }> = ({ 
  prompt,
}) => {
  const [code, setCode] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    if (!prompt) return
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
                prompt: "Create code for an HTML page that dynamically visualises the following JSON data. The code should include HTML, CSS and JavaScript; consider the meaning of each JSON item and graph it using Google Charts. This should be in a format that can be used in HTML, interactive, visually appealing, clear and professionally designed. Provide all necessary code snippets that can be embedded directly into the HTML page to display the graphs and tables:" +  prompt,
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

  const handleIframeLoad = (event: any) => {
    const iframe = event.target;
    try {
      const body = iframe.contentWindow.document.body;
      const html = iframe.contentWindow.document.documentElement;
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      
      // iframeの高さを設定
      iframe.style.height = `${height}px`;
    } catch (error) {
      console.error('Error adjusting iframe height:', error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        // height: "100%",
        // border: "1px solid #ccc",
        // overflow: "auto",
      }}
    >
      {iframeSrc ? (
        <iframe
          style={{ width: '100%', height: '100%', border: '1px solid #ccc', borderRadius: '8px' }}
          src={iframeSrc}
          title="Dynamic Content"
          onLoad={handleIframeLoad} // iframeのロードが完了したときに呼び出す
        />
      ) : (
        <div>Loading component...</div>
      )}
    </div>
  );
};

export default OpenAIQueryComponent;
