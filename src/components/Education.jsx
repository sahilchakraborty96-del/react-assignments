export default function Education() {
  const educationData = [
    {
      degree: "Bachelor in Computer Applications (BCA)",
      institution: "College / University",
      year: "2023 - 2026",
    },
    {
      degree: "Higher Secondary Examination",
      institution: "High School",
      year: "Completed",
    },
  ];

  return (
    <section id="education" className="section">
      <h2>Education</h2>
      <div className="card-container">
        {educationData.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.degree}</h3>
            <p className="institution">{item.institution}</p>
            <span className="year">{item.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}