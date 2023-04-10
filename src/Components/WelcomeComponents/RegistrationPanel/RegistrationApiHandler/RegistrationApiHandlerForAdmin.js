
const RegistrationApiHandlerForAdmin = async (values,email,organization_id, permission_id) => {
    
    // alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/users/createAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        organization: organization_id,
        email: email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
        permission : permission_id
      }),
    });
    const data = await res.json();
    return data;
   

}

export default RegistrationApiHandlerForAdmin