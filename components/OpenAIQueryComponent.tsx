import React, { useState, useEffect, FunctionComponent } from "react";
import Box from "@mui/material/Box";

const OpenAIQueryComponent: FunctionComponent<{ prompt: string }> = ({
  prompt,
}) => {
  const [code, setCode] = useState("");

  useEffect(() => {
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
              max_tokens: 450,
            }),
          }
        );

        const data = await response.json();
        console.log(data); // Log the data for debugging
        if (data.choices && data.choices.length > 0 && data.choices[0].text) {
          const fullText = data.choices[0].text.trim();
          setCode(fullText);
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
    if (!code) return;

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "400px";
    document.body.appendChild(iframe);

    const blob = new Blob([code], { type: "text/html" });
    iframe.src = URL.createObjectURL(blob);

    return () => {
      document.body.removeChild(iframe);
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
      <pre>{code}</pre> {/* Display the code for debugging */}
    </Box>
  );
};

export default OpenAIQueryComponent;
