export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p><strong>Email:</strong> <span>{student.email}</span></p>
      <p><strong>Age:</strong> <span>{student.age}</span></p>
      <p><strong>Grade:</strong> <span>{student.grade}</span></p>
      <div className="card-actions">
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student._id)}>Delete</button>
      </div>
    </div>
  );
}
