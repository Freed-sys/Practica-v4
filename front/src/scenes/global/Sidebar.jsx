import React from "react";
import "./App.css";
import { sidebarData } from "./sidebarData";
import Inventario from "../inventario";

function Sidebarr() {
  return (
    <div className="Sidebarr">
      <ul className="SidebarList">
        {sidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebarr;
