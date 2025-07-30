import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a CS student at Stanford focused on applied AI and systems engineering.
              I've built tools that help people find clinical trials, classify sensitive documents, and rethink how the U.S.
              Navy deploys underwater weapons. These projects sit at the intersection of intelligence, infrastructure, and impact.
            </p>
            <p>
              My strengths lie in taking fuzzy, high-stakes problems and turning them into clear technical roadmaps.
              I care about scalability, clarity, and shipping things that matter. Whether it's tuning models, designing
              data pipelines, or building backend systems, I try to bring rigor, curiosity, and a healthy sense of skepticism.
            </p>
            <p>
              Now for what I really do in life, I love to live to the fullest. Spending time with friends/family, staying active,
              being outside as much as possible, eating good food, and having a whole lot of fun are all on the itinerary.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>3+</h3>
                <p>Years of Experience</p>
              </div>
              <div className="stat">
                <h3>100+</h3>
                <p>Hobbies and Counting</p>
              </div>
              <div className="stat">
                <h3>2</h3>
                <p>CS Degrees in Progress. So Far, So Good.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/about.JPG" alt="About Me" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
