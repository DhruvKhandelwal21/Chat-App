import React, { useState, useEffect } from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const Welcome = (props)=> {
  let user = {};
  if(props.currentUser){
    user = props.currentUser;
}


    return(
        <Container>
          <img 
           src={robot}
           alt="foff"
           />
           
       <h1>Welcome, <span>{user.userName}</span> </h1>
            
           
        <h3>Select the chat and start messaging</h3>
            
          

        </Container>

    );

}
export default Welcome;