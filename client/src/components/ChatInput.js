import React, { Fragment,useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    .button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
const ChatInput =(props)=> {
  
    const [msg,setMsg] = useState("");
    const[showEmojis,setShowEmojis] = useState(false);
  const handleEmojiPickerhideShow = () => {
      setShowEmojis(!showEmojis);
  }
  const handleEmojiClick = (event,emojiObject)=> {
      console.log(emojiObject);
      let message = msg;
      message += emojiObject.emoji;
      setMsg(message);
  }
    const inputHandler =(event)=> {
      setMsg(event.target.value);
    }
    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0){
            props.sendMsg(msg);
            setMsg("");
        }
    }
    return(
    <Fragment>
         <Container>
         
         <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojis && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
             </div>
            
            <form className="input-container" onSubmit={sendChat}>
                <input 
                type="text"
                placeholder="please start typing here!"
                onChange={inputHandler}
                value={msg}

                />
          <button className="button" type="submit"> 
                <IoMdSend />
            </button>
          
            </form>
            
            
            
         
          
            
            
            
            
            
        </Container>
    </Fragment>
       
    )
}
export default ChatInput;

