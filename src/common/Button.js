import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Button.scss";

function Button({
  children,
  buttonType,
  fullWidth,
  size,
  outlined,
  inverted,
  loading,
  ...other
}) {
  return (
    <button
      className={classnames("button", {
        [`is-${buttonType}`]: !!buttonType,
        [`is-${size}`]: !!size,
        "is-fullwidth": fullWidth,
        "is-outlined": outlined,
        "is-inverted": inverted,
        "is-loading": loading
      })}
      disabled={loading}
      {...other}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
  buttonType: PropTypes.oneOf([
    "primary",
    "link",
    "info",
    "success",
    "warning",
    "danger"
  ]),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  outlined: PropTypes.bool,
  inverted: PropTypes.bool,
  loading: PropTypes.bool
};
export default Button;
