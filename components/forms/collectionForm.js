import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createCollection, updateCollection } from '../../api/collectionData';
import { useAuth } from '../../utils/context/authContext';

// Initial state: initially set the object that contains the following fields to empy strings.
const initialState = {
  name: '',
  description: '',
  image: '',
};

// // The CollectionForm component uses: useState hook to create a variable formInput initialized with initialState.
// initialState contains the default values we can see above.
// useRouter is used for routing within the app.
// useAuth is a custom hook that provides access to authentication informations like the user object.
function CollectionForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  // The useEffect listens for changes in obj and user and updated the form state accordingly.
  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // The handleChange function modifies the state by updating the corresponding field based on user input in the form.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // The handleSubmit function handles form submission differently based on wheter the obj contains a firebaseKey or not.
  // it either updates an existing collection (updateCollection) or creates a new one (createCollection) (if a firebaseKey is found the form updates the relative collection, if not the form creates a new collection).
  // router.push is used to navigate the user to the home route after updating or creating a collection.
  const handleSubmit = (e) => {
    e.preventDefault(); // this prevents the default behavior of form submission, allowing to handle the submission manually.
    if (obj.firebaseKey) {
      updateCollection(formInput).then(() => router.push('/collection'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCollection(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCollection(patchPayload).then(() => {
          router.push('/collection');
        });
      });
    }
  };

  // The return statement renders the form with the various input fields and a submit button.
  // Name Input: renders an input field for the collection name. It binds the value to 'formInput.name' and triggers the handleChange function on change.
  // Description Input: renders an input field for the collection description. It binds the value to 'formInput.description' and triggers the handleChange function on change.
  // Image Input: renders an input field for the collection image Url if the user wants to use an image. It expects a valid URL and triggers the handleChange function.
  // Submit Button: renders the button inside the form, its text dinamically changes based on whether obj contains a firebaseKey or not.If yes -> the button text becomes "Update collection".If not -> the button text becomes "Create collection".
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.firebaseKey ? 'Update' : 'Create'} Collection</h2>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Collection Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Description INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Collection Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="New Collection Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj?.firebaseKey ? 'Update' : 'Create'} Collection</Button>
    </Form>
  );
}

// Below the propTypes and the defaultProps are being defined for the CollectionForm component.
// PropTypes.shape: specifies that the obj prop should be an object with specific properties.
// PropTypes.string: defines the expected data type for each property within the obj object (name, description, image, uid, firebaseKey).
// This ensure that if obj is provided, it should have properties with string values for 'name', 'description', 'image', 'uid', 'firebaseKey'. It helps catch potential errors or mismatches in the received prop types.
CollectionForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

// defaultProps: provides a default value for the obj prop if it's not provided when the CollectionForm component is used.
// 'obj: initialState': sets the default value of obj to the initialState object (empty strings for 'name', 'description', 'image', 'uid', 'firebaseKey').
// This ensures that if the 'obj' prop is not passed when using CollectionForm, it will default to an empty state with all properties initialized to empty strings.
CollectionForm.defaultProps = {
  obj: initialState,
};

// exporting this component as the default export allows it to be imported and used in other files within the app.
export default CollectionForm;
