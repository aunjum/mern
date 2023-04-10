
const SendUserRegistrationMailApiHandler = async (values, selectedGroupName) => {
    const accessToken = localStorage.getItem('access_token');
    //console.log(accessToken);
    // alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    console.log(values);
    console.log(selectedGroupName);
    const res = await fetch("https://tracktest.ultra-x.jp/backend/users/sendUserRegistrationEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email: values.email,
        group_name: selectedGroupName,
        group_id: values.groupName,
        permission_id: values.permissionName
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default SendUserRegistrationMailApiHandler