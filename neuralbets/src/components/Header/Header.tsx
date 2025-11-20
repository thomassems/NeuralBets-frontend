import styles from "./Header.module.css";

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>
                NeuralBets
            </h1>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.signup}`}>Sign Up</button>
                <button className={`${styles.button} ${styles.login}`}>Login</button>
            </div>
        </div>
    );
}

export default Header;