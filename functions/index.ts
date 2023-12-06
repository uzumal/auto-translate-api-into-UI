import * as functions from "firebase-functions";
import axios from "axios";
import cors from "cors";

// setting CORS
const corsMiddleware = cors({origin: true});

export const apiTest = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
      // URL パラメータを取得
      const url: string | undefined = req.query.url as string;
      const apiKey: string | undefined = req.query.apiKey as string;

      if (!url) {
        res.status(400).send("Required parameters are missing");
        return;
      }

      const config = {
        headers: apiKey ? {Authorization: `Bearer ${apiKey}`} : {},
      };

      // axios を使用して外部 API を呼び出す
      const response = await axios.get(url, config);

      console.log("GET request", req.query);
      console.log("Response: ", response.data);

      // レスポンスを返す
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

export const callOpenAI = functions.https.onRequest((request, response) => {
  corsMiddleware(request, response, async () => {
    response.set("Access-Control-Allow-Origin", "*");
      try {
          const { prompt, max_tokens } = request.body;

          const openAIResponse = await axios({
              method: "post",
              url: "https://api.openai.com/v1/engines/text-davinci-003/completions",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${functions.config().openai.key}`,
              },
              data: {
                  prompt: prompt,
                  max_tokens: max_tokens,
              },
          });

          response.status(200).send(openAIResponse.data);
          console.log("res" + response)
      } catch (error) {
          console.error('Error calling OpenAI:', error);
          response.status(500).send({ error: 'Error calling OpenAI API' });
      }
  });
});