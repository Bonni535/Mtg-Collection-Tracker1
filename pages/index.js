import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { getCollections } from '../api/collectionData';
// import { useAuth } from '../utils/context/authContext';
// import CollectionCard from '../components/cards/collectionCard';

function Home() {
  // const [collections, setCollections] = useState([]);
  // const [showingCollections, setShowingCollections] = useState([]);

  // const { user } = useAuth();

  // const getAllTheCollections = () => {
  //   getCollections(user.uid).then(setCollections);
  // };

  // const handleSearch = (e) => {
  //   const searchResults = collections.filter((collection) => collection.name.toLowerCase().includes(e.target.value.toLowerCase()));
  //   setShowingCollections(searchResults);
  // };

  // useEffect(() => {
  //   getAllTheCollections();
  // }, []);

  // useEffect(() => {
  //   setShowingCollections(collections);
  // }, [collections]);

  return (
    <div className="text-center my-4">
      <Link href="/collections/new" passHref>
        <Button>Create A New Collection</Button>
      </Link>
      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Search</Form.Label>
        <Form.Control as="textarea" rows={1} onChange={handleSearch} />
      </Form.Group> */}
    </div>
  );
}

export default Home;
