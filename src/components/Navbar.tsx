"use client";
import Link from "next/link";

import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";



export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
    } else if (mq.addListener) {
      mq.addListener(update);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", update);
      } else if (mq.removeListener) {
        mq.removeListener(update);
      }
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/plants", label: "Plantas" },
    { href: "#acerca", label: "Acerca" },
    { href: "#contacto", label: "Contacto" },
  ];

  function isActive(href: string) {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href.startsWith("#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand}>app-rural</Link>
      </div>
      <button
        className={styles.menuBtn}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.menuIcon} aria-hidden="true">☰</span>
      </button>
      <ul
        id="main-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        role="menubar"
      >
        {navItems.map(({ href, label }) => (
          <li key={href} role="none">
            <Link
              href={href}
              className={styles.link}
              aria-current={isActive(href) ? "page" : undefined}
              tabIndex={open || isDesktop ? 0 : -1}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}
        <li className={styles.menuRight} role="none">
          {!session ? (
            <Link
              href="/auth/login"
              className={styles.link}
              tabIndex={open || isDesktop ? 0 : -1}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Ingresar
            </Link>
          ) : (
            <>
              <span className={styles.user}>
                {session.user?.email}
              </span>
              <SignOutButton />
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
