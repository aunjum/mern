
const CreateProjectApiHandler = async (values) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    // alert(JSON.stringify(values, null, 2));
    console.log(values)
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/projects/createProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        group_id: values.groupName,
        name_en: values.projectNameEn,
        name_jp: values.projectNameJp,
        details: values.projectDetails
      }),
      
    });
   
    const data = await res.json();
    console.log(data)
    return data;

}

export default CreateProjectApiHandler