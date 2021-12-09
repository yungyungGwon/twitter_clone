import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="navigation__ul">
      <li>
        <Link to="/" className="navigation__li_home">
          <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size={"2x"} />
        </Link>
      </li>
      <li>
        <Link to="/profile" className="navigation__li_profile">
          <FontAwesomeIcon icon={faUser} color={"#04aaff"} size={"2x"} />
          <span className="navigation__span">
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
