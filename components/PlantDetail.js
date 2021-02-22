import { useState, useEffect } from "react";

export default function PlantDetail({ plant }) {
  const [data, setData] = useState({});
  async function searchPlant() {
    const _data = await (
      await fetch(`/api/plants?plant=${plant}`, {
        method: "GET",
      })
    ).json();
    setData(_data.data);
  }
  useEffect(() => {
    searchPlant();
  }, []);

  return (
    <>
      <div className="text-gray-600 body-font">
        <div className="mx-auto flex px-3 py-24 items-center justify-center flex-col">
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
          <div className="flex flex-wrap -m-4">
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
                  {data.specifications.growth_habit}
                </h1>
              </div>
            </div>
            <div className="p-4 lg:w-30">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-6 pb-4 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Edible
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {data.edible?"yes":"no"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
