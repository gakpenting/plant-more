import { useState } from "react";
import plants from "../public/plants.json";
import Autosuggest from "react-autosuggest";
import sendEvent from "./utils/send_event";
export default function Plant() {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestion] = useState([]);
  const [plant, setPlant] = useState({});
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : plants.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const getSuggestionValue = (suggestion) => {
    setPlant(suggestion);
    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div className="bg-gray-100 rounded flex p-4 h-full">
      <span className="title-font font-medium">{suggestion.name}</span>
    </div>
  );

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value: a }) => {
    setSuggestion(getSuggestions(a));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };
  const inputProps = {
    placeholder: "Country Or Area",
    value: value ? value : "",
    onChange,
  };
  const [listPlants, setListPlants] = useState([]);
  async function searchPlant() {
    try {
      setDisabled(true);
      const data = await (
        await fetch(`/api/plants?slug=${plant.slug}`, {
          method: "GET",
        })
      ).json();
      console.log(data);
      setListPlants(data);
      sendEvent([
        {
          eventType: "Successful",
          path: `/api/plants?slug=${plant.slug}`,
          form: "plant",
        },
      ]).then((a) => console.log(a));
      sendEvent([
        {
          eventType: "PlantSearch",
          country: plant.name,
        },
      ]).then((a) => console.log(a));
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
      const res = sendEvent([
        {
          eventType: "ErrorEvent",
          path: `/api/plants?slug=${plant.slug}`,
          form: "plant",
          error: e.message,
        },
      ]).then((a) => console.log(a));
      console.log(e);
    }
  }
  async function paginationPlant(url) {
    setDisabled(true);
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const data = await (
        await fetch(`/api/plants`, {
          method: "POST",
          headers,
          body: JSON.stringify(url),
        })
      ).json();
      console.log(data);
      setListPlants(data);
      setDisabled(false);
      sendEvent([
        {
          eventType: "Successful",
          path: `/api/plants`,
          form: "plant",
        },
      ]).then((a) => console.log(a));
      sendEvent([
        {
          eventType: "PlantSearch",
          country: plant.name,
        },
      ]).then((a) => console.log(a));
    } catch (e) {
      setDisabled(false);
      const res = sendEvent([
        {
          eventType: "ErrorEvent",
          path: `/api/plants`,
          form: "plant",
          error: e.message,
        },
      ]).then((a) => console.log(a));
      console.log(e);
    }
  }
  return (
    <>
      <div
        id="plants"
        className="container mx-auto flex py-3 items-center justify-center flex-col"
      >
        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">
          Type Of Plants You Can Plant
        </h1>
        <div className="form-control">
          <label className="label items-center justify-center flex-col">
            <span className="label-text">Type your country or area</span>
          </label>
          <Autosuggest
            className=""
            theme={{
              input: "input input-bordered w-full",
              suggestion: "items-center justify-center flex-col",
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <button
          disabled={disabled}
          onClick={searchPlant}
          className="flex mx-auto mt-2 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Search
        </button>
      </div>
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {listPlants?.data?.map((a) => (
              <div key={a.slug} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={a.image_url}
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {a.scientific_name}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {a.common_name}
                    </h1>
                    <a
                      href={`/plant_detail?plant=${a.slug}`}
                      target="_blank"
                      className="cursor-pointer text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div className="container mx-auto flex py-3 items-center justify-center flex-col">
              <div
                className="btn-group "
                style={{
                  visibility:
                    listPlants?.links?.next || listPlants?.links?.prev
                      ? "visible"
                      : "hidden",
                }}
              >
                <button
                  onClick={() => paginationPlant(listPlants?.links?.prev)}
                  className="btn btn-outline btn-wide"
                  disabled={listPlants?.links?.prev && !disabled ? false : true}
                >
                  Previous Page
                </button>
                <button
                  onClick={() => paginationPlant(listPlants?.links?.next)}
                  className="btn btn-outline btn-wide"
                  disabled={listPlants?.links?.next && !disabled ? false : true}
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
