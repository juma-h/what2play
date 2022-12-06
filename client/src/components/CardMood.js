import React from "react";
import "../styles/play.css";


const clicked =()=>{
    console.log("clicked")
}

function CardMood(props) {
  return (
    <div>
       <div
        class="card stretched-link ind-card"
        onClick={clicked}
      >
        <img src={props.img} class="card-img-top" alt="..." />
        <div className="card-body" >
          <h5 class="card-title">{props.title}</h5>
        </div>
      </div>
    </div>
  );
}

export default CardMood;
