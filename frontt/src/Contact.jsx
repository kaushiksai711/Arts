import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';

const apiUrl= "https://arts-github-io-2.onrender.com"
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
  const [expandedMessageId, setExpandedMessageId] = useState(null);

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
      const response = await axios.get(`${apiUrl}/api/messages`);
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
      const response = await axios.post(`${apiUrl}/api/contact`, formData);
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
      const response = await axios.post(`${apiUrl}/api/messages/${messageId}/reply`, reply);
      if (response.status === 200) {
        fetchMessages(); // Fetch messages again to include the new reply
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const toggleMessage = (messageId) => {
    if (expandedMessageId === messageId) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(messageId);
    }
  };

  return (
    <div className='container' id="A">
      <h2>Forum Messages</h2>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className='card1'closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body className='container5' id='A'>
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

      <Button className=" md-3 mr-3" onClick={() => setLoading(!loading)}>
        {loading ? 'Hide Messages' : 'View Messages'}
      </Button>
      {loading && (
        <div className="mt-3 md-3 p-3">
          <div className="list-group">
            {messages.map((msg) => (
              <div key={msg._id} className="custom-list-item2">
                <h6><b>{msg.name}</b>
                <sub>-{msg.email}</sub></h6>
                <p>{msg.message}</p>
                <Button variant="secondary" onClick={() => toggleMessage(msg._id)}>
                  {expandedMessageId === msg._id ? 'Hide Replies' : 'View Replies'}
                </Button>
                {expandedMessageId === msg._id && (
                  <>
                    <h5>Replies:</h5>
                    {msg.replies.length !==0  ?(
                    <div className="list-group mt-3 mr-3">
                      {msg.replies.map((reply, index) => (
                        <div key={index} className="custom-list-item1">
                          <h6><b>{reply.name}</b>
                          <sub>-{reply.email}</sub></h6>
                          <p>{reply.message}</p>
                        </div>
                      ))}
                    </div>):
                    <div className="list-group">
                    No reply yet .Be the first to reply
                  </div>}
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
                  </>
                )}
              </div>
            ))}
          </div>
          <Button className="mt-3 md-3" onClick={() => setLoading(!loading)}>
            {loading ? 'Hide Messages' : 'View Messages'}
          </Button>
        </div>
      )}
      <Button className=" m-3 "variant="primary" onClick={() => setShowModal(true)}>
        Write a Message
      </Button>

      <div ref={messagesEndRef} />
    </div>
  );
}

export default Contact;
