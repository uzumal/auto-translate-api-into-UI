'use client'
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';
import { auth } from '../firebase/firebase'; // firebase.js からのインポート

const SignUp = () => {
  useEffect(() => {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/', // サインアップ成功後のリダイレクト先
      // サインアップ固有の設定があればここに追加
    };

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      // 非同期クリーンアップ関数
      (async () => {
        await ui.delete();
      })();
    };
  }, []);

  return (
    <div>
      <h1>SignUp</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignUp;
