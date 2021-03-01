import { useState, useEffect } from "react";
import sendEvent from "./utils/send_event";
import {Img} from 'react-image'
export default function PlantDetail({ plant }) {
  const [data, setData] = useState({});
  async function searchPlant() {
    try {
      const _data = await (
        await fetch(`/api/plants?plant=${plant}`, {
          method: "GET",
        })
      ).json();
      setData(_data.data);
      sendEvent([
        {
          eventType: "Successful",
          path: `/api/plants?plant=${plant}`,
          form: "plant_detail",
        },
      ]).then((a) => console.log(a));
      sendEvent([
        {
          eventType: "Plant",
          plant: _data.data.common_name,
        },
      ]).then((a) => console.log(a));
    } catch (e) {
      const res = sendEvent([
        {
          eventType: "ErrorEvent",
          path: `/api/plants?plant=${plant}`,
          form: "plant_detail",
          error: e.message,
        },
      ]).then((a) => console.log(a));
    }
  }
  useEffect(() => {
    searchPlant();
  }, []);

  return (
    <>
      <div className="text-gray-600 body-font">
        <div className="container mx-auto flex py-3 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={data.image_url}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {data.common_name}
            </h1>
          </div>
          <div className="container mx-auto flex py-3 items-center justify-center flex-col">
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  RANK
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.rank}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Year Discovered
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.year}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Observations
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.observations}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Growth Habit
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.specifications?.growth_habit}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Edible
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.edible ? "yes" : "no"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Edible Part
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.edible_part !==null ? data?.edible_part?.join(", ") : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Vegetable
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.vegetable ? "yes" : "no"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Distribution Native
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.distribution?.native ? data?.distribution?.native?.join(", ") : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Distribution Introduced
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.distribution?.introduced ? data?.distribution?.introduced?.join(", ") : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Bloom Months
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.growth?.bloom_months ? data?.growth?.bloom_months?.join(", ") : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Days to harvest
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.days_to_harvest ? data?.days_to_harvest : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Growth Rate
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.specifications?.growth_rate !== null ? data?.specifications?.growth_rate : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Toxicity
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.specifications?.toxicity !== null ? data?.specifications?.toxicity : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Maximum Height
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.specifications?.maximum_height?.cm !== null ? data?.specifications?.maximum_height?.cm+" cm" : "no data"}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Average Height
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data?.specifications?.average_height?.cm !== null ? data?.specifications?.average_height?.cm+" cm" : "no data"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
