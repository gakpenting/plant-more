import { useState } from "react";

export default function Air() {
  const [airData, setAirData] = useState({ status: false });
  const [checked, setChecked] = useState(false);
  async function checkAirQuality() {
    let position;
    if (navigator.geolocation) {
      position = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition((pos) => res(pos))
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    const data = await (
      await fetch(
        `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${process.env.TOKEN2}&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information&&metadata=true`,
        {
          method: "GET",
        }
      )
    ).json();
setChecked(true)
    setAirData(data);
  }

  return (
    <>
      <section id="air" className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Check Air Quality In Your Country
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              By checking your air quality you can now consider what's best for
              your health
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
            <button
              onClick={checkAirQuality}
              className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Check Now
            </button>
            <div style={{display:checked?"block":"none"}}>
            <div className="my-5">Date Recorded:</div>
            <div>
              <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                {airData?.data?.datetime.replace("T", " ").replace("Z", "")}
              </span>
            </div>
            <div className="my-5">Air Quality:</div>
            <div>
              <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                {airData?.data?.indexes?.baqi?.category}
              </span>
            </div>
            <div className="my-5">Location:</div>
            <div>
              <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                {airData?.metadata?.location?.country}
              </span>
            </div>
            </div>
          </div>
<div style={{display:checked?"block":"none"}}>
          <section class="text-gray-600 body-font">
            <div class="container px-5 mx-auto">
              <div class="flex flex-col text-center w-full mb-2">
                <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                  Pollutants
                </h1>
              </div>
              <div class="flex flex-wrap -m-4">
                {airData?.data?.pollutants
                  ? Object.keys(airData?.data?.pollutants).map((a) => (
                      <div class="p-4 md:w-1/3">
                        <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                          <div class="flex items-center mb-3">
                            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-5 h-5"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                              </svg>
                            </div>
                            <h2 class="text-gray-900 text-lg title-font font-medium">
                              {airData?.data?.pollutants[a].display_name}
                            </h2>
                          </div>
                          <div class="flex-grow">
                            <p class="leading-relaxed text-base">
                              <b>Contentration : </b>
                              {
                                airData?.data?.pollutants[a].concentration.value
                              }{" "}
                              {airData?.data?.pollutants[a].concentration.units}
                            </p>
                            <p class="leading-relaxed text-base">
                              <b>Category : </b>{" "}
                              {
                                airData?.data?.pollutants[a]?.aqi_information
                                  ?.baqi?.category
                              }
                            </p>
                            <p class="leading-relaxed text-base">
                              <b>Full Name : </b>
                              {airData?.data?.pollutants[a]?.full_name}
                            </p>
                            <p class="leading-relaxed text-base">
                              <b>Source : </b>
                              {
                                airData?.data?.pollutants[a]
                                  ?.sources_and_effects?.sources
                              }
                            </p>
                            <p class="leading-relaxed text-base">
                              <b>Effects : </b>
                              {
                                airData?.data?.pollutants[a]
                                  ?.sources_and_effects?.effects
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </section>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div class="flex flex-col text-center w-full mb-2 mt-2">
              <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Health Recommendations
              </h1>
            </div>
            {airData?.data?.health_recommendations
              ? Object.keys(airData?.data?.health_recommendations).map((a) => (
                  <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        {a.replace("_", " ")}
                      </h2>
                      <p className="leading-relaxed text-base">
                        {airData?.data?.health_recommendations[a]}
                      </p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          </div>     
        </div>
      </section>
    </>
  );
}
