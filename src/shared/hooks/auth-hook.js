import React,{useEffect,useState,useCallback} from 'react'
let logoutTimer;

export default function useAuth() {
    const [token, setToken] = useState(false);
    const [userId, setuserId] = useState(null)
    const [tokenExpirationDate, settokenExpirationDate] = useState()
    const login = useCallback((userid,token,expiration) => {
      setToken(token);
      setuserId(userid);
      const tokenExpirationDate1=expiration || new Date(new Date().getTime()+60*60*1000);
      settokenExpirationDate(tokenExpirationDate1)
      localStorage.setItem('userData',JSON.stringify({userId:userid,token:token,expiration:tokenExpirationDate1.toISOString()}));
  
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      settokenExpirationDate(null);
      setuserId(null)
      localStorage.removeItem('userData')
  
    }, []);
    useEffect(() => {
      const storedData=JSON.parse(localStorage.getItem('userData'));
      if(storedData&&storedData.token && new Date(storedData.expiration)>new Date()){
        login(storedData.userId,storedData.token,new Date(storedData.expiration))
      }
      
    }, [login])
  
    useEffect(() => {
      if(token&&tokenExpirationDate){
        const remainingTime=tokenExpirationDate.getTime()-new Date().getTime()
        logoutTimer=setTimeout(logout,remainingTime)
      }
      else{
        clearTimeout(logoutTimer)
      }
    }, [token,tokenExpirationDate,logout])
  
  
  
    return (
       {token,userId,login,logout}
    )
}
