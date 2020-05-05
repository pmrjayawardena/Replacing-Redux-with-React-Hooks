import React from "react";

import Aux from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";

const OrderSummery = (props) => {
  //this could be a functional component doesnt have to be
  // componentWillUpdate() {
  //   console.log('{order summery will update}');
  // }

  const ingredientSummery = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}> {igkey}</span>:{" "}
        {props.ingredients[igkey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delicious Burger with the following ingredients:</p>
      <ul>{ingredientSummery}</ul>
      <p>
        <strong>Total Price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseConfirm}>
        CONFIRM
      </Button>
    </Aux>
  );
};

export default OrderSummery;
