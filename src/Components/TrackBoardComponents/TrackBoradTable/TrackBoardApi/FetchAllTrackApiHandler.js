
const FetchAllTrackApiHandler = async () => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    //alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/projects/showAllActiveTracksOfFollowingGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        group_id: "6389710c386dd32260e6b1b1"
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default FetchAllTrackApiHandler