import React from "react";
import classes from "./LandingPage.module.css";
import mainPhoto from "../assets/guy-fawkes-mask.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/app");
  };

  return (
    <div className={classes.main}>
      <div className={classes.frame}>
        <div className={classes.infoContainer}>
        <img className={classes.imgHacker} src={mainPhoto} alt="Hacking" />
        <h2 className={classes.typewriter}>
          Welcome to the <br /> missing person system
        </h2>
        </div>
        <div className={classes.buttonContainer}>
        <button onClick={clickHandler} className={classes.button}>
          Go in
        </button>
        </div>

        <h2 style={{color:'#ff10f0', position:'absolute', right:25, bottom:0}}>v 1.0.2</h2>
      </div>
    </div>
  );
}

export default LandingPage;
