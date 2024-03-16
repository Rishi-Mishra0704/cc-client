"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const JoinRoomPage = () => {
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      // Validate the slug length
      if (slug.length !== 8) {
        setError('Slug must be 8 characters long');
        return;
      }

      // Send a POST request to join the room using the provided slug
      const response = await fetch(`https://cc-s4.vercel.app/rooms/join/${slug}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Joined room successfully:', responseData);
        router.push(`/rooms/${slug}`)
      } else {
        console.error('Failed to join room:', response.statusText);
        // Optionally, handle errors and display an error message to the user
        setError('Failed to join room');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      // Handle network errors or other exceptions here
      setError('Error joining room');
    }
  };

  return (
    <div>
      <h2>Join Room</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSlug">
          <Form.Label>Slug (8 characters)</Form.Label>
          <Form.Control
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter room slug"
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">
          Join Room
        </Button>
      </Form>
    </div>
  );
};

export default JoinRoomPage;
