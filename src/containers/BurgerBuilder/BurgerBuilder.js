import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderAction from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;
  useEffect(() => {
    props.onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((inkey) => {
        return ingredients[inkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseConfirmHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
    // alert('you continue');
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummery = null;

  let burger = props.error ? <p>Ingredients cant be loaded </p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          price={props.price}
          purchaseable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler.bind(this)}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummery = (
      <OrderSummery
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseConfirm={purchaseConfirmHandler}
        ingredients={props.ings}
      />
    );
  }
  // if (this.state.loading) {
  //   orderSummery = <Spinner />;
  // }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummery}
      </Modal>

      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderAction.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderAction.removeIngredient(ingName)),

    onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderAction.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
