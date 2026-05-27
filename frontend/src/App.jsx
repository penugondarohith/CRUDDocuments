import { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from './services/api';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './Student.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents('');
  }, []);

  const fetchStudents = async (query = searchQuery) => {
    try {
      const response = await getStudents(query);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCreate = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        fetchStudents(searchQuery);
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingStudent(null);
    fetchStudents(searchQuery);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchStudents(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchStudents('');
  };

  return (
    <div className="app">
      <h1>Student Management System</h1>
      
      {showForm ? (
        <StudentForm
          student={editingStudent}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <div className="controls-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search students by name, email, or grade..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={handleClearSearch} title="Clear search">
                  &times;
                </button>
              )}
            </div>
            <button className="add-button" onClick={handleCreate}>
              Add New Student
            </button>
          </div>
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

export default App
