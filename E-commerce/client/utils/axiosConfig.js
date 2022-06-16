export const configAxios = ()=>{
    const localUser = localStorage.getItem('userInfo');
    const userActive = JSON.parse(localUser);
      let configAxios = {};
    
    if(userActive){
     configAxios ={
       headers: {
         'Content-Type': 'application/json',
         Authorization: `${userActive.token}`,
       },
     }
    };
    return configAxios;
}