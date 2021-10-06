const getTruckData = async () => {
    try {
        let response = await fetch('https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint');
        let json_response = response.json();
        return json_response;
    } catch(err) {
        console.error(err);
    }
}

export { getTruckData };