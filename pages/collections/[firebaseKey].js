import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSingleCollection } from '../../api/collectionData';

export default function ViewCollection() {
  const [collectionDetails, setCollectionDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCollection(firebaseKey).then(setCollectionDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        {collectionDetails?.image
          ? <Image src={collectionDetails.image} alt={collectionDetails.name} style={{ width: '300px' }} /> : ''}
      </div>
      Description:
      <p>{collectionDetails?.description || ''}</p>
      <hr />
    </div>
  );
}
