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
  const [pickCountry, setPickCountry] = React.useState("");
  const [pickStartYear, setPickStartYear] = React.useState("");
  const [pickEndYear, setPickEndYear] = React.useState("");
  const [error, setError] = React.useState({ state: false, message: "" });
  const [chartData, setChartData] = React.useState({ year: [], data: [] });
  const [yearBefore, setYearBefore] = React.useState([]);
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
  function handleChange(e) {
    if (e.target.value.trim() === "") {
      setStartYear([]);
      setEndYear([]);
      return;
    }

    const countrySelect = country.filter(
      (a) => a.country === e.target.value
    )[0];

    setStartYear(countrySelect.year);
    setEndYear(countrySelect.year);
    setPickCountry(e.target.value);
  }
  function closeMessage() {
    setError({ state: false, message: error.message });
  }
  function checkData() {
    if (pickEndYear < pickStartYear) {
      setError({
        state: true,
        message: "end year should be bigger than start year",
      });
      return;
    }
    if (pickStartYear > pickEndYear) {
      setError({
        state: true,
        message: "start year should be lower than end year",
      });
      return;
    }
    if (pickCountry === "") {
      setError({ state: true, message: "please select country" });
      return;
    }
    if (pickStartYear === "") {
      setError({ state: true, message: "please select start year" });
      return;
    }
    if (pickEndYear === "") {
      setError({ state: true, message: "please select end year" });
      return;
    }
    setError({ state: false, message: "" });
    const result = rows
      .map((a) => ({
        country: a["Entity,"],
        year: Number(a["Year,"]),
        area: a["Forest area"],
      }))
      .filter(
        (a) =>
          a.country === pickCountry &&
          Number(a.year) >= Number(pickStartYear) &&
          Number(a.year) <= Number(pickEndYear)
      );
    setYearBefore(
      rows
        .map((a) => ({
          country: a["Entity,"],
          year: Number(a["Year,"]),
          area: a["Forest area"],
        }))
        .filter(
          (a) =>
            a.country === pickCountry &&
            Number(a.year) === Number(pickStartYear) - 1
        )
    );
    setChartData({ year: _.pluck(result, "year"), data: result });
    return;
  }
  return (
    <>
      <div
        id="forest-chart"
        className="container mx-auto flex py-3 items-center justify-center flex-col"
      >
        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">
          Forest Data Per Year
        </h1>
      </div>
      <div
        className="container mx-auto flex sm:flex-nowrap flex-wrap items-center justify-center"
        style={{ display: error.state ? "block" : "none" }}
      >
        <div className="alert alert-error">
          <div className="flex-1">
            <label className="mx-3">{error.message}</label>
          </div>
          <div className="flex-none">
            <button
              className="btn btn-sm btn-ghost mr-2"
              onClick={closeMessage}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <ForestChart
              year={chartData.year}
              data={chartData.data}
              yearBefore={yearBefore}
            />
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Search your Country Or Continent Forest Data
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Fill in the data below
            </p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Country or Continent
              </label>
              <select
                onChange={handleChange}
                className="select select w-full max-w-xs"
              >
                <option value={""}>Select your country or continent</option>
                {country.map((a) => (
                  <option key={a.country} value={a.country}>
                    {a.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Start Year
              </label>
              <select
                onChange={(e) => setPickStartYear(e.target.value)}
                className="select select w-full max-w-xs"
              >
                <option value={""}>Select Start Year</option>
                {startYear.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                End Year
              </label>
              <select
                onChange={(e) => setPickEndYear(e.target.value)}
                className="select select w-full max-w-xs"
              >
                <option value={""}>Select End Year</option>
                {endYear.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={checkData}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
