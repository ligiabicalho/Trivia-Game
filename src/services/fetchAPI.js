const fetchApiToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(endpoint);
  const data = await request.json();
  return data.token;
};

export default fetchApiToken;
