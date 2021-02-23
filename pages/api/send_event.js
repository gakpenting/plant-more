import fetch, { Headers } from "node-fetch";

export default async (req, res) => {
  try{
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Insert-Key", process.env.KEY);
    const response = await fetch(process.env.ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req.body),
    });
    const json = await response.json();
    res.status(200).json(json);
  }catch(e){
    res.status(200).json({success:false});
  }
  
};
