import './ConnectRoom.css';
import io from 'socket.io-client';
import {useState, useEffect} from 'react';
import Order from './Order';
import { useNavigate } from 'react-router-dom';

const socket = io.connect("http://localhost:5555");

function ConnectRoom() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };  

  useEffect(()=>{
    // setUsername(localStorage.getItem('userName'));
    setRoom(5);

    // if(!localStorage.getItem('userToken')){
    //   navigate('/');
    // }
  }, []);

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>VÀO TRANG ĐƠN HÀNG</h3>
          <input
            // hidden={true}
            value={username}
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            // hidden={true}
            value={room}
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>OKAY</button>
        </div>
      ) : (
        <Order socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ConnectRoom;
