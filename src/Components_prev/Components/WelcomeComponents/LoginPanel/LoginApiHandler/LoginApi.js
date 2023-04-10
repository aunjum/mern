
const LoginApi = async (values) => {
    
    // alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    const res = await fetch("https://tracktest.ultra-x.jp/backend/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const data = await res.json();
    return data;
    // document.cookie = `accessToken=${data.token}; path='/'`;
    // // router.push('/home')
    // if (data.success === true) {
    //   router.push("/home");
    //   // console.log(data)
    // }
  

}

export default LoginApi