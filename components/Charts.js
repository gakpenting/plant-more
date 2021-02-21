import React from "react";
import ForestChart from "./ForestChart";
import _ from "underscore";
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

export default function Map() {
  const [rows, setRows] = React.useState([]);
  const [country, setCountry] = React.useState([]);
  const [startYear, setStartYear] = React.useState([]);
  const [endYear, setEndYear] = React.useState([]);
  const [pickCountry, setPickCountry] = React.useState([]);
  React.useEffect(() => {
    async function getData() {
      const response = await fetch("/forest-area-km.csv");
      const reader = await response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = csvToJson(csv); // object with { data, errors, meta }
      const rows = results; // array of objects
      setRows(rows);
      const country = _.chain(rows)
        .groupBy("Entity,")
        .map(function (value, key) {
          return {
            country: key,
            year: _.pluck(value, "Year,"),
          };
        })
        .value();
      setCountry(country);
    }
    getData();
  }, []);

  return (
    <>
      <div className="container mx-auto flex py-3 items-center justify-center flex-col">
        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">
          Forest Data Per Year
        </h1>
      </div>
      <div class="container mx-auto flex sm:flex-nowrap flex-wrap items-center justify-center">
        <div class="alert alert-error">
          <div class="flex-1">
            <label class="mx-3">
              Lorem ipsum dolor sit amet, consectetur adip!
            </label>
          </div>
          <div class="flex-none">
            <button class="btn btn-sm btn-ghost mr-2">Close</button>
          </div>
        </div>
      </div>

      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <ForestChart />
          </div>
          <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Search your Country Forest Data
            </h2>
            <p class="leading-relaxed mb-5 text-gray-600">
              Fill in the data below
            </p>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">
                Country
              </label>
              <select
                onChange={handleChange}
                class="select select w-full max-w-xs"
              >
                <option value={""}>Select your country</option>
                {country.map((a) => (
                  <option value={a.country}>{a.country}</option>
                ))}
              </select>
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Start Year
              </label>
              <select class="select select w-full max-w-xs">
                <option value={""}>Select Start Year</option>
                {startYear.map((a) => (
                  <option value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                End Year
              </label>
              <select class="select select w-full max-w-xs">
                <option value={""}>Select End Year</option>
                {endYear.map((a) => (
                  <option value={a}>{a}</option>
                ))}
              </select>
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
