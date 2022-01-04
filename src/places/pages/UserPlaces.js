import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttpClient from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setloadedPlaces] = useState([])
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await sendRequest(`http://localhost:5000/api/places/user/${userId}`,);
        setloadedPlaces(response.places)
      }
      catch (e) {

      }


    }
    fetchRequest()
  }, [sendRequest, userId])
  // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  const onDeleteItem=(deletedPlaceId)=>{
    setloadedPlaces(prevPlace=>prevPlace.filter(data=>data.id!==deletedPlaceId))

  }
  return <>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <div className="center"><LoadingSpinner /></div>}
    {!isLoading && loadedPlaces &&
      <PlaceList items={loadedPlaces} deleteItem={onDeleteItem}/>
    }
  </>;
};

export default UserPlaces;
