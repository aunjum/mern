const CSVAPI = async (project_id) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
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
   
    const csvData = await response.json();
    return csvData;
}

export default CSVAPI;