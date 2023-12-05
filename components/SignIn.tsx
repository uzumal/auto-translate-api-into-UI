'use client'
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Firebase v9 以降の場合は 'firebase/app' を使用
import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';
import { auth } from '../firebase/firebase'; // firebase.js からのインポート

const SignIn = () => {
  useEffect(() => {
    // FirebaseUIの設定
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/page.tsx', // ログイン成功後のリダイレクト先
    };

    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);

    // クリーンアップ関数
    return () => {
      // `delete()`を非同期で呼び出す
      (async () => {
        await ui.delete();
      })();
    };
  }, []);

  return (
    <div>
      <h1>SignIn</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignIn;

