import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/Header';
import Content1 from '@/components/Api';
import Content2 from '@/components/AutoUi';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <Content1 />
      <Content2 />
      <Footer />
    </div>
  )
}
