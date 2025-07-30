import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Programming Languages</h3>
            <div className="skill-items">
              <div className="skill-item"><i className="fab fa-python"></i><span>Python</span></div>
              <div className="skill-item"><i className="fab fa-java"></i><span>Java</span></div>
              <div className="skill-item"><i className="fab fa-js"></i><span>JavaScript</span></div>
              <div className="skill-item"><i className="fas fa-superscript"></i><span>Matlab</span></div>
              <div className="skill-item"><i className="fas fa-code"></i><span>C</span></div>
              <div className="skill-item"><i className="fas fa-code"></i><span>C++</span></div>
              <div className="skill-item"><i className="fab fa-react"></i><span>React</span></div>
              <div className="skill-item"><i className="fab fa-linux"></i><span>Linux</span></div>
              <div className="skill-item"><i className="fas fa-file-alt"></i><span>Microsoft Office</span></div>
            </div>
          </div>
          <div className="skill-category">
            <h3>Machine Learning & AI</h3>
            <div className="skill-items">
              <div className="skill-item"><i className="fas fa-brain"></i><span>Deep Learning</span></div>
              <div className="skill-item"><i className="fas fa-language"></i><span>NLP</span></div>
              <div className="skill-item"><i className="fas fa-project-diagram"></i><span>Transformers (BERT, GPT, LayoutLM)</span></div>
              <div className="skill-item"><i className="fas fa-eye"></i><span>Computer Vision</span></div>
              <div className="skill-item"><i className="fas fa-sync-alt"></i><span>Model Fine-tuning</span></div>
              <div className="skill-item"><i className="fas fa-random"></i><span>Transfer Learning</span></div>
              <div className="skill-item"><i className="fas fa-network-wired"></i><span>RAG Systems</span></div>
            </div>
          </div>
          <div className="skill-category">
            <h3>Cloud & Data Tools</h3>
            <div className="skill-items">
              <div className="skill-item"><i className="fab fa-aws"></i><span>AWS S3, Sagemaker, EC2, Lambda</span></div>
              <div className="skill-item"><i className="fas fa-database"></i><span>SQL, Pandas</span></div>
              <div className="skill-item"><i className="fas fa-database"></i><span>Pinecone</span></div>
              <div className="skill-item"><i className="fas fa-layer-group"></i><span>Hugging Face</span></div>
              <div className="skill-item"><i className="fab fa-python"></i><span>PyTorch</span></div>
              <div className="skill-item"><i className="fas fa-robot"></i><span>TensorFlow</span></div>
              <div className="skill-item"><i className="fas fa-server"></i><span>Palantir Foundry</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
