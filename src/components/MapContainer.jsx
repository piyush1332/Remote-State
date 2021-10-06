import React, { useEffect , useState } from 'react';
import { timeCalculatorHour } from '../pages/dashboard/DashboardHelper';
import './../pages/dashboard/Dashboard.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

function MapContainer({truckList}) {
    const [ truckData , setTruckData ] = useState([]);

    useEffect(()=>{
        setTruckData(truckList);
    },[truckList]);

    const defaultCenter = truckList.length !== 0 ? {lat: truckList[0].lastRunningState.lat , lng: truckList[0].lastRunningState.lng}  : { lat: -30.33 , lng: 150.644 } ;
    
    const identifyMarkerColor = (value) => {
        let result = timeCalculatorHour(value.lastRunningState.stopStartTime);
        let hours = result.hours;
        if(value.lastRunningState.stopNotficationSent === 0) return'green';
        else if(value.lastRunningState.stopNotficationSent === 1 && value.lastWaypoint.ignitionOn === false && hours < 4) return 'blue';
        else if(value.lastRunningState.stopNotficationSent === 1 && value.lastWaypoint.ignitionOn === true) return 'yellow';
        else if(value.lastRunningState.stopNotficationSent === 1 && value.lastWaypoint.ignitionOn === false && hours >= 4) return 'red';
    }

    const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={defaultCenter}
                id="map-container"
            >
                {props.isMarkerShown && truckData.map((value,index) => {
                    return <Marker 
                        key={'marker'+index} 
                        position={{ lat: value.lastRunningState.lat, lng: value.lastRunningState.lng }} 
                        icon={"http://maps.google.com/mapfiles/ms/icons/"+ identifyMarkerColor(value) +".png"}
                    />
                })}
            </GoogleMap>
        )
    }));

    return (
        <>
            <MyMapComponent 
                isMarkerShown
                googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyBy4F5_W4cqXjbXq3eu5rTk9SpMTonZKlI&callback=initMap"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </>
    )
}

export default MapContainer;
// http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places