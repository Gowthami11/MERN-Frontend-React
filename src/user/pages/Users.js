import React,{useEffect,useState} from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UsersList from '../components/UsersList';

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
  const [loadedUsers, setloadedUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null)
  useEffect(() => {
    try{
      setisLoading(true)
      const getUsers=async()=>{
      const response=await fetch("http://localhost:5000/api/users")
        const responseData=await response.json();
        debugger;
        if(!response.ok){
          throw new error('Somthing went wrong')
        }
        setloadedUsers(responseData.users)
      }
      getUsers();
      setisLoading(false)
    }
    catch(e){
      setisLoading(false);
      seterror(e.message||'something went wrong, Please try again')
    }
   
  }, [])

  return (
    <>
    <ErrorModal show={error} onCancel={()=>seterror(null)}/>
    {isLoading&&<div className="center"><LoadingSpinner asOverlay/></div>}
    {!isLoading&&<UsersList items={loadedUsers} />}
    </>
  )
};

export default Users;
