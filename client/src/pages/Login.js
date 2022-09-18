import React,{useState,useEffect,Fragment} from 'react';

import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link,useNavigate} from 'react-router-dom';
import {loginRoute} from '../resources/APIkeys';

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
const Login=()=> {
    const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

    const[values,setValues] = useState({
        userName: "",
        password: "",
        
    })
    useEffect( ()=>{
      if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
        navigate("/");
      }
      
    },[]);
    const onChangeHandler = (event) => {
     
      setValues({
          ...values,[event.target.name]:event.target.value
      });
};
    const formValidation =() => {

     const {userName,password} = values;
     
     
     if(password===""){
       toast.error("enter the password",toastOptions);
       return false;
     }
     else if(userName===""){
      toast.error("enter the username",toastOptions);
      return false;
     }
     
     else if(userName.length<6){
       toast.error("username is too small", toastOptions);
       return false;
     }
    
   
     
       return true;
     
    }
   
    const loginSubmitHandler = async(event)=> {

    
      event.preventDefault();
      
        if(formValidation()){
          console.log("we are here");
          
          const {userName,password}= values;
          const response = await fetch(loginRoute,{
            method: "POST",
             body: JSON.stringify({
             userName,
             password,
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
     });
        try{
          if(response.ok){
            console.log("we are here");
            const data = await response.json();
            console.log(data);
            if(data.status===false){
              toast.error(data.msg, toastOptions);
            }
            if(data.status===true){
                
              localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY,JSON.stringify(data.userNameCheck));
              navigate("/");
            }
          }
         
        }catch(err){
        console.log(err);
      }

    }
     
     
    };
    return(
      <Fragment>
           <FormContainer>
               <form action="" onSubmit={loginSubmitHandler}>
                   <div className="brand">
                       <img src={logo} alt="logo" />
                       <h1>Tatakae</h1>
                   </div>
                   <input
                   type= "text"
                   placeholder="username"
                   name="userName"
                  
                   onChange={onChangeHandler}
                   />
                  
                   <input
                   type= "password"
                   placeholder="password"
                   name="password"
                   
                   onChange={onChangeHandler}
                   />
                 
                <button type="submit">Login</button>
                <span>
                    Don't have account ? <Link to="/register">Register</Link>
                </span>
                  
                   
                     
               </form>
           </FormContainer>
           <ToastContainer />
      </Fragment>
    );
}
export default Login;