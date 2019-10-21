import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextField({ className, label, leftIcon, rightIcon, error, ...other }) {
  return (
    <div className="field">
      {label !== undefined && <label className="label">{label}</label>}
      <div
        className={classnames("control", {
          "has-icons-left": !!leftIcon,
          "has-icons-right": !!rightIcon
        })}
      >
        <input
          className={classnames("input", { "is-danger": !!error }, className)}
          {...other}
        />
        {!!leftIcon && (
          <span className="icon is-small is-left">
            <i className={`fas fa-${leftIcon}`} />
          </span>
        )}
        {!!rightIcon && (
          <span className="icon is-small is-right">
            <i className={`fas fa-${rightIcon}`} />
          </span>
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  error: PropTypes.string
};

export default TextField;
