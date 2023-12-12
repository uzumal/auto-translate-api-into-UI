"use client";
import React, { useEffect } from "react";
import firebase from "firebase/compat/app"; // Firebase v9 以降の場合は 'firebase/app' を使用
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import { auth } from "../firebase/firebase"; // firebase.js からのインポート
import { Container, Typography } from "@mui/material";


const SignIn = () => {
  useEffect(() => {
    // FirebaseUIの設定
    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/", // ログイン成功後のリダイレクト先
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);

    // クリーンアップ関数
    return () => {
      // `delete()`を非同期で呼び出す
      (async () => {
        await ui.delete();
      })();
    };
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: "4rem", textAlign: "center" }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        style={{ color: "#3f51b5", fontWeight: "bold", marginBottom: "16px"}}>
        Sign In
      </Typography>
      <div id="firebaseui-auth-container"></div>
    </Container>
  );
};

export default SignIn;
