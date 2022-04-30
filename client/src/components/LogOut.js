import React from 'react';
import {BiPowerOff} from 'react-icons/bi';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
const LogOut = ()=> {
    const navigate = useNavigate();
    const logOutHandler = () => {
           localStorage.clear();
           navigate("/login");
    }

    return(
        <div>
           <Button onClick={logOutHandler}>
               <BiPowerOff />
           </Button>
        </div>
    );
}
export default LogOut;