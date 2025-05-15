import React, { useState } from 'react';
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import RestaurantForm from '../components/RestaurantForm';
import RestaurantList from '../components/RestaurantList';
import RestaurantWheel from '../components/Wheel';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  const toggleList = () => setShowList(!showList);

  return (
    <Container className="py-5">
      <h2 className="mb-4">🎯 Spin the Meal</h2>

      <div className="mb-3 d-flex gap-3">
        <Button color="primary" onClick={toggleForm}>Add Restaurant</Button>
        <Button color="secondary" onClick={toggleList}>
          {showList ? 'Hide List' : 'Show List'}
        </Button>
      </div>

      <Modal isOpen={showForm} toggle={toggleForm}>
        <ModalHeader toggle={toggleForm}>Add a New Restaurant</ModalHeader>
        <ModalBody>
          <RestaurantForm />
        </ModalBody>
      </Modal>

      {showList && <RestaurantList />}

      <hr />
      <RestaurantWheel />
    </Container>
  );
};

export default Home;