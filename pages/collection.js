import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getCollections } from '../api/collectionData';
import CollectionCard from '../components/cards/collectionCard';

function ShowCollections() {
  // Set a state for Collections
  const [collections, setCollections] = useState([]);
  const [showingCollections, setShowingCollections] = useState([]);
  // Get the user Uid using useAuth hook
  const { user } = useAuth();
  // Create a function that makes the API call to get all the collections
  const getAllTheCollections = (() => {
    getCollections(user.uid).then(setCollections);
  });

  const handleSearch = (e) => {
    const searchResults = collections.filter((collection) => collection.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setShowingCollections(searchResults);
  };
    // Make the call to the API to get all the collections on component render
  useEffect(() => {
    getAllTheCollections();
  }, []);

  useEffect(() => {
    setShowingCollections(collections);
  }, [collections]);

  return (
    <div className="text-center my-4">
      <Link href="/collections/new" passHref>
        <Button>Create A New Collection</Button>
      </Link>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Search</Form.Label>
        <Form.Control as="textarea" rows={1} onChange={handleSearch} />
      </Form.Group>
      <div className="d-flex flex-wrap">
        {/* TODO: map over collections here using CollectionCard component */}
        {showingCollections.map((collection) => (
          <CollectionCard key={collection.firebaseKey} collectionObj={collection} onUpdate={getAllTheCollections} />
        ))}
      </div>
    </div>
  );
}

export default ShowCollections;
