import{useState,useEffect,useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {chatRoute,host} from '../resources/APIkeys';
import axios from 'axios';
// import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


const Chat=()=> {
    const navigate = useNavigate();
    const [contacts,setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [loading,setLoading] = useState(false);
    const socket = useRef();
    
    useEffect(()=> {
   (   async()=>{
         if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
            navigate("/login");
         }else{
             setCurrentUser( await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
         }
            
         })();
        
    },[]);
    useEffect(()=>{
   (   async()=>{
      if(currentUser){
         if(currentUser.isAvatarImageSet){
           console.log(currentUser);
           if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${chatRoute}/${currentUser._id}`);
            console.log(data);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
         }
      }
       
        
    })();
  },[currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(()=>{
        if(currentUser){
          socket.current = io(host);
          socket.current.emit("add new user",currentUser._id);
        }   
  },[currentUser])


    return(
        <Container>
          <div className = "container">
            <Contacts 
            contacts={contacts} 
            currentUser={currentUser} 
            changeChat={handleChatChange}/>
           
             {(currentChat===undefined)?  <Welcome 
             currentUser={currentUser}
             />:
               <ChatContainer chat={currentChat} currentUser={currentUser} socket={socket} />
               }

          </div>
        </Container>
    );
}
export default Chat;