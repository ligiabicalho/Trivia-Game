export const fetchApiToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(endpoint);
  const data = await request.json();
  return data.token;
};

export const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&encode=url3986&token=${token}`;
  const request = await fetch(url);
  const data = await request.json();
  return data;
};
