import React, { useRef, useEffect, useState, useMemo, forwardRef } from "react";
import sendEvent, { sendQuery } from "./utils/send_event";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { easeCubic } from "d3-ease";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { VictoryPie, VictoryTooltip, VictoryLabel } from "victory";
import {
  ViewColumn,
  Search,
  SaveAlt,
  Remove,
  LastPage,
  FirstPage,
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
import MaterialTable from "material-table";



export default function Map({ mapToken,accountId }) {
  const getTooltipText = function ({ datum }) {
    const { x, y } = datum;

    return `${x} donate ${y} plants`;
  };
  const STYLE = {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [
          "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "osm-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 19,
      },
    ],
  };
  const [error, setError] = useState({ state: false, message: "" });
  const [eventName, setEventName] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [listEvent, setListEvent] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [marker, setMarker] = useState([]);
  const [_marker, setMarker_] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const [listDonate, setListDonate] = useState([]);
  const [planted, setPlanted] = useState(0);
  async function checkAgain(){
    const graphql = await sendQuery(`{
      actor {
        account(id: ${accountId}) {
          nrql(query: "SELECT * FROM PlantEvent SINCE 24 HOUR AGO") {
            results
          }
        }
      }
    }
    `);
    setListEvent(graphql);
    const donate = await sendQuery(`{
      actor {
        account(id: ${accountId}) {
          nrql(query: "SELECT count(*) FROM DonateEvent FACET name SINCE 24 HOUR AGO") {
            results
          }
        }
      }
    }
    `);
    setListDonate(donate);
    const plants = await sendQuery(`{
      actor {
        account(id: ${accountId}) {
          nrql(query: "SELECT count(*) FROM DonateEvent SINCE 24 HOUR AGO") {
            results
          }
        }
      }
    }
    `);
    setPlanted(plants[0].count.toString());
  }
  useEffect(async () => {
    const graphql = await sendQuery(`{
      actor {
        account(id: ${accountId}) {
          nrql(query: "SELECT * FROM PlantEvent SINCE 24 HOUR AGO") {
            results
          }
        }
      }
    }
    `);
    setListEvent(graphql);
    const donate = await sendQuery(`{
      actor {
        account(id: ${accountId}) {
          nrql(query: "SELECT count(*) FROM DonateEvent FACET name SINCE 24 HOUR AGO") {
            results
          }
        }
      }
    }
    `);
    setListDonate(donate);
    const plants = await sendQuery(`{
      actor {
        account(id: ${accountId}) {
          nrql(query: "SELECT count(*) FROM DonateEvent SINCE 24 HOUR AGO") {
            results
          }
        }
      }
    }
    `);
    setPlanted(plants[0].count.toString());
    var geocoder = new MapboxGeocoder({
      accessToken: mapToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });

    geocoder.addTo("#geocoder");
    geocoder.on("result", (a) => {
      const { center, place_name } = a.result;
      console.log(a.result);
      if (center && center.length > 1) {
        setViewport({
          ...viewport,
          longitude: center[0],
          latitude: center[1],
          zoom: 14,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic,
        });
        setMarker_({ coordinates: center, name: place_name });
      }
    });
  }, []);
  function closeMessage() {
    setError({ state: false, message: error.message });
  }

  const [popup, togglePopup] = useState(false);
  const [popup2, togglePopup2] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [popupName, setPopupName] = useState("");
  const CustomPopup = (name) => {
    togglePopup(!popup);
    setPopupName(name);
  };
  function seeDetails(item){
    setCoordinates(JSON.parse(item.coordinates))
    togglePopup2(!popup2);
setPopupName(item.placeName)

setViewport({
  ...viewport,
  longitude: JSON.parse(item.coordinates)[0],
  latitude: JSON.parse(item.coordinates)[1],
  zoom: 14,
  transitionDuration: 5000,
  transitionInterpolator: new FlyToInterpolator(),
  transitionEasing: easeCubic,
});
  }
  const markers = useMemo(
    () =>
    listEvent.filter(({coordinates})=>coordinates).map((item, index) => (
        <Marker onClick={()=>seeDetails(item)} key={index} longitude={JSON.parse(item.coordinates)[0]} latitude={JSON.parse(item.coordinates)[1]}>
          <img width={50} height={50} src="Tea_plant.png" />
        </Marker>
      )),
    [listEvent]
  );
  async function sendEventNow() {
    setDisabled(true);
  
    if (
      eventName.trim() === "" ||
      eventDetail.trim() === "" ||
      !_marker?.coordinates ||
      startDate === null
    ) {
      setError({
        state: true,
        message: "Please fill all the field",
      });
      setDisabled(false);
      return;
    }

    const res = await sendEvent([
      {
        eventType: "PlantEvent",
        eventDetail,
        eventName,
        dates: startDate,
        coordinates: JSON.stringify(_marker.coordinates),
        placeName: _marker.name,
      },
    ]);
    if (!res.success) {
      setDisabled(false);
      setError({ state: true, message: "there is an error sending message" });
      return;
    } else {
      checkAgain()
      setDisabled(false);
      setEventName("");
      setEventDetail("");
      closeMessage();
    }
  }
 
  const [donate, setDonate] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState({ state: false, message: "" });
  function closeSuccess() {
    setSuccess({ state: false, message: "" });
  }

  async function sendDonate() {
    setDisabled(true);
    if (
     donate.trim() === "" 
    ) {
      alert("please fill your name")
      setDisabled(false);
      return;
    }

    const res = await sendEvent([
      {
        eventType: "DonateEvent",
        name:donate,
        location
      },
    ]);
    if (!res.success) {
      setDisabled(false);
      alert("error")
      return;
    } else {
      checkAgain()
      setDisabled(false);
      setDonate("");
      setLocation("");
      window.location.href="#list_event"
      setSuccess({state:true,message:"Thank you for donating plants,tree will be planted with your name to it"});
    }
  }
  return (
    <>
      <section
        id="event"
        className="relative py-16 bg-white min-w-screen animation-fade animation-delay"
      >
        <div className="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
          <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
            Plant Event
          </h3>
          <div className="flex flex-col text-center w-full mb-3 mt-5">
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              This is all of the place that you can go to plant some plants
            </p>
          </div>

          <section className="text-gray-600 body-font relative">
            <div>
              <ReactMapGL
                style={{ position: "absolute", top: 0, bottom: 0 }}
                {...viewport}
                mapStyle={STYLE}
                mapboxApiAccessToken={mapToken}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
              >
                {markers}
                {_marker.coordinates && (
                  <Marker
                    longitude={_marker.coordinates[0]}
                    latitude={_marker.coordinates[1]}
                  >
                    <img
                      width={50}
                      style={{ marginRight: 20 }}
                      onClick={() => CustomPopup(_marker.name)}
                      src="Tea_plant.png"
                    />
                  </Marker>
                )}
                {popup && (
                  <Popup
                    latitude={_marker.coordinates[1]}
                    longitude={_marker.coordinates[0]}
                    onClose={() => togglePopup(false)}
                    closeButton={true}
                    closeOnClick={true}
                    offsetTop={-10}
                    offsetLeft={25}
                  >
                    <p>{popupName}</p>
                  </Popup>
                )}
                 {popup2 && (
                  <Popup
                    latitude={coordinates[1]}
                    longitude={coordinates[0]}
                    onClose={() => togglePopup2(false)}
                    closeButton={true}
                    closeOnClick={true}
                    offsetTop={-10}
                    offsetLeft={25}
                  >
                    <p>{popupName}</p>
                  </Popup>
                )}
              </ReactMapGL>
            </div>
            <div className="container px-5 py-24 mx-auto flex">
              <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Add Event
                </h2>
                <p className="leading-relaxed mb-5 text-gray-600">
                  Add name, location, and detail of the event
                </p>
                <div
                  className="alert alert-error"
                  style={{ display: error.state ? "block" : "none" }}
                >
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
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    disabled={disabled}
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Date
                  </label>
                  <div>
                    <SingleDatePicker
                      date={startDate} // momentPropTypes.momentObj or null
                      onDateChange={(date) => setStartDate(date)} // PropTypes.func.isRequired
                      focused={focusedInput} // PropTypes.bool
                      onFocusChange={({ focused }) => setFocusedInput(focused)} // PropTypes.func.isRequired
                      id="your_unique_id" // PropTypes.string.isRequired,
                    />
                  </div>
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Location
                  </label>
                  <div id="geocoder"></div>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Event detail
                  </label>
                  <textarea
                    disabled={disabled}
                    value={eventDetail}
                    onChange={(e) => setEventDetail(e.target.value)}
                    id="message"
                    name="message"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <button
                  disabled={disabled}
                  onClick={sendEventNow}
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Add
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  this is just a demo event nothing in here is actual event
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="container px-5 py-24 mx-auto " id="list_event">
          <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
            List Of Event
          </h3>
          <div className="flex flex-col text-center w-full mb-3 mt-5">
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              List of all event you can go to or just donate
            </p>
          </div>
          <div
            class="alert alert-success"
            style={{ display: success.state ? "block" : "none" }}
          >
            <div class="flex-1">
              <label class="mx-3">{success.message}</label>
            </div>
            <div class="flex-none">
              <button class="btn btn-sm btn-ghost mr-2" onClick={closeSuccess}>
               Close
              </button>
            </div>
          </div>
         
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: "Event Name", field: "eventName" },
              { title: "Event Detail", field: "eventDetail" },
              { title: "Date", field: "dates",render: (rowData) => <>{rowData.dates.split("T")[0]}</> },
              { title: "Place Name", field: "placeName" },
              {
                title: "Go To",
                render: (rowData) => <a onClick={()=>{seeDetails(rowData);window.location.href="#event"}} class="btn btn-primary">LOCATION</a>,
              },
              {
                title: "Donate",
                render: (rowData) => (
                  <a href="#my-modal" onClick={()=>setLocation(rowData.placeName)} class="btn btn-primary">
                    DONATE
                  </a>
                ),
              },
            ]}
            data={listEvent.filter(({coordinates})=>coordinates)}
            title=""
          />
        </div>
        <div id="my-modal" class="modal">
          <div class="modal-box">
            <label className="label items-center justify-center flex-col">
              <span className="label-text">Type your name</span>
            </label>
            <input
            disabled={disabled}
            value={donate}
            onChange={e=>setDonate(e.target.value)}
              type="text"
              id="full-name"
              name="full-name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <div class="modal-action">
              <a disabled={disabled} onClick={sendDonate} class="btn btn-primary">
                Accept
              </a>
              <a disabled={disabled} href="#list_event" class="btn">
                Close
              </a>
            </div>
          </div>
        </div>
      </section>
      <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
        Event Statistic
      </h3>

      <div class="container px-5 py-24 mx-auto text-center flex">
        <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
          <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
              Total Trees Planted In 24 Hours
            </h2>
            <img src="Tea_plant.png"/>
            <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
            {planted}
            </h1>
          </div>
        </div>
        <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
          <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
              Most Plants Donations By Name In 24 Hours
            </h2>

            <VictoryPie
              labelComponent={<VictoryTooltip flyoutHeight={60} />}
              labels={({ datum }) => `${datum.name}  ${datum.count}`}
              x="name"
              y="count"
              data={listDonate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
