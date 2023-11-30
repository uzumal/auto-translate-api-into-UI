import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") as string;
  const apiKey = searchParams.get("apiKey");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  console.log("GET request", searchParams);
  console.log("Response. ", response);

  return new Response(JSON.stringify(response.data));
}
