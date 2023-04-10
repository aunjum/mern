
const CreateRecordApiHandler = async (values,id, image) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);

    var form = new FormData();
    form.append('processing_type', values.processingType);
    form.append('device_id', id);
    form.append('image_upload', image);
    form.append('location', values.location);
    form.append('tool_used', values.toolUsed);
    form.append('comment', values.comment);

    const res = await fetch('https://tracktest.ultra-x.jp/backend/records/createRecord', { 
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      method: 'POST', 
      body: form 
    })
    // .then(function(res) {
    //      res.json();
    // }).then(function(json) {
    //     console.log(json);
    //     return json;
    // });
     const data = await res.json();
     console.log(data)
     return data;
   
    
    // const res = await fetch("https://tracktest.ultra-x.jp/backend/records/createRecord", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: 'application/form-data',
    //     "Authorization": `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify({
    //     processing_type: values.processingType,
    //     device_id: id,
    //     image_upload: image,
    //     location: values.location,
    //     tool_used: values.toolUsed,
    //     comment: values.comment

    //   }),
      
    // });
   
    // const data = await res.json();
    // console.log(data)
    // return data;

}

export default CreateRecordApiHandler