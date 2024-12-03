import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { handleError, handleSuccess } from "../util";
import axios from 'axios';

const PostItemModal = ({ show, handleClose, onItemPosted }) => {
  const [itemname, setItemname] = useState('');
  const [description, setDescription] = useState('');
  const [itemquestion, setItemquestion] = useState('');
  const [type, setType] = useState('');
  const [itemImages, setItemImages] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemname || !description || !itemquestion || !type || itemImages.length === 0) {
      handleError("All fields, including an image, are required.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('itemname', itemname);
    formData.append('description', description);
    formData.append('itemquestion', itemquestion);
    formData.append('type', type);

    // Append each selected image to the FormData
    Array.from(itemImages).forEach((image) => {
      formData.append('itemImages', image);
    });

    setLoading(true); // Set loading to true when starting the submission

    try {
      // Get the JWT token from local storage or wherever you store it
      const token = localStorage.getItem('token');
      const response = await axios.post('http://lostandfoundserver-production.up.railway.app/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      handleSuccess(response.data.message);
      onItemPosted(response.data.item); // Notify the parent about the new item
      handleClose(); // Close the modal

      // Reset form fields
      setItemname('');
      setDescription('');
      setItemquestion('');
      setType('');
      setItemImages([]);
    } catch (error) {
      handleError('Error submitting the form: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Set loading to false after submission completes
    }
  };

  const handleImageChange = (e) => {
    setItemImages(e.target.files); 
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Post Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={itemname}
              onChange={(e) => setItemname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Item Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: What color is the item?"
              value={itemquestion}
              onChange={(e) => setItemquestion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Item Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="Lost">Lost It</option>
              <option value="Found">Found It</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
              name="itemImages"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose }>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostItemModal;