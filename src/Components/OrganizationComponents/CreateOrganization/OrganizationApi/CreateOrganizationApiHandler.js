
const CreateOrganizationApi = async (values) => {
    
    alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/organizations/createOrganization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        initial: values.organizationInitial,
        name_en: values.organizationNameEn,
        name_jp: values.organizationNameJp
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

export default CreateOrganizationApi