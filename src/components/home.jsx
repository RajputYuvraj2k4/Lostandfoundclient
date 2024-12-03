import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
import { handleSuccess, handleError } from '../util'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/home.css";
import image from "../assets/lost-2.svg";
import login from "../assets/login.jpg";
import list_item from "../assets/list-item.jpg";
import notification from "../assets/notification.jpg";
import developer from "../assets/web-developers-2.jpg";
import github from "../assets/github.png";
import instagram from "../assets/insta.png";
import mail from "../assets/mail.png";
import Header from "./header";

export default function Home() {
    const [message, sendmessage] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleMessage = (e) => {
        sendmessage({
            ...message,
            [e.target.name]: e.target.value,
        });
    };

    const handleContact = (e) => {
        e.preventDefault();

        if (!message.name || !message.email || !message.message) {
            handleError('Please fill all fields.'); 
            return; // Exit the function early if validation fails
        }


        console.log(message);
        axios.post('http://lostandfoundserver-production.up.railway.app/api/contact', message)
            .then(response => {
                console.log(response);
                handleSuccess('Contact form submitted successfully!');
                // reset the form or clear the message state
                sendmessage({});
            })
            .catch(error => {
                console.error(error);
                handleError('Failed to submit contact form. Please try again.');
            });
    };

    return (
        <>
            <Header />
            <div className="main">
                <div className="intro fw-semibold">
                    <div className="part-1">
                        <div className="title">
                            <h1 id="title-h">Lost and Found</h1>
                            <p>Lost it😕. List it📃. Find it🤩.</p>
                            <span id="reason">Nothing is ever lost that cannot be found. No more stories on Instagram pages. Unite with your lost items in just a few clicks!</span>
                            <br /> <br />
                            <Link to="/log-in">
                                <Button
                                    id="btn-start"
                                    variant="custom"
                                    size="lg"
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="part-2">
                        <div className="image">
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------------------------------------------------------------------ */}
            <div className="project-inspiration">
                <Container fluid className="total-inspiration">
                    <div>
                        <img className="developer-img" src={developer} alt="" />
                    </div>
                    <Row className="inspiration">
                        <h6 className="section-heading">My Project Inspiration💡</h6>
                        <p>
                            Colleges or University are the places where many students lose items like
                            earphones, keys, water bottels everyday which might have kept in a desk but not
                            sure if it's still there and can't do anything if it gets missing. This problem
                            feels so relatable to most of the students. A problem will still remain
                            the same until someone builds a solution to it.
                        </p>
                    </Row>
                </Container>
            </div>
            {/* ------------------------------------------------------------------------------------------------------------ */}
            <div>
                <Container fluid>
                    <div className="total-about">
                        <div className="about-heading">
                            <h6 className="section-heading">How it works ⚒️?</h6>
                        </div>
                        <div className="about-card">
                            <div className="info">
                                <img
                                    src={login}
                                    style={{ width: "200px", height: "200px" }}
                                    alt=""
                                />
                                <h4>Create an account</h4>
                                <p>Initially, you have to create an account to get started.</p>
                                <Link to="/sign-up">
                                    <Button variant="custom" size="lg">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                            <div className="info">
                                <img
                                    src={list_item}
                                    style={{ width: "200px", height: "200px" }}
                                    alt=""
                                />
                                <h4>List Lost/Found Item</h4>
                                <p>
                                    List your item on the wall by filling certain details and
                                    image. That's it!
                                </p>
                            </div>
                            <div className="info">
                                <img
                                    src={notification}
                                    style={{ width: "200px", height: "200px" }}
                                    alt=""
                                />
                                <h4>Get Notified</h4>
                                <p>
                                    Once anyone posts an item, we make our registered users aware
                                    about the same by sending notification.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div>
                <Container fluid>
                    <div className="total-contact-form">
                        <div className="contact-title">
                            <h6 className="section-heading"> Feedback Form 📨📬</h6>
                            <p>
                                If there is something you want to suggest or maybe just a hello
                                do reach out.
                            </p>
                        </div>
                        <div className="contact-form">
                            <Form>
                                <Form.Label>Name :</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={message.name || ''}
                                    onChange={handleMessage}
                                />
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address :</Form.Label>
                                    <Form.Control
                                        type="email"
                                        size="lg"
                                        placeholder="Enter email"
                                        name="email"
                                        value={message.email || ''}
                                        onChange={handleMessage}
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message :</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        as="textarea"
                                        rows={6}
                                        name="message"
                                        value={message.message || ''}
                                        onChange={handleMessage}
                                    />
                                </Form.Group>
                                <Button variant="custom" onClick={handleContact}>
                                    Submit
                                </Button>
                            </Form>
                            <ToastContainer />
                        </div>
                    </div>
                </Container>
            </div>

            <div className="footer">
                <div className="social-icon">
                    <a
                        href="https://github.com/RajputYuvraj2k4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={github} className="icon github" alt="" />
                    </a>
                    <a
                        href="https://www.instagram.com/a.randomguyontheinternet"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={instagram} className="icon" alt="" />
                    </a>

                    <a
                        href="mailto:singhyuvrajys13@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={mail} className="icon" alt="" />
                    </a>
                </div>
                <div className="personal-info">
                    <p>Created with ❤️ using MERN by </p>
                    <h4>
                        <span className="symbol">&#60;</span>Yuvraj Singh
                        <span className="symbol">/&#62;</span>
                    </h4>
                    <h6>Full Stack Developer</h6>
                </div>
                <h5 style={{ textAlign: "center" }}>
                    Copyright © 2024 Yuvraj Singh. All rights reserved.
                </h5>
            </div>
        </>
    );
}
