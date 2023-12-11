"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApiForm from "../components/ApiForm";
import ResultsDisplay from "../components/ResultsDisplay";
import { authPromise, firestore, functions } from "../firebase/firebase";
import { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

const ApiExplorer = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [user, setUser] = useState<User>();
  const [isMaxSubmitCount, setIsMaxSubmitCount] = useState<boolean>(false);
  const [snackbarContent, setSnackbarContent] = useState<string>("");
  const maxCallCount = 10;

  authPromise.then((auth) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  });
  const router = useRouter();

  // 今日の日付を取得
  const getTodayString = (): string => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  // ユーザーデータの更新
  const updateUserInfo = async () => {
    if (!user) return;
    // ユーザードキュメントの存在確認
    const db = firestore;
    const col = collection(db, "users");
    const docRef = doc(db, "users", user.uid);
    const userInfo = await getDoc(docRef);
    const todayString = getTodayString();

    // そもそもユーザーが存在していなければ、ユーザードキュメントから作成
    if (!userInfo.exists() || !userInfo.data()[todayString]) {
      await setDoc(doc(col, user.uid), { [todayString]: { count: 0 } });
    }

    // ユーザーデータ更新
    const currentUserInfo = await getDoc(docRef);
    const data = currentUserInfo.data();
    if (data) {
      await setDoc(doc(col, user.uid), {
        [todayString]: { count: data[todayString].count + 1 },
      });
    }
  };

  // まだOpenAIを呼べるか確認
  const canSubmitButton = async () => {
    if (!user) return false;

    // ユーザードキュメントの存在確認
    const db = firestore;
    const docRef = doc(db, "users", user.uid);
    const todayString = getTodayString();
    const userInfo = await getDoc(docRef);
    if (
      userInfo.exists() &&
      userInfo.data()[todayString].count >= maxCallCount
    ) {
      return false;
    }
    return true;
  };

  const handleSendRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    event.preventDefault();

    // ボタンを押した回数で押せないようにする
    if (await !canSubmitButton()) {
      setIsMaxSubmitCount(true);
      setSnackbarContent("今日はもう押せません");
      return;
    }

    // ボタンを押す回数更新
    await updateUserInfo();

    setIsCallingApi(true);
    try {
      const onCallApiTest = httpsCallable(functions, "apiTest");
      const response = await onCallApiTest({ url: apiUrl, apiKey });
      setResults(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResults("Error fetching data");
    } finally {
    }
  };

  // 初回アクセス時にボタン押せるか確認
  useEffect(
    () => {
      if (!user) return;
      canSubmitButton().then((canSubmit) => {
        if (canSubmit === false) {
          setIsMaxSubmitCount(true);
          setSnackbarContent("今日はもう押せません");
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth"); // ユーザーが未認証の場合にリダイレクト
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    setSnackbarContent("");
  };

  return (
    <>
      <Header />
      <Snackbar
        open={!!snackbarContent}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {snackbarContent}
        </Alert>
      </Snackbar>
      <Container style={{ height: "85vh", paddingTop: "200px", width: "100%" }}>
        {(loading || isCallingApi) && (
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
          canSubmitButton={isMaxSubmitCount}
        />
        <Typography component="h1" variant="h4" align="left" gutterBottom>
          Results
        </Typography>
        <ResultsDisplay results={results} setIsCallingApi={setIsCallingApi} />
        <Typography component="h3" align="left" gutterBottom>
          {/* Your results will appear here after submitting. */}
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default ApiExplorer;
