import React , { useState } from 'react';
import CustomMultiSelect from './CustomMultiSelect';

function TruckFilters({ filterTrucks , setTruckList , truckList , setSortedTruck , sortedTruck }) {
    const [ activeTab , setActiveTab ] = useState('totalTruck');
    
    return (
        <>
            <div className="truck_filter">
                <span onClick={() => { filterTrucks('totalTruck'); setActiveTab('totalTruck'); }} style={{ backgroundColor: activeTab === 'totalTruck' ? '#eee' : '' }}>
                    <div> Total Trucks </div>
                    <h2> { sortedTruck.totalTruck.length } </h2> 
                </span>
                <span onClick={() => { filterTrucks('runningTruck'); setActiveTab('runningTruck'); }} style={{ backgroundColor: activeTab === 'runningTruck' ? '#eee' : '' }}>
                    <div> Running Trucks </div>
                    <h2> { sortedTruck.runningTruck.length } </h2> 
                </span>
                <span onClick={() => { filterTrucks('stopedTruck'); setActiveTab('stopedTruck'); }} style={{ backgroundColor: activeTab === 'stopedTruck' ? '#eee' : '' }}>
                    <div> Stopped Trucks </div>
                    <h2> { sortedTruck.stopedTruck.length } </h2> 
                </span>
                <span onClick={() => { filterTrucks('idleTruck'); setActiveTab('idleTruck'); }} style={{ backgroundColor: activeTab === 'idleTruck' ? '#eee' : '' }}>
                    <div> Idle Trucks </div>
                    <h2> { sortedTruck.idleTruck.length } </h2> 
                </span>
                <span onClick={() => { filterTrucks('errorTruck'); setActiveTab('errorTruck'); }} style={{ backgroundColor: activeTab === 'errorTruck' ? '#eee' : '' }}>
                    <div> Error Trucks </div>
                    <h2> { sortedTruck.errorTruck.length } </h2> 
                </span>
                <span className="custom_select_area">
                    <CustomMultiSelect setTruckList={setTruckList} setSortedTruck={setSortedTruck} sortedTruck={sortedTruck} filterTrucks={filterTrucks} setActiveTab={setActiveTab} />
                </span>
            </div>
        </>
    )
}

export default TruckFilters;