import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addResponseMessage, Widget } from 'react-chat-widget';
import { io} from 'socket.io-client';
import  'react-chat-widget/lib/styles.css';

// ----------------------------------------------------------------------

const socket = io("http://localhost:3001")
export default function ChatWidget() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)
  const username = (user?.result?.name || user?.result?.username)

  const handleNewUserMessage =(newMessage)=>{
      socket.emit('send-message',username.concat("\n",newMessage))
  }


  useEffect(() => {
      const welcomeMessage = "Welcome ";
      addResponseMessage(welcomeMessage.concat(username,". You are able to discuss with the people present here learning this course through this widget. Everyone present will be able to read your messages"))
      socket.on('recieve-message',(message)=>{
        addResponseMessage(message)
      })
  }, []);



  return (
    <Widget title={"WELCOME"} subtitle={"Chat with present learners"} handleNewUserMessage={handleNewUserMessage} />
  );
}
