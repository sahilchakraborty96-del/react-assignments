export default function StudentCard({ student }) {
  return (
    <div className="student-card">
      <img src={student.photo} alt={student.name} className="student-photo" />
      <div className="student-details">
        <h3>{student.name}</h3>
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Dept:</strong> {student.department}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
        <p className="cgpa-badge"><strong>CGPA:</strong> {student.cgpa}</p>
      </div>
    </div>
  );
}