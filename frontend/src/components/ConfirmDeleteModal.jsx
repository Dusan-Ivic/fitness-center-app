import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmDeleteModal = ({
  isModalVisible,
  forDelete,
  handleDeleteCancel,
  handleDeleteConfirm,
}) => {
  return (
    <div>
      <Modal show={isModalVisible} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm action!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to remove {forDelete.name}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            No, go back!
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            Yes, delete it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmDeleteModal;
