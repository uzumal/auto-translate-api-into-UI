import * as functions from "firebase-functions";
import axios from "axios";

exports.apiTest = functions.https.onCall(async (data, context) => {
    try {
      // データからパラメータを取得
      const url = data.url;
      const apiKey = data.apiKey;
  
      if (!url) {
        throw new functions.https.HttpsError('invalid-argument', 'Required parameters are missing');
      }
  
      const config = {
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
      };
  
      // axiosを使用して外部APIを呼び出す
      const response = await axios.get(url, config);
  
      console.log("Request data", data);
      console.log("Response: ", response.data);
  
      // レスポンスを返す
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw new functions.https.HttpsError('internal', 'Internal Server Error');
    }
  });

exports.callOpenAI = functions.https.onCall(async (data, context) => {
  try {
    const { prompt, max_tokens } = data;
    console.log("prompt" + prompt);
    console.log("token" + max_tokens);

    const openAIResponse = await axios({
      method: "post",
      url: "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
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