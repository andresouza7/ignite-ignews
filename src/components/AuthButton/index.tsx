import styles from "./styles.module.scss"
import { FaGithub } from "react-icons/fa"
import {FiX} from "react-icons/fi"

export default function AuthButton() {
  const user = true;

  return user ? (
    <button className={styles.authButton}>
      <FaGithub color="#04d361" />
      Andre Souza
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.authButton}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  )
}