import React, { useState, useEffect, useContext,useRef  } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';

function Contact() {
  const [progress, setProgress] = useState(0);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    if (loading) {
      scrollToBottom();
    }
  }, [loading]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let progress = 0;
    if (formData.name) progress += 33.33;
    if (formData.email) progress += 33.33;
    if (formData.message) progress += 33.34;

    setProgress(progress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.status === 200) {
        setResponseMessage(response.data.message);
        setProgress(100);
        fetchMessages(); // Fetch messages again to include the new one
        setShowModal(false); // Hide the modal after submission
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message);
      } else {
        setResponseMessage('An error occurred while submitting the form.');
      }
    }
  };

  const handleReply = async (messageId, reply) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/messages/${messageId}/reply`, reply);
      if (response.status === 200) {
        fetchMessages(); // Fetch messages again to include the new reply
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className='container' id="A">
      <h2>Forum Messages</h2>
      

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onInput={handleInput}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onInput={handleInput}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onInput={handleInput}
                rows="4"
                required
              />
            </Form.Group>
            <ProgressBar now={progress} className="mt-3" />
            <Button variant="primary" type="submit" className="mt-3">
              Send
            </Button>
          </Form>
          {responseMessage && <p className="mt-3">{responseMessage}</p>}
        </Modal.Body>
      </Modal>

      <Button className="mt-3" onClick={() => setLoading(!loading)}>
        {loading ? 'Hide Messages' : 'View Messages'}
      </Button>
      {loading && (
        <div className="mt-3">
          <div className="list-group">
            {messages.map((msg) => (
              <div key={msg._id} className="custom-list-item2">
                <p><b>{msg.name}</b></p>
                <p>{msg.message}</p>
                <h5>Replies:</h5>
                <div className="list-group">
                  {msg.replies.map((reply, index) => (
                    <div key={index} className="custom-list-item1">
                      <p><b>{reply.name}</b></p>
                      <p>{reply.message}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const reply = {
                    name: user ? user.name : '',
                    email: user ? user.email : '',
                    message: e.target.replyMessage.value
                  };
                  handleReply(msg._id, reply);
                }}>
                  <Form.Group controlId="formReply">
                    <Form.Label>Reply:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="replyMessage"
                      rows="2"
                      required
                    />
                  </Form.Group>
                  <Button variant="secondary" type="submit" className="mt-2">
                    Reply
                  </Button>
                </form>
              </div>
            ))}
          </div>
          <Button className="mt-3" onClick={() => setLoading(!loading)}>
        {loading ? 'Hide Messages' : 'View Messages'}
      </Button>
        </div>
      )}
      <Button variant="primary" onClick={() => setShowModal(true)}>
      Write a Message
    </Button>

    <div ref={messagesEndRef} />
    </div>
  );
}

export default Contact;
