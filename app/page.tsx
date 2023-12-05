"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, CircularProgress, Modal } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApiForm from "../components/ApiForm";
import ResultsDisplay from "../components/ResultsDisplay";
import axios from "axios";
import { authPromise, firestore } from "../firebase/firebase";
import { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const ApiExplorer = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  authPromise.then((auth) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  });
  const router = useRouter();

  const handleSendRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    event.preventDefault();
    const db = firestore;
    const col = collection(db, "users");
    // ユーザードキュメントの存在確認
    const docRef = doc(db, "users", user.uid);
    const userInfo = await getDoc(docRef);
    const today = new Date();
    const todayString =
      today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    // そもそもユーザーが存在していなければ、ユーザードキュメント作成
    if (!userInfo.exists()) {
      await setDoc(doc(col, user.uid), { [todayString]: { count: 0 } });
    } else {
      const data = userInfo.data();
      if (!data[todayString]) {
        await setDoc(doc(col, user.uid), { [todayString]: { count: 0 } });
      }
    }
    // ユーザーデータ更新
    const currentUserInfo = await getDoc(docRef);
    const data = currentUserInfo.data();
    console.log(data);
    if (data) {
      await setDoc(doc(col, user.uid), {
        [todayString]: { count: data[todayString].count + 1 },
      });
    }

    setLoading(true);
    try {
      const response = await axios.get("/api/test", {
        params: {
          url: apiUrl,
          apiKey,
        },
      });
      setResults(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResults("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth"); // ユーザーが未認証の場合にリダイレクト
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container style={{ height: "85vh", paddingTop: "200px", width: "100%" }}>
        {loading && (
          <Modal open>
            <CircularProgress
              size={100}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Modal>
        )}
        <Typography
          component="h1"
          variant="h4"
          align="left"
          style={{
            height: "55px",
            background:
              "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)", // 虹色のグラデーション
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "2px", // パディングを追加
          }}
          gutterBottom
        >
          Interact with Your API
        </Typography>
        <Typography component="h3" align="left" gutterBottom>
          Enter Details and Send Request
        </Typography>
        <ApiForm
          apiUrl={apiUrl}
          apiKey={apiKey}
          loading={loading}
          setApiUrl={setApiUrl}
          setApiKey={setApiKey}
          handleSendRequest={handleSendRequest}
        />
        <Typography component="h1" variant="h4" align="left" gutterBottom>
          Results
        </Typography>
        <ResultsDisplay results={results} />
        <Typography component="h3" align="left" gutterBottom>
          {/* Your results will appear here after submitting. */}
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default ApiExplorer;
