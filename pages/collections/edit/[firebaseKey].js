import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCollection } from '../../../api/collectionData';
import CollectionForm from '../../../components/forms/collectionForm';

export default function EditCollection() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCollection(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <CollectionForm obj={editItem} />;
}
