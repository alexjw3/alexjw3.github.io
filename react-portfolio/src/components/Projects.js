import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Experience Highlights</h2>
        <div className="projects-grid">
          {/* Cyberhaven */}
          <div className="project-card">
            <div className="project-image cyberhaven-bg">
              <div className="logo-container">
                <img src="Logos/cyberhaven-logo-light-1.webp" alt="Cyberhaven Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://www.cyberhaven.com" target="_blank" rel="noopener noreferrer" className="project-link">Cyberhaven</a> (Internship)</h3>
              <p><strong>Document Provenance Classifier</strong><br />
              Created an LLM-driven classification system to infer document origin and ownership within enterprise settings. Used metadata, prompting strategies, and reasoning models to enable secure document lineage analysis.</p>
              <div className="project-tech">
                <span>LLMs</span>
                <span>Vertex AI</span>
                <span>LangGraph</span>
              </div>
            </div>
          </div>

          {/* VC & Early-Stage Investing */}
          <div className="project-card">
            <div className="project-image kyber-bg">
              <div className="logo-container">
                <img src="Logos/KyberKnight.png" alt="Kyber Knight Capital Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3>VC Associate – Kyber Knight Capital</h3>
              <p>Conducted sourcing and diligence on AI-first startups across vertical SaaS, legal tech, and defense. Built internal tools for scraping market signals and evaluated technical products from founder-led companies.</p>
              <div className="project-tech">
                <span>Startup Analysis</span>
                <span>Due Diligence</span>
                <span>Technical Sourcing</span>
              </div>
            </div>
          </div>

          {/* Defense & Strategy */}
          <div className="project-card">
            <div className="project-image defense-bg">
              <div className="logo-container">
                <img src="Logos/hackingdefense.png" alt="Hacking 4 Defense Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3>Hydra Strike (Hacking 4 Defense)</h3>
              <p>Led strategy and system design for a modular undersea payload system in collaboration with the U.S. Navy. Conducted 40+ interviews with defense stakeholders to develop scalable alternatives to traditional torpedoes.</p>
              <div className="project-tech">
                <span>Defense Innovation</span>
                <span>Stakeholder Research</span>
                <span>Concept Development</span>
              </div>
            </div>
          </div>

          {/* Alkymi */}
          <div className="project-card">
            <div className="project-image alkymi-bg">
              <div className="logo-container">
                <img src="Logos/Alkymi.png" alt="Alkymi Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://alkymi.io" target="_blank" rel="noopener noreferrer" className="project-link">Alkymi</a> (Internship)</h3>
              <p><strong>AI Intern</strong><br />
              Built a feedback loop-powered fine-tuning pipeline for financial and legal document classification. Helped extend the company's NLP capabilities into the legal domain using LayoutLM, PyTorch, and PostgreSQL.</p>
              <div className="project-tech">
                <span>LayoutLM</span>
                <span>PyTorch</span>
                <span>AI Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Silver Lake */}
          <div className="project-card">
            <div className="project-image silverlake-bg">
              <div className="logo-container">
                <img src="Logos/Silver_Lake_(Unternehmen)_logo.svg.png" alt="Silver Lake Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://www.silverlake.com" target="_blank" rel="noopener noreferrer" className="project-link">Silver Lake</a> (Internship)</h3>
              <p><strong>Summer Analyst</strong> | June 2023 - August 2023<br />
              Worked as a private equity intern for premier technology investment firm. Developed growth strategies for portfolio companies Zuora, Unity, OVG, and Qualtrics.</p>
              <div className="project-tech">
                <span>Private Equity</span>
                <span>Growth Strategy</span>
                <span>Portfolio Management</span>
              </div>
            </div>
          </div>

          {/* Cardinal Ventures */}
          <div className="project-card">
            <div className="project-image cardinal-bg">
              <div className="logo-container">
                <img src="Logos/CV_logo-horizontal.png" alt="Cardinal Ventures Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://cardinalventures.org" target="_blank" rel="noopener noreferrer" className="project-link">Cardinal Ventures</a></h3>
              <p><strong>Alumni and Sponsor Relations</strong> | August 2022 - Present<br />
              Created relationships with program alumni as well as raised funding from law, banking, and venture capital sponsors. Supporting student entrepreneurs with a community of founders and a worldwide network of mentors and investors.</p>
              <div className="project-tech">
                <span>Alumni Relations</span>
                <span>Fundraising</span>
                <span>Entrepreneurship</span>
              </div>
            </div>
          </div>

          {/* Ames Capital Partners */}
          <div className="project-card">
            <div className="project-image ames-bg">
              <div className="logo-container">
                <img src="Logos/ACP.png" alt="Ames Capital Partners Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://www.amescapital.com" target="_blank" rel="noopener noreferrer" className="project-link">Ames Capital Partners</a></h3>
              <p><strong>Search Fund Analyst</strong> | August 2023 - February 2024<br />
              Driving data analysis, industry research, and acquisition sourcing for search fund. Conducting data analysis and industry research to guide strategic investment decisions and identify opportunities.</p>
              <div className="project-tech">
                <span>Data Analysis</span>
                <span>Investment Research</span>
                <span>Due Diligence</span>
              </div>
            </div>
          </div>

          {/* InfluxData */}
          <div className="project-card">
            <div className="project-image influx-bg">
              <div className="logo-container">
                <img src="Logos/influxdata_stacked_navy.svg" alt="InfluxData Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://www.influxdata.com" target="_blank" rel="noopener noreferrer" className="project-link">InfluxData</a> (Internship)</h3>
              <p><strong>Software Intern</strong> | June 2022 - September 2022<br />
              Developed data visualization tools for the Chronograf product for the InfluxDB, the leading time-series database.</p>
              <div className="project-tech">
                <span>Data Visualization</span>
                <span>Time-Series DB</span>
                <span>Frontend Development</span>
              </div>
            </div>
          </div>

          {/* UCSC Research */}
          <div className="project-card">
            <div className="project-image ucsc-bg">
              <div className="logo-container">
                <img src="Logos/ucsc-logo-png-1632430467.png" alt="UCSC Logo" className="company-logo-img" />
              </div>
            </div>
            <div className="project-content">
              <h3><a href="https://www.ucsc.edu" target="_blank" rel="noopener noreferrer" className="project-link">Science Internship Program at UCSC</a></h3>
              <p><strong>Research Assistant, Department of Astrophysics and Astronomy</strong> | May 2020 - January 2021<br />
              Trained models for post-doctoral student writing thesis on RR-Lyrae stars, presented to American Astronomical Society.</p>
              <div className="project-tech">
                <span>Astrophysics</span>
                <span>Machine Learning</span>
                <span>Research</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
