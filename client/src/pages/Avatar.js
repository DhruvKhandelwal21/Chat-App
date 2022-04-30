import React,{useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link,useNavigate} from 'react-router-dom';
import {avatarRoute} from '../resources/APIkeys';
const api = `https://api.multiavatar.com/4645646`;

const Avatar = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    
const navigate = useNavigate();
    const[avatars,setAvatars] = useState([]);
    const[loading,setLoading] = useState(true);
    const[selectedAvatar,setSelectedAvatar] = useState(undefined);

    
   
    
    useEffect( ()=>{
      const data = [];
      async function fetchMyApi() {
      
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
          
        }
        setAvatars(data);
        setLoading(false);
        console.log(data);
      
  }
    
  fetchMyApi()

      }, []);
  
    useEffect(()=> {
        if(!localStorage.getItem("chat app user")){
          navigate("/login");
        }
    },[])
  
  
      const setProfileHandler= async()=> {
      if(selectedAvatar===undefined){
        toast.error("please select the avatar",toastOptions);
      }
      else{
        
        const user =  await JSON.parse(localStorage.getItem("chat app user"));
        console.log(user);
        // const id = user._id;
            const response = await fetch(`${avatarRoute}/${user._id}`,{
              method: "POST",
              body: JSON.stringify({
                
                image: avatars[selectedAvatar],
                 }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            try{
              if(response.ok){
                const data = await response.json();
                console.log(data);
                if(data.isSet){
                  user.isAvatarImageSet = true;
                  user.avatarImage = data.image;


                  localStorage.setItem("chat app user",JSON.stringify(user));
                  
                }
                navigate("/");
              }
            }catch(e) {
              console.log(e);

            }
      }

      };

    
    return(
      <Fragment>
        {loading ?
        (<Container>
          <img 
          className="loader"
          src={loader}
          alt="loader"
          />
          </Container>)
          :  (<Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfileHandler} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>)
        
        }
        
        


           
          
           
       </Fragment>
    )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default Avatar;