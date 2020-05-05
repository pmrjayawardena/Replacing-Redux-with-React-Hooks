import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilary/Auxilary";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrapperdComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrapperdComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
