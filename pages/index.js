import Head from "next/head";
import Navbar from "../components/Navbar";
import Map from "../components/Charts";
import Air from "../components/Air";
import Plant from "../components/Plant";
import Donate from "../components/Donate";
import Contact from "../components/Contact";
import OpenSource from "../components/OpenSource";
export async function getStaticProps() {
  const country = await (
    await fetch(`https://api.aircheckr.com/territory/countries`, {
      method: "GET",
      headers: {
        "x-access-token": process.env.TOKEN,
      },
    })
  ).json();
  return {
    props: {
      country,
    },
  };
}

export default function Home({country}) {
  return (
    <div>
      <Head>
        <title>Let's Plant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Map />
      <Air country={country}/>
      <Plant />
      <Donate />
      <OpenSource />
      <Contact />
     
    </div>
  );
}
