
const FetchAllOrganizationApiHandler = async () => {
    
   // alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/organizations/showAllOrganizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;
  

}

export default FetchAllOrganizationApiHandler