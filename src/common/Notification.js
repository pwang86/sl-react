import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Notification extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      shown: true,
    };
  }

  handleClose = () => {
    this.setState({ shown: false });
  };

  render() {
    if (!this.state.shown) {
      return null;
    }
    const { type, children, closable } = this.props;
    return (
      <div className={classnames("notification", { [`is-${type}`]: !!type })}>
        {closable && <button className="delete" onClick={this.handleClose} />}
        {children}
      </div>
    );
  }
}

Notification.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    "primary",
    "link",
    "info",
    "success",
    "warning",
    "danger",
    "white",
  ]),
  closable: PropTypes.bool,
};

export default Notification;
