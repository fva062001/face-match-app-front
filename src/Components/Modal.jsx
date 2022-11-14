
import React, {useState,useEffect} from 'react';
import classes from './Modal.module.css';
function Modal(props){
    const [showModal,setShowModal] = useState(false);

    useEffect(() =>{
        setShowModal(props.object.state)
    },[]);

    const clickCloseHandler = () =>{
        props.changeState();
        setShowModal(false);
    }

    const clickResetHandler = () =>{
        props.clickReset();
        setShowModal(false);
    }



    return(<>
    {showModal && <>
        <div onClick={clickCloseHandler} className={classes.overlay}></div>
        <div className={classes.modal}>
            <h1>{props.object.title}</h1>
            <p>{props.object.desc}</p>
            {props.object.res?<button onClick={clickResetHandler} className={classes.button1}>DO RESET</button> : <button onClick={clickCloseHandler} className={classes.button1}>Close</button> }
        </div>
    </>}
    </>)
}

export default Modal;