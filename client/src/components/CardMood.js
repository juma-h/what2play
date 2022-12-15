import React from "react";
import "../styles/play.css";


// const clicked =()=>{
//     console.log("clicked")
// }

function CardMood({img, title, createFn, playListName}) {
  return (
    <div>
       <div
        class="card stretched-link ind-card"
        onClick={createFn}
      >
        <img src={img} class="card-img-top" alt="..." />
        <div className="card-body" >
          <h5 class="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
}

export default CardMood;
