const timeCalculatorHour = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let result = { hours, minutes, seconds };
    return result;
}

const findFilterCounts = (response) => {
    let running_truck = [];
    let stoped_truck = [];
    let idle_truck = [];
    let error_truck = [];
    let total_truck = [];
    response.map((value)=>{
        total_truck.push(value);
        let result = timeCalculatorHour(value.lastRunningState.stopStartTime);
        let hours = result.hours;
        if(value.lastRunningState.stopNotficationSent === 0) running_truck.push(value);
        else if(value.lastRunningState.stopNotficationSent === 1 && value.lastWaypoint.ignitionOn === false && hours < 4) stoped_truck.push(value);
        else if(value.lastRunningState.stopNotficationSent === 1 && value.lastWaypoint.ignitionOn === true) idle_truck.push(value);
        else if(value.lastRunningState.stopNotficationSent === 1 && value.lastWaypoint.ignitionOn === false && hours >= 4) error_truck.push(value);
    });
    return { totalTruck: total_truck, runningTruck: running_truck, stopedTruck: stoped_truck, idleTruck: idle_truck, errorTruck: error_truck };
}

export { timeCalculatorHour , findFilterCounts }