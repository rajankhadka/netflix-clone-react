import React, { useEffect, useState } from "react";
import avatar from "./avatar.png";
import netflix from "./netflix-logo.png";
import "./Nav.css";
function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={netflix} alt="netflix-logo" />
      <img className="nav__avatar" src={avatar} alt="avatar" />
    </div>
  );
}

export default Nav;
