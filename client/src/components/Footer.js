import React from "react";


function Footer() {
    //get current year
  const currentYear = new Date().getFullYear();
  
  //check if year this current , if  not subtracts?
  const yearTxt = currentYear === 2022 ? "2022" : "2022 - " + currentYear;

  return (
    <div>
      <footer  style={{color:"grey", bottom:0, marginTop:"3em"}} class="footer">
        © {yearTxt} what2play | All Rights Reserved.
      </footer>
    </div>
  );
}

export default Footer;