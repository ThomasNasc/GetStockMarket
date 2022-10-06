import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import List from "../components/List";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Header />
      <List />
    </div>
  );
}
