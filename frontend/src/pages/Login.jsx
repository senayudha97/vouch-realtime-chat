import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const env = import.meta.env;

export default function Login() {
  const [username, setUsername] = useState('');
  const [roomid, setRoomid] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(''); // Menambah state error
  const navigate = useNavigate();

  const handleJoinClick = async () => {
    setIsWaiting(true);

    // Cek apakah salah satu input kosong
    if (!username || !roomid) {
      setError('Both fields are required'); // Set error message
      setIsWaiting(false);
      return;
    }

    const data = {
      room_id: roomid,
      room_username: username,
    };

    try {
      const response = await fetch(`${env.VITE_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res = await response.json();
        if (res.success) {
          setError(res.message);
          setIsWaiting(false);
          return;
        }
        navigate('/chat', {
          state: { room_id: data.room_id, room_username: data.room_username, username: data.room_username },
        });
      } else {
        setError('Failed to fetch messages');
        setIsWaiting(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-center items-center p-4 font-inter font-bold text-3xl">
          <h1>Join Chatroom</h1>
        </div>
        <div className="flex flex-col overflow-y-auto p-4"></div>
        <div className="flex p-4">
          <input
            type="text"
            className={`flex-grow border-2 border-gray-200 bg-secondary p-2 rounded focus:outline-none focus:border-primary ${
              !username && error ? 'border-red-500' : '' // Tambahkan border merah jika username kosong dan ada error
            }`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex p-4">
          <input
            type="text"
            className={`flex-grow border-2 border-gray-200 bg-secondary p-2 rounded focus:outline-none focus:border-primary ${
              !roomid && error ? 'border-red-500' : '' // Tambahkan border merah jika roomid kosong dan ada error
            }`}
            placeholder="RoomID"
            value={roomid}
            onChange={(e) => setRoomid(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-500 text-center mb-2">
            {error}
          </div>
        )}
        <div className="fixed bottom-0 flex px-4 marker: w-full py-3 bg-white">
          <button
            type="button"
            className="w-full bg-primary hover-bg-green-600 text-white font-bold py-3 px-4 rounded-full disabled:bg-gray-500 transition ease-in-out duration-300"
            onClick={handleJoinClick}
            disabled={isWaiting}
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
}
