/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const env = import.meta.env;




export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { room_id, room_username } = window.history.state.usr;
  const navigate = useNavigate();

  const socket = io(env.VITE_BASE_URL);

  const logoutChat = async () => {
    try {
      const response = await fetch(`${env.VITE_BASE_URL}/messages/exit/${room_username}`);
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleSendMessage = async (messageText) => {
    const data = {
      message_room_id: room_id,
      message_username: room_username,
      message_text: messageText,
    };

    socket.emit('chat message', data);

    try {
      const response = await fetch(`${env.VITE_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // fetchData();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${env.VITE_BASE_URL}/messages/${room_id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
    socket.on('chat message', (message) => {
      if (room_id == message.message_room_id) {
        setMessages((messages) => [...messages, message]);
      }
    });
  
    return () => {
      socket.off('chat message');
    };
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white p-4 flex flex-row justify-between items-center font-inter">
          <div>
            <button onClick={logoutChat} className="text-primary font-light text-sm float-left">Exit</button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{room_id}</h1>
          </div>
          <div></div>
        </div>
        <div className="pt-16 mb-16 relative flex flex-grow flex-col px-5 justify-end">
          {
            messages.map(({ message_username, message_text }, i) => {
              return <BubbleChat key={i} message_username={message_username} message_text={message_text} cUsername={room_username} />
            })
          }
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
          <InputMessage onSend={handleSendMessage} />
        </div>
      </div>
    </>
  );
}

function BubbleChat({message_username, message_text, cUsername}) {
  if (message_username === cUsername) {
    return (
      <>
        <div className="block my-1">
          <div className="w-3/4 ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-primary flex flex-col relative  speech-bubble-right text-white">
            <p className="">
              {message_text}
            </p>
            <p className="text-gray-100 text-xs text-right leading-none">8:00 AM</p>
          </div>
        </div>
      </>
    );
  }else{
    return (
      <>
        <div className="block my-1">
          <div className='w-full flex justify-start'>
            <span className='text-sm text-gray-600 leading-tigh'>{message_username}</span>
          </div>
          <div className="w-3/4 mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-secondary flex flex-col relative  speech-bubble-left">
          <p>
            {message_text}
          </p>
          <p className="text-gray-600 text-xs text-right leading-none">8:45 AM</p>
        </div>
        </div>
      </>
    );
  }
}

function InputMessage({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
      <input
        type="text"
        className="peer h-full w-full rounded-full border border-blue-gray-200 bg-secondary px-3 py-2.5 pr-20 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder="Message Here..."
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="!absolute right-1 top-1 z-10 select-none rounded-full bg-primary py-2 px-2 text-center align-middle text-xs text-white transition-all "
        type="button"
        data-ripple-light="true"
        onClick={handleSendClick}
      >
        <IconArrowUp />
      </button>
    </div>
  );
}
function IconArrowUp(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="16px"
      width="16px"
      {...props}
    >
      <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
    </svg>
  );
}

