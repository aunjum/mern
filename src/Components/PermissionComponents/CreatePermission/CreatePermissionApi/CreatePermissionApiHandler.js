
const CreatePermissionApiHandler = async (values) => {
    const accessToken = localStorage.getItem('access_token');
   
    // alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/permissions/createPermission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: values.permissionTitle,
        permissions: values.checked
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default CreatePermissionApiHandler