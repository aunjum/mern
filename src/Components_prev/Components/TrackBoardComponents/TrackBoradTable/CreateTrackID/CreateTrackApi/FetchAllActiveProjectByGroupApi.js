
const FetchAllActiveProjectByGroupApiHandler = async (groupData) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    console.log(groupData)
    //alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/projects/showAllActiveProjectsOfFollowingGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        group_id: groupData
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default FetchAllActiveProjectByGroupApiHandler