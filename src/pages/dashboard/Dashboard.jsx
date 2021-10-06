import React, { useEffect, useState } from 'react';
import TruckFilters from '../../components/TruckFilters';
import TruckListing from '../../components/TruckListing';
import MapContainer from '../../components/MapContainer';
import { getTruckData } from './DashboardNetwork';
import { findFilterCounts } from './DashboardHelper';
import './Dashboard.css';

function Dashboard() {
    const [truckList , setTruckList] = useState([]);
    const [ sortedTruck , setSortedTruck ] = useState({
        totalTruck: [],
        runningTruck: [],
        stopedTruck: [],
        idleTruck: [],
        errorTruck: []
    });

    const initalizeData = async () => {
        let response = await getTruckData();
        setTruckList(response.data);
        let filter_count = findFilterCounts(response.data);
        setSortedTruck(filter_count);
    }

    const filterTrucks = (filterName) => {
        switch(filterName) {
            case 'runningTruck':
                setTruckList(sortedTruck.runningTruck);
                break;
            case 'stopedTruck':
                setTruckList(sortedTruck.stopedTruck);
                break;
            case 'idleTruck':
                setTruckList(sortedTruck.idleTruck);
                break;
            case 'errorTruck':
                setTruckList(sortedTruck.errorTruck);
                break;
            default:
                setTruckList(sortedTruck.totalTruck);
        }
    }

    useEffect(()=>{
        initalizeData();
    },[]);

    return (
        <>
            <header className="dashboard_header_holder">
                <span className="truck_filter_holder">
                    <TruckFilters filterTrucks={filterTrucks} setTruckList={setTruckList} truckList={truckList} sortedTruck={sortedTruck} setSortedTruck={setSortedTruck} />
                </span>
            </header>
            <div className="dashboard_body_holder">
                <div className="side_panel_holder">
                    <TruckListing truckList={truckList} />
                </div>
                <div className="map_container_holder">
                    <MapContainer isMarkerShown truckList={truckList} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;