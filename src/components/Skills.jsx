export default function Skills() {
  const skills = ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Git & GitHub", "Python", "SQL"];

  return (
    <section id="skills" className="section">
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-chip">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}