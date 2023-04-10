const CallDashBoardAPI = async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('https://tracktest.ultra-x.jp/backend/users/showAllProjectsDetailsOfFollowingUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    });
    const dashData = await response.json();
    return dashData;
}

export default CallDashBoardAPI