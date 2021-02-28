import fetch, { Headers } from "node-fetch";

export default async (req, res) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Api-Key", process.env.USER_KEY);
    const response = await fetch("https://api.newrelic.com/graphql", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: req.body }),
    });
    const json = await response.json();
    res
      .status(200)
      .json(json?.data ? json.data.actor.account.nrql.results : json);
  } catch (e) {
    res.status(200).json({ success: false });
  }
};
