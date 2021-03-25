import AuthButton from "../AuthButton"
import styles from "./styles.module.scss"
import { ActiveLink } from "../ActiveLink"

type Page = "Home" | "Posts"

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          <img src="/images/logo.svg" alt="ig.news" />
        </a>
        <nav>
          <ActiveLink activeLinkClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeLinkClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <AuthButton />
      </div>
    </header>
  )
}