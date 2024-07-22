import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComponent = ({
  show,
  onHide,
  title,
  content,
  btnConfig,
  onSave,
  onDelete,
  onCancel,
  onClose,
}: any) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        {btnConfig.isDeleteBtnVisible && (
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        )}
        {btnConfig.isCancelBtnVisible && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {btnConfig.isSaveBtnVisible && (
          <Button variant="primary" onClick={onSave}>
            Save
          </Button>
        )}
        {btnConfig.isCloseBtnVisible && (
          <Button variant="light" onClick={onClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
