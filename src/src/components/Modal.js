function Modal(props) {
  function closeModalHandler() {
      props.onClose();
  }

  return (
    <div className="modal">
      <p>Placeholder Content for the Project</p>
      <button className="btn btn--alt">Do Something</button>
      <button className="btn" onClick={closeModalHandler}>
        Close Modal
      </button>
    </div>
  );
}

export default Modal;
