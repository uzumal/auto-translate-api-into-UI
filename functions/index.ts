import * as functions from "firebase-functions";
import axios from "axios";
import cors from "cors";

// setting CORS
const corsMiddleware = cors({ origin: true });

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
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
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

exports.callOpenAI = functions.https.onCall(async (data, context) => {
  try {
    const { prompt, max_tokens } = data;
    console.log("prompt" + prompt);
    console.log("token" + max_tokens);

    const openAIResponse = await axios({
      method: "post",
      url: "https://api.openai.com/v1/engines/text-davinci-003/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      data: {
        prompt: prompt,
        max_tokens: max_tokens,
      },
    });
    console.log("Response from OpenAI: ", openAIResponse.data);
    return openAIResponse.data;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error calling OpenAI API"
    );
  }
});
