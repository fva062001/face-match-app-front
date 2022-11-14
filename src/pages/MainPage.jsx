import React, {useState} from 'react';
import classes from './MainPage.module.css';
import defaultPerson from '../assets/anonymity.png';
import axios from 'axios';
import Modal from '../Components/Modal';

function PhotoPortrait({init,handlerFunction}){
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(init);
  const [image,setImage] = useState(null);

  const changeImage = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    let base64 = '';
    reader.readAsDataURL(file)

    reader.onload = () =>{
      base64 = reader.result;
      const bs64Img = base64.split(',')[1];
      setImage(base64);
      handlerFunction(bs64Img);
    }
    setShowButton(false);
    setShowImage(true);
  }

  return(
  <div className={classes.photoFrame}>
    {showButton &&  
      
      <div>
          <input type="file" onChange={changeImage}  id="img" style={{display: 'none'}}/>
          <label className={classes.button} htmlFor="img">Upload img</label>
      </div>}
    {showImage && <img style={{width:'20vw',height:'50vh'}} src={image} alt={`${image} png`} />}
  </div>);
}


function MainPage() {
  const [showButton1,setShowButton1] = useState(true);
  const [image1,setImage1] = useState(null);
  const [image2,setImage2] = useState(null);
  const [showButton2, setShowButton2] = useState(false);
  const [showModal,setShowModal] = useState({
    state:false,
    title:'',
    desc:''
  });

  const changeState = () =>{
    setShowModal({state:false,title:'',desc:''});
  }


  const clickResetHandler = () =>{
    setShowButton1(true);
    setImage1(null);
    setImage2(null);
    setShowButton2(false);
    changeState();
  }

  const handlerImage1 = (photo) =>{
    setImage1(photo);
    setShowButton1(true);
  }

  const handlerImage2 = (photo) =>{
    setImage2(photo);
    setShowButton2(true);
  }

  const photoUpload = async () =>{
    await axios.post('http://127.0.0.1:8000/matcher/add',{image:image1,name:'image1'},{timeout: 4000}).then((e) => {
      console.log(e);
      setShowButton1(false);
      setShowButton2(true);
      setShowModal({state:true,title:"Photo Added to DB",desc:"request_response: 201"})
    }).catch(() =>{
      setShowModal({state:true,title:"Error on DB",desc:"request_response: 500"})
    });
  }

  const clickResetModal =() =>{
    setShowModal({state:true,title:"U Wanna Reset??",desc:"request_response: U SURE?",res:true})
  }

  const photoMatch = async () =>{
    await axios.post('http://127.0.0.1:8000/matcher/match',{image:image2,name:'image2'},{timeout: 4000}).then((e) => {
      const response = e.data;
      console.log(response);
      setShowModal({state:true,title:"PERSON FOUND",desc:`${response.name} request_response: 302`})
    }).catch(
      () =>{
        setShowModal({state:true,title:"PERSON NOT FOUND",desc:"request_response: 404"})
      }
    );
  }

  return(<div className={classes.main}>
    {showModal.state && <Modal object={showModal} changeState={changeState} clickReset={clickResetHandler}/>}
    <div style={{
      marginBottom: '5em',
      textAlign:'center'
    }}>
    <h1 className={classes.typewriter}>Missing Person System</h1>
    {showButton1 && <h2  className={classes.typewriter}>Add Photo to DB</h2>}
    {showButton2 && <h2  className={classes.typewriter}>Find a match</h2>}
    </div>
    <div className={classes.photos}>
      {showButton1 && <PhotoPortrait init={true} handlerFunction={handlerImage1}/>}
      {showButton2 && <PhotoPortrait init={true} handlerFunction={handlerImage2}/>}
    </div>
    <div className={classes.buttonContainer}>
      {showButton1 && <button className={classes.button1} onClick={photoUpload}>Add to DB</button>}
      {showButton2 && <button className={classes.button1} onClick={photoMatch}>Find Match</button>}
      {showButton2 && <button className={classes.button1} onClick={clickResetModal}>Reset</button>}

    </div>


  </div>);
}

export default MainPage;
