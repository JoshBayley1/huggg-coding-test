import {useState, useEffect} from 'react';
import {getClientData, getMapData} from "../js/utils.js"
//import {getClientData, disableScroll, enableScroll} from "../js/utils.js"
import React from 'react';
import $ from 'jquery';
import StoreMap from "../components/StoreMap.js";

const clientList = [
    "a9ebeb9a-8d0b-41f6-9123-cf12dc1c8fae", 
    "a5b5876e-ad65-4260-8c3d-64fe6cb57bb3", 
    "9fd7ed19-1dbf-11ea-b97e-02c6bf374af0", 
    "700557f9-b39a-415c-ac8b-be66e825ef8d"
]

const tiles = "61.091,-11.042:49.655,2.104"

function panelToggle(id) {
    if ($(id).is(":hidden")) {
        $(id).removeClass("hidden");
        $("#background-fade").removeClass("hidden");
        //disableScroll();
    }
    else {
        $(id).addClass("hidden");
        $("#background-fade").addClass("hidden");
        //enableScroll();
    }
}

const ClientPanel = (props) => {
    return (
        <div id={props.id} key={`panel`} className="client-data-panel hidden">
            <button onClick={() => panelToggle("#" + props.id)} className="exit-button">X</button>
            <h4 key={`panel_header`}>{props.name}</h4>
            <p key={`desc`}>{props.desc}</p>
            <p key={`url`}>Click <a href={props.url} target="_blank">here</a> for more information at the company website</p>
            <div key={`map-container`} className='map-container'>
                <StoreMap key={`map`} stores={props.storeData} mapData={props.mapData}></StoreMap>
            </div>
        </div>
    );
}

const ClientData = (props) => {
    const [data, setData] = useState(null);
    const [mapData, setMapData] = useState(null);
    useEffect(() => {
        getClientData(clientList, tiles)
        .then((response) => response.data)
        .then(setData)
        .then(() => {
            getMapData(tiles)
            .then((response) => response.data[0].pins)
            .then(setMapData);
        });

    }, []);
    if (data && mapData) {
        return (
            data.map((client) =>
            <React.Fragment key={client.id}>   
                <div key={`wrap`} className="logo-wrapper" onClick={() => panelToggle("#" + client.id)}>
                    <h3 key={`main_header`}>{client.name}</h3>
                    <img key={`logo`} src={client.logo_url} alt="Company logo not found"></img>
                </div>
                <ClientPanel key={"panel"} id={client.id} name ={client.name} desc ={client.default_location_description_markdown} url={client.website} storeData={client.stores} mapData={mapData}/>
            </React.Fragment>
            )
        );
    }
    return <p>Awaiting Data...</p>
}

const Home = () => {
    return (
        <>   
            <div id="background-fade" className="background-fade hidden"></div> 
            <div className="home-container">
                <h1 className="main-title">Shops</h1>
                <div className="client-container">
                <ClientData></ClientData>
                </div>
            </div>
        </>
    );
  }
  
  export default Home;
  