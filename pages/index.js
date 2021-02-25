import Head from "next/head";
import Navbar from "../components/Navbar";
import Map from "../components/Charts";
import Air from "../components/Air";
import Plant from "../components/Plant";
import Donate from "../components/Donate";
import Contact from "../components/Contact";
import OpenSource from "../components/OpenSource";
const csvToJson = (str, headerList, quotechar = '"', delimiter = ",") => {
  const cutlast = (_, i, a) => i < a.length - 1;
  // const regex = /(?:[\t ]?)+("+)?(.*?)\1(?:[\t ]?)+(?:,|$)/gm; // no variable chars
  const regex = new RegExp(
    `(?:[\\t ]?)+(${quotechar}+)?(.*?)\\1(?:[\\t ]?)+(?:${delimiter}|$)`,
    "gm"
  );
  const lines = str.toString().split("\n");
  const headers =
    headerList || lines.splice(0, 1)[0].match(regex).filter(cutlast);

  const list = [];

  for (const line of lines) {
    const val = {};
    for (const [i, m] of [...line.matchAll(regex)].filter(cutlast).entries()) {
      // Attempt to convert to Number if possible, also use null if blank
      val[headers[i]] = m[2].length > 0 ? Number(m[2]) || m[2] : null;
    }
    list.push(val);
  }

  return list;
};
export  async function getServerSideProps() {
  const headers = new Headers();
    headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');
  const response = await fetch(`${process.env.DOMAIN}/forest-area-km.csv`,{headers});
  const result = await response.text(); // raw array
  const results = csvToJson(result); // object with { data, errors, meta }
  const rows = results; // array of objects
 
  return {
    props: {countries:rows}, // will be passed to the page component as props
  }
}

export default function Home({countries}) {
  return (
    <div>
      <Head>
        <title>Let's Plant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Map countries={countries}/>
      <Air />
      <Plant />
      <Donate />
      <OpenSource />
      <Contact />
     
    </div>
  );
}
