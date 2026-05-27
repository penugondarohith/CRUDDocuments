import axios from 'axios';

const API_URL = 'http://localhost:3000/api/command';

export const getStudents = async (searchQuery = '') => {
  const filter = searchQuery
    ? {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { grade: { $regex: searchQuery, $options: 'i' } }
        ]
      }
    : {};

  const response = await axios.post(API_URL, {
    command: {
      find: 'students',
      filter,
      sort: { createdAt: -1 }
    }
  });
  return {
    success: true,
    data: response.data.data.cursor.firstBatch
  };
};

export const getStudent = async (id) => {
  const response = await axios.post(API_URL, {
    command: {
      find: 'students',
      filter: { _id: id }
    }
  });
  return {
    success: true,
    data: response.data.data.cursor.firstBatch[0] || null
  };
};

export const createStudent = async (studentData) => {
  const response = await axios.post(API_URL, {
    command: {
      insert: 'students',
      documents: [{
        ...studentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
  });
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await axios.post(API_URL, {
    command: {
      update: 'students',
      updates: [{
        q: { _id: id },
        u: {
          $set: {
            ...studentData,
            updatedAt: new Date().toISOString()
          }
        }
      }]
    }
  });
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.post(API_URL, {
    command: {
      delete: 'students',
      deletes: [{
        q: { _id: id },
        limit: 1
      }]
    }
  });
  return response.data;
};
