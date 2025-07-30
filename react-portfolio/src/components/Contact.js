import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together!</h3>
            <p>I'm always interested in new opportunities and meeting new people.</p>
            <div className="contact-items">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>alexjw3@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/alex-wang-403455174/" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-linkedin"></i></a>
              <a href="https://github.com/alexjw3" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" id="subject" name="subject" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
