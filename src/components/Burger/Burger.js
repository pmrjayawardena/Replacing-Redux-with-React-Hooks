import React from 'react';
import classes from './Burger.css';
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredients)
    .map(
      //get the key values since this is an object eg: salad, bacon, cheese

      (ingredentKey) => {
        return [...Array(props.ingredients[ingredentKey])].map((_, i) => {
          return (
            <BurgerIngredient key={ingredentKey + i} type={ingredentKey} />
          );
        });
      }
    )
    .reduce((newArr, el) => {
      return newArr.concat(el);
    }, []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please Start Adding Ingredient</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredient}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

Burger.propTypes = {};

export default withRouter(Burger);
