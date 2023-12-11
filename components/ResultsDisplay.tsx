import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OpenAIQueryComponent from "./OpenAIQueryComponent";

type ResultDisplayProps = {
  results: string;
  setIsCallingApi: (loading: boolean) => void;
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  results,
  setIsCallingApi,
}) => {
  return (
    <div style={{ paddingBottom: "40px" }}>
      {results ? (
        <div
          style={{
            // maxHeight: "300px",
            // overflowY: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // 背景を少し透明に
            padding: "10px",
            whiteSpace: "pre-wrap",
            // borderRadius: "10px", // 角を丸くする
            // "::-webkit-scrollbar": {
            //   width: "0px",
            // },
          }}
        >
          <OpenAIQueryComponent
            prompt={results}
            setIsCallingApi={setIsCallingApi}
          />
        </div>
      ) : (
        <Typography component="h3" align="left" gutterBottom>
          Your results will appear here after submitting.
        </Typography>
      )}
    </div>
  );
};

export default ResultDisplay;
