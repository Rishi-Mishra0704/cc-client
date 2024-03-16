"use client"
import React, { useState, useEffect } from 'react';

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    setSlug(generateSlug());
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cc-s4.vercel.app/rooms/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName, slug }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Room created successfully:', responseData);
      } else {
        console.error('Failed to create room:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Room Name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoomPage;
