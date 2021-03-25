import AuthButton from "../AuthButton"
import styles from "./styles.module.scss"

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          <img src="/images/logo.svg" alt="ig.news" />
        </a>
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <AuthButton />
      </div>
    </header>
  )
}