import Head from "next/head";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Air from "../components/Air";
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
    </div>
  );
}
