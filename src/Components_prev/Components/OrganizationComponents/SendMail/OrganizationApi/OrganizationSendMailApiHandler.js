
const OrganizationSendMailApiHandler = async (values, organization) => {
    // console.log("values", values)
    // console.log("organization", organization)
    //alert(JSON.stringify(values + organization, null, 2));
    //alert(JSON.stringify(organization, null, 2))
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/users/sendAdminRegistrationEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        organization_id:  organization._id,
        organization_name: organization.name_en,
        email: values.email,
        permission_id: "6368bca9cccebb5f67e8bd8a"
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

export default OrganizationSendMailApiHandler