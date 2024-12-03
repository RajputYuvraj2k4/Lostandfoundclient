import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import '../css/mylistings.css';

const MyListings = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            if (!user || !user._id || !token) {
                setError("User not logged in or missing details in local storage.");
                setLoading(false);
                return;
            }

            try {
                const response = await Axios.get(`http://lostandfoundserver-production.up.railway.app/api/items/mylistings`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setItems(response.data);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Failed to fetch listings.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <NavigationBar />
            <div className="listing-title">
                <h2 style={{ textAlign: "center" }}>My Listings:</h2>
                <div className="title-border"></div>
            </div>
            <Container fluid>
                <Row>
                    {items.length === 0 ? (
                        <p>You have no listings yet.</p>
                    ) : (
                        items.map(item => (
                            <Col key={item._id} md={3} style={{ marginTop: "2%" }}>
                                <Card style={{ maxHeight: "465px" }}>
                                    <Card.Img
                                        variant="top"
                                        src={item.images[0]?.url || "default-placeholder.png"}
                                        alt={item.itemname}
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.itemname}</Card.Title>
                                        <Card.Text>Description: {item.description}</Card.Text>
                                        <Card.Text>Type: {item.type}</Card.Text>
                                        <Card.Text>
                                            Registered at: {item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default MyListings;
