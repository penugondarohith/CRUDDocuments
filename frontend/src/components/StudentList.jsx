import StudentCard from './StudentCard';

export default function StudentList({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return <p className="no-students">No students found</p>;
  }

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
