import Modal from "@mui/material/Modal";

const CustomerModal = (props) => {
  const { open, setOpen, content } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      sx={{
        backgroundColor: "rgba(23, 23, 23, 0.42)", // Semi-transparent background color
        backdropFilter: "blur(8px)", // Blur effect
      }}
    >
      {content}
    </Modal>
  );
};

export default CustomerModal;
