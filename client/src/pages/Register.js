import React,{useState,useEffect,Fragment} from 'react';

import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link,useNavigate} from 'react-router-dom';
import {registerRoute} from '../resources/APIkeys';

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
const Register = ()=> {
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
        email: "",
        password: "",
        confirmPassword: ""
    })
    useEffect( ()=>{
      if(localStorage.getItem("chat-app-user")){
        navigate("/");
      }
      
    },[]);
    const onChangeHandler = (event) => {
     
      setValues({
          ...values,[event.target.name]:event.target.value
      });
};
    const formValidation =() => {

     const {userName,email,password,confirmPassword} = values;
     if(password!==confirmPassword){
       toast.error("enter the right password",toastOptions);
       return false;
     }
     
     else if(password.length<8){
       toast.error("password is too weak",toastOptions);
       return false;
     }
     
     else if(userName.length<3){
       toast.error("username is too small", toastOptions);
       return false;
     }
    
     else if(email===""){
       toast.error("enter the email", toastOptions);
       return false;
     }
     
       return true;
     
    }
   
    const formSubmitHandler = async(event)=> {

    
      event.preventDefault();
      
        if(formValidation()){
          // console.log("we are here");
          
          const {userName,email,password}= values;
          const response = await fetch(registerRoute,{
            method: "POST",
             body: JSON.stringify({
             userName,
             email,
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
              localStorage.setItem("chat app user",JSON.stringify(data.user));
              navigate("/avatar");
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
               <form action="" onSubmit={formSubmitHandler}>
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
                   type= "email"
                   placeholder="email"
                   name="email"
                   
                   onChange={onChangeHandler}
                   />
                   <input
                   type= "password"
                   placeholder="password"
                   name="password"
                   
                   onChange={onChangeHandler}
                   />
                   <input
                   type= "password"
                   placeholder="confirmPassword"
                   name="confirmPassword"
                   
                   onChange={onChangeHandler}
                   />
                <button type="submit">Create User</button>
                <span>
                    Already have an account ? <Link to="/login">Login</Link>
                </span>
                  
                   
                     
               </form>
           </FormContainer>
           <ToastContainer />
      </Fragment>
    );

    }
export default Register;
