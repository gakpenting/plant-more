// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetch = require('node-fetch');


export default async (req, res) => {
  let json=[];
  if(req.query.slug){
     json = await (
      await fetch(
        `https://trefle.io/api/v1/distributions/${req.query.slug}/plants?token=${process.env.PLANT_TOKEN}`,
        {
          method: "GET",
        }
      )
    ).json();
  }else{
    json = await (
      await fetch(
        `https://trefle.io/api/v1/species/${req.query.plant}?token=${process.env.PLANT_TOKEN}`,
        {
          method: "GET",
        }
      )
    ).json();
  }
  
  
  res.status(200).json(json)
}
