import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getCollections } from '../api/collectionData';
import CollectionCard from '../components/cards/collectionCard';

function ShowCollections() {
  // Set a state for Collections
  const [collections, setCollections] = useState([]);
  // Get the user Uid using useAuth hook
  const { user } = useAuth();
  // Create a function that makes the API call to get all the collections
  const getAllTheCollections = (() => {
    getCollections(user.uid).then(setCollections);
  });
    // Make the call to the API to get all the collections on component render
  useEffect(() => {
    getAllTheCollections();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/collections/new" passHref>
        <Button>Create A New Collection</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over collections here using CollectionCard component */}
        {collections.map((collection) => (
          <CollectionCard key={collection.firebaseKey} collectionObj={collection} onUpdate={getAllTheCollections} />
        ))}
      </div>
    </div>
  );
}

export default ShowCollections;
