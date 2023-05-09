import Link from "next/link";
import styles from "./NavBar.module.scss";

export default function NavBar() {
    return (
        <div>
            <Link href="/">Home</Link>
            <Link href="/editor">Editor</Link>
        </div>
    );
}
