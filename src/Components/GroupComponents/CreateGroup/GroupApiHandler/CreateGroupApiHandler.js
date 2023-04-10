
const CreateGroupApiHandler = async (values) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
   // alert(JSON.stringify(values, null, 2));
    
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/groups/createGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name_en: values.groupNameEn,
        name_jp: values.groupNameJp
      }),
      
    });
   
    const data = await res.json();
    return data;

}

export default CreateGroupApiHandler