import React,{useEffect,useState} from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UsersList from '../components/UsersList';
import useHttpClient from '../../shared/hooks/http-hook';
const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 3
    }
  ];
const [loadedUsers, setloadedusers] = useState([])
 const {isLoading,error,clearError,sendRequest}=useHttpClient();
 
  useEffect(() => {
      const getUsers=async()=>{
        try{
      const responseData=await sendRequest("http://localhost:5000/api/users")
        
      setloadedusers(responseData.users)}
      catch(e){}

      }
      getUsers();
    
   
   
  }, [sendRequest])

  return (
    <>
    <ErrorModal show={error} onCancel={clearError}/>
    {isLoading&&<div className="cloadedUsersenter"><LoadingSpinner asOverlay/></div>}
    {!isLoading&&loadedUsers&&<UsersList items={loadedUsers} />}
    </>
  )
};

export default Users;
