import { useState } from 'react';
import StudentCard from './StudentCard';

const initialStudents = [
  {
    id: 1,
    name: "Sahil Chakraborty",
    rollNo: "231001102247",
    department: "Bachelor in Computer Applications",
    semester: "4th",
    cgpa: 8.92,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil"
  },
  {
    id: 2,
    name: "Aarav Sharma",
    rollNo: "231001102210",
    department: "Computer Applications",
    semester: "4th",
    cgpa: 7.85,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav"
  },
  {
    id: 3,
    name: "Priya Mukherjee",
    rollNo: "231001102235",
    department: "Computer Applications",
    semester: "4th",
    cgpa: 9.40,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: 4,
    name: "Rohan Das",
    rollNo: "231001102251",
    department: "Computer Applications",
    semester: "4th",
    cgpa: 8.15,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  }
];

export default function StudentList() {
  const [students, setStudents] = useState(initialStudents);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = () => {
    const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...students].sort((a, b) => {
      return nextOrder === 'asc' ? a.cgpa - b.cgpa : b.cgpa - a.cgpa;
    });
    setStudents(sorted);
    setSortOrder(nextOrder);
  };

  return (
    <div className="assignment-container">
      <div className="section-header">
        <h2>Student Information Portal</h2>
        <button onClick={handleSort} className="btn sort-btn">
          Sort by CGPA ({sortOrder === 'asc' ? 'Lowest to Highest' : 'Highest to Lowest'})
        </button>
      </div>

      <div className="student-grid">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}