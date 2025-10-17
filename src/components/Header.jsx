import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="topbar">
      <h1>Mes Facts</h1>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/add" className="btn">Ajouter</Link>
      </nav>
    </header>
  );
}

export default Header;
