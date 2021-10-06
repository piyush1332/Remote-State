import React, { useEffect, useState } from 'react';
import { timeCalculatorHour } from '../pages/dashboard/DashboardHelper';
import 'font-awesome/css/font-awesome.min.css';

function TruckListing({truckList}) {
    const [ searchFilter , setSearchFilter ] = useState('');
    const [ filteredArray , setFilteredArray ] = useState([]);
    const [ truckData , setTruckData ] = useState([]);

    useEffect(()=>{
        setTruckData(truckList);
    },[truckList]);
    
    const convertHoursToDays = (hours) => {
        if(hours >= 12) {
            let dayCount = parseInt(hours / 12);
            return dayCount + ' d';
        } else {
            return hours + ' hr';
        } 
    }

    const truckStatus = (value , current) => {
        let truckState = timeCalculatorHour(value.lastRunningState.stopStartTime);
        if(current === true) return  truckState.hours != 0 ? convertHoursToDays(truckState.hours) : (truckState.minutes != 0 ? truckState.minutes + ' min' : (truckState.seconds != 0 ? truckState.seconds + ' sec' : null) );
        if(value.lastRunningState.stopNotficationSent === 1) {
            return `Stoped scince last ${ truckState.hours != 0 ? convertHoursToDays(truckState.hours) : (truckState.minutes != 0 ? truckState.minutes + ' min' : (truckState.seconds != 0 ? truckState.seconds + ' sec' : null) ) }`;
        } else {
            return `Running scince last ${ truckState.hours != 0 ? convertHoursToDays(truckState.hours) : (truckState.minutes != 0 ? truckState.minutes + ' min' : (truckState.seconds != 0 ? truckState.seconds + ' sec' : null) ) }`;
        }
    }

    const handleSearchBar = (input) => {
        setSearchFilter(input);
        let filtered_array = [];
        filtered_array = truckData.filter((value) => value.truckNumber.toLowerCase().includes(input.toLowerCase()));
        setFilteredArray(filtered_array.length === 0 ? [] : filtered_array);
    }

    return (
        <>
            <input type="text" placeholder="Search Trucks" value={searchFilter} onChange={ (e) => handleSearchBar(e.target.value) } />
            {(searchFilter.length === 0 ? truckData : filteredArray).map((value , index) => {
                return (
                    <div className="truck_card_list" key={`truck-list-sidepanel-${index}`} style={{ backgroundColor: value.lastRunningState.stopNotficationSent === 1 && timeCalculatorHour(value.lastRunningState.stopStartTime).hours >= 4 && value.lastWaypoint.ignitionOn === false ? 'red' : ''}}>
                        <div className="truck_card_header flex">
                            <div className="truck_list_number"> {value.truckNumber} <i className="fa fa-truck"></i> </div>
                            <div className="truck_list_last_creation"> { truckStatus(value , true) } </div>
                        </div>
                        <div className="truck_card_footer flex">
                            <div className="truck_running_last_running"> { truckStatus(value) } </div>
                            <div className="truck_running_speed"> { value.lastWaypoint.speed !== 0 ? value.lastWaypoint.speed.toFixed(2) + ' k/h' : null } </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default TruckListing;