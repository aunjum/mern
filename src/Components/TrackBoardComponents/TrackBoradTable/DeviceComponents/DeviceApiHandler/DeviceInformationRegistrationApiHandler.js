
const DeviceInformationRegistrationApiHandler = async (values,id) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    console.log(id)
    const res = await fetch("https://tracktest.ultra-x.jp/backend/devices/createDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        track_id: id,
        device_type: values.deviceType,
        vendor: values.vendor,
        model: values.modelNo,
        serial: values.serial,
        spacifications: values.spacification,
        state: values.state,
        comment: values.comment
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default DeviceInformationRegistrationApiHandler