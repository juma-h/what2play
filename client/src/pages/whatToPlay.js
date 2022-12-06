import React from "react";
import "../styles/play.css";
import chill from "../images/chill.png";
import booster from "../images/booster.png";
import dance from "../images/dance.png";
import mellow from "../images/mellow.png";
import { CardMood } from "../components";

function what2Play() {
  return (
    <div className="card-wrapper">
      <h1 style={{ color: "grey" }}>what2play </h1>
      <h4>
        Choose your mood and we will try fetch something for you :)
      </h4>
      <div className="card-comp">
        <CardMood img={chill} title="Chill" />
        <CardMood img={booster} title="Mood Booster" />
        <CardMood img={mellow} title="Mellow" />
        <CardMood img={dance} title="Dance" />
      </div>
    </div>
  );
}

export default what2Play;
