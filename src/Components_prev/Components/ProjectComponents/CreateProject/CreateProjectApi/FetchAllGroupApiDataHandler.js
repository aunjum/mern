
const FetchAllGroupApiDataHandler = async () => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    //alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/groups/showAllActiveGroups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default FetchAllGroupApiDataHandler