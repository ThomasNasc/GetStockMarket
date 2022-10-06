import Header from "../components/Header";
import List from "../components/List";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <List />
    </div>
  );
}
