import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
          />
        );
      })}

      <button
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchaseable}
      >
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

export default BuildControls;
