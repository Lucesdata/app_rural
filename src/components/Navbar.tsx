"use client";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as Session["user"])?.role;

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`${styles.link} ${pathname === href ? styles.active : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand}>app_rural</Link>
        <NavLink href="/dashboard" label="Dashboard" />
        <NavLink href="/plants" label="Plantas" />
        <NavLink href="/readings" label="Lecturas" />
        {(role === "PRESIDENTE" || role === "ADMIN") && (
          <NavLink href="/controls" label="Controles" />
        )}
      </div>

      <div className={styles.right}>
        {!session ? (
          <>
            <NavLink href="/auth/login" label="Login" />
            <NavLink href="/register" label="Register" />
          </>
        ) : (
          <>
            <span className={styles.user}>
              [{role}] {session.user?.email}
            </span>
            <SignOutButton />
          </>
        )}
      </div>
    </nav>
  );
}
