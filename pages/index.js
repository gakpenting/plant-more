import Head from "next/head";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Air from "../components/Air";
import Plant from "../components/Plant";
import Donate from "../components/Donate";
import Contact from "../components/Contact";
import OpenData from "../components/OpenData";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Let's Plant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Map />
      <Air />
      <Plant />
      <Donate />
      <OpenData />
      <Contact />
     
    </div>
  );
}
