// src/components/Navbar/Navbar.tsx

import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // Começar com menu aberto (false = não colapsado)
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <nav className={`${styles.navbar} navbar-expand-lg`}>
      <div className={styles["container-navbar"]}>
        <NavLink to="/" className={styles["navbar-brand"]}>
          Loja Virtual
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarMain"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${styles["navbar-collapse"]} ${
            collapsed ? styles.collapse : ""
          }`}
          id="navbarMain"
        >
          <ul className={styles["navbar-nav"]}>
            <li className={styles["nav-item"]}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles["nav-link"]} ${styles.active}`
                    : styles["nav-link"]
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className={styles["nav-item"]}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? `${styles["nav-link"]} ${styles.active}`
                    : styles["nav-link"]
                }
              >
                Produtos
              </NavLink>
            </li>
            <li className={styles["nav-item"]}>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? `${styles["nav-link"]} ${styles.active}`
                    : styles["nav-link"]
                }
              >
                Categorias
              </NavLink>
            </li>
            <li className={styles["nav-item"]}>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  isActive
                    ? `${styles["nav-link"]} ${styles.active}`
                    : styles["nav-link"]
                }
              >
                Marcas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
