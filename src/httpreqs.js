const dummyHttpRequests = [
  {
    id: 1,
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  },
  {
    id: 2,
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  },

  {
    id: 6,
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/users',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      name: 'Jane Doe',
      username: 'jane',
      email: 'jane@example.com',
    },
  },
  {
    id: 7,
    method: 'GET',
    url: `https://ecombackend-303e.onrender.com/admin/Fashion/Women's%20Clothing`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWYwMjliNTA3NTg5NzUxNTUxZTUyMzAiLCJpYXQiOjE3MTExMjI0NjIsImV4cCI6MTcxMTIwODg2Mn0.Thk2piP75RA_He-Pikc-2Tp3uvKg4Bna2glPdVy3EfA'
    },
  },
];


export default dummyHttpRequests;
