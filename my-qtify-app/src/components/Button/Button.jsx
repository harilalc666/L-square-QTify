// Button.jsx
import React from 'react';
import styles from './Button.module.css';

/**
 * Re‑usable button component.
 * Props:
 *  - children: button label (string or node)
 *  - onClick : click handler (optional)
 *  - type    : "button" | "submit" | "reset" (default "button")
 *  - …rest   : any other native <button> props
 */
function Button({ children, type = 'button', ...rest }) {
  return (
    <button type={type} className={styles.btn} {...rest}>
      {children}
    </button>
  );
}

export default Button;
