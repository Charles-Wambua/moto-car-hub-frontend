import React, { useState } from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can use the data to send a message to the seller
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  };

  return (
    <div className="seller-page">
      <div className="seller-info">
        <h2>Contact Seller</h2>
        <p>Phone: +254792685635</p>

        <div className="social-media">
          <a href="https://wa.me/254792685635">
            <i className="fab fa-whatsapp" aria-label="WhatsApp"></i>
          </a>
          <a href="https://www.instagram.com/m.unyaka/">
            <i className="fab fa-instagram" aria-label="Instagram"></i>
          </a>
          <a href="https://twitter.com/Charles59676543">
            <i className="fab fa-twitter" aria-label="Twitter"></i>
          </a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

// export default Contact;
//
