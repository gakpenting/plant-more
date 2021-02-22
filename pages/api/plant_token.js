// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetch = require('node-fetch');

// The parameters for our POST request
const params = {
  origin: process.env.DOMAIN,
  token: process.env.PLANT_TOKEN
}
export default async (req, res) => {
  const response = await fetch(
    'https://trefle.io/api/auth/claim', {
      method: 'post',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    });
  const json = await response.json();
  
  res.status(200).json(json)
}
