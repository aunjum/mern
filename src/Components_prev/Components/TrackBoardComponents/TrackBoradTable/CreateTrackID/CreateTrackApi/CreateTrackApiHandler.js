
const CreateTrackApiHandler = async (values, unoccupiedTags) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    //alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/tracks/createTrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        project_id: values.projectName,
        track_tag: unoccupiedTags,
        request_type: values.requestType,
        track_details: values.trackDetails
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default CreateTrackApiHandler