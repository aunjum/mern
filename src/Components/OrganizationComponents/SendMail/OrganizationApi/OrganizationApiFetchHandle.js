
const OrganizationApiFetchHandle = async () => {
    
    //alert(JSON.stringify(values, null, 2));
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
    // document.cookie = `accessToken=${data.token}; path='/'`;
    // // router.push('/home')
    // if (data.success === true) {
    //   router.push("/home");
    //   // console.log(data)
    // }
  

}

export default OrganizationApiFetchHandle