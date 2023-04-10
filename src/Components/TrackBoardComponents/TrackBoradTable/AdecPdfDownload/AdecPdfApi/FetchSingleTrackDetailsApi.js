
const FetchSingleTrackDetailsApi = async (id) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    console.log("record id",id)
    //alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/tracks/showTracksDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        track_id: id
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default FetchSingleTrackDetailsApi