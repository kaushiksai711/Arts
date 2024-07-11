import React, { useState } from 'react';

function Contact() {
  const [progress, setProgress] = useState(0);

  const handleInput = () => {
    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const inputValue = document.getElementById("message").value;

    let progress = 0;
    if (nameValue) progress += 33.33;
    if (emailValue) progress += 33.33;
    if (inputValue) progress += 33.34;

    setProgress(progress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const inputValue = document.getElementById("message").value;

    if (nameValue === "") {
      alert("Please fill in the name field.");
      return false;
    }
    if (emailValue === "") {
      alert("Please fill in the email field.");
      return false;
    }
    if (inputValue === "") {
      alert("Please fill in the message field.");
      return false;
    }

    alert("Form submitted.");
    setProgress(100);
    return true;
  };

  return (
    <div className='container' id="A">
      <h2>Contact Us</h2>
      <p>We would love to hear from you!</p>

      <div className="progress mt-3" id="progressBar">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" onInput={handleInput} /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" onInput={handleInput} /><br />
        <label htmlFor="message">Message:</label><br />
        <textarea id="message" name="message" rows="4" cols="50" onInput={handleInput}></textarea><br />
        <input type="submit" value="Send" /><br />
      </form>
    </div>
  );
}

export default Contact;
