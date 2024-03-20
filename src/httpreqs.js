const dummyHttpRequests = [
    {
      id: 1,
      method: 'GET',
      url: 'https://api.example.com/users',
      headers: {
        Authorization: 'Bearer your-access-token',
        'Content-Type': 'application/json',
      },
      body: null,
    },
    {
      id: 2,
      method: 'POST',
      url: 'https://api.example.com/posts',
      headers: {
        Authorization: 'Bearer your-access-token',
        'Content-Type': 'application/json',
      },
      body: {
        title: 'Sample Post',
        body: 'This is a sample post body.',
        userId: 1,
      },
    },
    {
      id: 3,
      method: 'GET',
      url: 'https://api.example.com/posts/1',
      headers: {
        Authorization: 'Bearer your-access-token',
        'Content-Type': 'application/json',
      },
      body: {
        id: 1,
        title: 'Updated Post',
        body: 'This post has been updated.',
        userId: 1,
      },
    },
    {
      id: 4,
      method: 'GET',
      url: 'https://api.example.com/posts/1',
      headers: {
        Authorization: 'Bearer your-access-token',
      },
      body: null,
    },
    {
      id: 5,
      method: 'GET',
      url: 'https://api.example.com/users?filter=active&sortBy=name&limit=10&page=1&search=John%20Doe',
      headers: {
        Authorization: 'Bearer your-access-token',
        'Content-Type': 'application/json',
      },
      body: null,
    },
    {
      id: 6,
      method: 'POST',
      url: 'https://api.example.com/posts/create?userId=1&category=tech&tag=javascript',
      headers: {
        Authorization: 'Bearer your-access-token',
        'Content-Type': 'application/json',
      },
      body: {
        title: 'Sample Post',
        body: 'This is a sample post body.',
        userId: 1,
      },
    }
  ];
  
  export default dummyHttpRequests;
  