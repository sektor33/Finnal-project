import styles from './Footer.module.css';


export default function Footer() {
return (
<footer className={styles.wrap}>
<div className={`container ${styles.inner}`}>
<div className={styles.links}>
<a href="#">Conditions of Use</a>
<a href="#">Privacy Notice</a>
<a href="#">Interest-Based Ads</a>
</div>
<div>© 1996–2025 FakeStore, Inc. or its affiliates</div>
</div>
</footer>
);
}