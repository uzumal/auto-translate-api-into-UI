import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OpenAIQueryComponent from "./OpenAIQueryComponent";

type ResultDisplayProps = {
  results: string;
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  return (
    <div>
      {results ? (
        <Box
          component="pre"
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // 背景を少し透明に
            padding: "10px",
            whiteSpace: "pre-wrap",
            borderRadius: "10px", // 角を丸くする
            "::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          <OpenAIQueryComponent
            prompt={
              "Create code for an HTML page that dynamically visualises the following JSON data. The code should include HTML, CSS and JavaScript; if the JSON values are a mixture of text and numbers, represent them in a tabular format; if they are numbers only, use Chart.js or a similar library to analyse the data if they are comparable values and select the most appropriate type of chart (bar, line, pie, etc.), and if the values are not comparable, then represent them in tabular format. For non-numeric data, create HTML tables. Graphs and tables should be interactive and visually appealing with a clear and professional design. Provide all necessary code snippets that can be embedded directly into the HTML page to display the graphs and tables.JSON data:" +
              results
            }
          />
        </Box>
      ) : (
        <Typography component="h3" align="left" gutterBottom>
          Your results will appear here after submitting.
        </Typography>
      )}
    </div>
  );
};

export default ResultDisplay;
