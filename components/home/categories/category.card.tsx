import Link from "next/link";
import styles from "./categories.module.css";

export default function CategoryCard() {
  return (
    <Link href={"/"} as={"li"} className={styles.card}>
      asdf
    </Link>
  );
}
