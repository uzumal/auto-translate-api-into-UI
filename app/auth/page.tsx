"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authPromise } from "../../firebase/firebase";
import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("../../components/SignIn"), { ssr: false });
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { User } from "@firebase/auth";

const AuthPage = () => {
  const router = useRouter();
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

  useEffect(() => {
    if (!loading && user) {
      router.push("/"); // ユーザーが認証済みの場合にリダイレクト
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <SignIn />
      <Footer />
    </div>
  );
};

export default AuthPage;
