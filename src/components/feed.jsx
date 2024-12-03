import React, { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import "../css/feed.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Feed() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [loggedInUser , setLoggedInUser ] = useState('');
    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('user'); // Get the user data from local storage
        if (user) {
            try {
                const parsedUser  = JSON.parse(user); // Parse the user string to an object
                setLoggedInUser (parsedUser .fname); // Set the user's first name
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        fetchItems(); // Fetch items after setting the logged-in user
    }, []);

    const fetchItems = async () => {
        try {
            const response = await Axios.get("http://lostandfoundserver-production.up.railway.app/api/items");
            const items = response.data;

            const lost = items.filter(item => item.type === 'Lost');
            const found = items.filter(item => item.type === 'Found');

            setLostItems(lost);
            setFoundItems(found);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };
    

    const handleItemPosted = (newItem) => {
        if (newItem.type === 'Lost') {
            setLostItems(prevItems => [...prevItems, newItem]);
        } else if (newItem.type === 'Found') {
            setFoundItems(prevItems => [...prevItems, newItem]);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <NavigationBar onItemPosted={handleItemPosted} />
            <h2 style={{ fontFamily: "'Noto Sans JP', sans-serif", marginLeft: "5px" }}>
                Welcome {loggedInUser } 👋!
            </h2>
            <Container fluid>
                <h2 style={{ textAlign: "center" }}>Lost Items:</h2>
                <div className="title-border"></div>
                <Row>
                    {lostItems.map(item => (
                        <Col key={item._id} md={3} style={{ marginTop: "2%" }}>
                            <Card bsPrefix="item-card">
                                <Card.Img variant="top" src={item.images[0].url} />
                                <Card.Body bsPrefix="card-body">
                                    <Card.Title>{item.itemname}</Card.Title>
                                    <Card.Text>Description: {item.description}</Card.Text>
                                    <Card.Text>
                                        Registered At: {formatDate(item.createdAt)}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/item/${item._id}/${item.type}`)} // Navigate to ItemPage
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container fluid>
                <h2 style={{ textAlign: "center" }}>Found Items:</h2>
                <div className="title-border"></div>
                <Row>
                    {foundItems.map(item => (
                        <Col key={item._id} md={3} style={{ marginTop: "2%" }}>
                            <Card bsPrefix="item-card">
                                <Card.Img variant="top" src={item.images[0].url} />
                                <Card.Body bsPrefix="card-body">
                                    <Card.Title>{item.itemname}</Card.Title>
                                    <Card.Text>Description: {item.description}</Card.Text>
                                    <Card.Text>
                                        Registered At: {formatDate(item.createdAt)}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/item/${item._id}/${item.type}`)} // Navigate to ItemPage
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}