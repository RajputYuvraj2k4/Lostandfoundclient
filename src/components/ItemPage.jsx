import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Button, Modal, Form, Spinner, Alert, Card, Row, Col } from "react-bootstrap";
import { handleError, handleSuccess } from "../util";
import NavigationBar from "../components/Navbar";
import "../css/ItemPage.css";

function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formItemName, setFormItemName] = useState("");
    const [formItemDescription, setFormItemDescription] = useState("");
    const [formItemQuestion, setFormItemQuestion] = useState("");
    const [formItemType, setFormItemType] = useState("");
    const [itemImages, setItemImages] = useState([]);
    const [newImage, setNewImage] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await Axios.get(`http://localhost:8080/api/items/${id}`);
                setItemData(response.data);
                setItemImages(response.data.images);
                setFormItemType(response.data.type);
            } catch (error) {
                handleError("Error fetching item data.");
                console.error("Error fetching item data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItemData();
    }, [id]);

    const handleEditModalOpen = () => {
        if (itemData) {
            setFormItemName(itemData.itemname);
            setFormItemDescription(itemData.description);
            setFormItemQuestion(itemData.itemquestion);
            setFormItemType(itemData.type);
        }
        setShowEditModal(true);
        setUpdateSuccess(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('itemname', formItemName);
        formData.append('description', formItemDescription);
        formData.append('itemquestion', formItemQuestion);
        formData.append('type', formItemType);
        if (newImage) {
            formData.append('itemImages', newImage);
        }

        try {
            const response = await Axios.put(`http://localhost:8080/api/items/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            handleSuccess(response.data.message);
            setUpdateSuccess(true);
            setShowEditModal(false);
            const fetchResponse = await Axios.get(`http://localhost:8080/api/items/${id}`);
            setItemData(fetchResponse.data);
        } catch (error) {
            handleError('Error updating item: ' + (error.response?.data?.message || error.message));
            console.error("Error updating item:", error);
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteItem = async () => {
        const token = localStorage.getItem('token');
        try {
            await Axios.delete(`http://lostandfoundserver-production.up.railway.app/api/items/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            handleSuccess("Item deleted successfully.");
            navigate("/feed");
        } catch (error) {
            handleError('Error deleting item: ' + (error.response?.data?.message || error.message));
            console.error("Error deleting item:", error);
        }
    };

    const confirmDelete = () => {
        handleDeleteItem();
        setShowDeleteModal(false); // Close the modal after deletion
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> </div>
        );
    }

    if (!itemData) {
        return <div>No item found.</div>;
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    <Col md={6}>
                        <Card className="item-image-card">
                            <Card.Img
                                variant="top"
                                src={itemImages[0]?.url}
                                alt="Item"
                                className="item-image"
                            />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="item-details-card">
                            <Card.Body>
                                <Card.Title>{itemData.itemname}</Card.Title>
                                <Card.Text>
                                    <strong>Description:</strong> {itemData.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong> {itemData.type}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Registered At:</strong> {new Date(itemData.createdAt).toLocaleString()}
                                </Card.Text>
                                <div className="action-buttons">
                                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                                    <Button variant="primary" onClick={handleEditModalOpen}>Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="question-answer-section" style={{ marginTop: '30px' }}>
                    <h3>Your Question</h3>
                    <Card className="question-card">
                        <Card.Body>
                            <Card.Text>
                                <strong>Question:</strong> {itemData.itemquestion}
                            </Card.Text>
                            <Card.Text>
                                <strong>Answer:</strong> <b>{itemData.answer || "No answer submitted yet."}</b>
                            </Card.Text>
                            <Card.Text>
                                <strong>Date:</strong> {itemData.answerDate ? new Date(itemData.answerDate).toLocaleString() : "N/A"}
                            </Card.Text>
                            <div className="validation-buttons">
                                <Button variant="danger">No</Button>
                                <Button variant="primary">Yes</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Edit Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditSubmit}>
                            <Form.Group controlId="formItemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formItemName}
                                    onChange={(e) => setFormItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={formItemDescription}
                                    onChange={(e) => setFormItemDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemQuestion">
                                <Form.Label>Item Question</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formItemQuestion}
                                    onChange={(e) => setFormItemQuestion(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemType">
                                <Form.Label>Item Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formItemType}
                                    onChange={(e) => setFormItemType(e.target.value)}
                                >
                                    <option value="Lost">Lost</option>
                                    <option value="Found">Found</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formItemImage">
                                <Form.Label>Upload New Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setNewImage(e.target.files[0])}
                                />
                            </Form.Group>
                        </Form>
                        {updateSuccess && <Alert variant="success" className="mt-3">Item updated successfully!</Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={updating} onClick={handleEditSubmit}>
                            {updating ? <Spinner animation="border" size="sm" /> : "Save Changes"}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this item?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            No
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Yes, Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default ItemPage;