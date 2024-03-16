"use client"
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { redirect } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await fetch("https://cc-s4.vercel.app/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registration successful:", responseData);
        redirect(`/rooms/create`)
      } else {
        console.error("Registration failed:", response.statusText);
        // Optionally, handle errors and show an error message to the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle network errors or other exceptions here
    }
  };

  return (
    <Container className="mt-4 body">
      <h1 className="form-title">Login</h1>
      <Form onSubmit={handleSubmit} className="registration-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
