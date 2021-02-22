import Head from "next/head";
import { useRouter } from 'next/router'
import PlantDetail from "../components/PlantDetail";
export function getServerSideProps(context){
  return {props:{plant:context.query.plant}}
}
export default function PlantDetails({plant}) {
  const router = useRouter()
  
  console.log(router.query.plant)
  return (
    <div>
      <Head>
        <title>Let's Plant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlantDetail plant={plant}/>
     
     
    </div>
  );
}
