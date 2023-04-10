const GetTrackDeviceDataAPI = async (project_id) => {

    const accessToken = localStorage.getItem('access_token');
        const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showProjectsTrackDetailsCount', {
            method: 'POST',
            body: JSON.stringify({
            project_id : project_id
            }),
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
        });
        const detailData = await response.json();
        return detailData;
}

export default GetTrackDeviceDataAPI;