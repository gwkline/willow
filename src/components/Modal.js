function Modal(props) {
  function closeModalHandler() {
      props.onClose();
  }

  return (
    <div className="modal">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button className="btn btn--alt">Do Something</button>
      <button className="btn" onClick={closeModalHandler}>
        Close Modal
      </button>
    </div>
  );
}

export default Modal;
