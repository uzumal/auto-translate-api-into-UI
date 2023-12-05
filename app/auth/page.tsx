'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AuthPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/page'); // ユーザーが認証済みの場合にリダイレクト
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1>Auth Page</h1>
      <SignIn />
      <SignUp />
      <Footer />
    </div>
  );
};

export default AuthPage;

