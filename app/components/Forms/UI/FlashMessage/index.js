import React, { Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './css/styles.css';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const info = this.props.info;
    const className = info.isSuccess ? 'defaultStyle' : 'defaultStyle negative';
    let icon = 'circle outline';
    if (info.icon) {
      icon += ' ';
      icon += info.icon;
    }
    const msgModal =
      (<Message
        className={className}
        icon={<Icon size="big" name={icon} style={{ marginTop: '-9px' }} />}
        header={info.isSuccess ? 'Success' : 'Something error'}
        content={info.content}
      />);
    return msgModal;
  }
}

FlashMessage.defaultProps = {
  info: {
    icon: 'check',
    isSuccess: true,
    content: 'Content alert',
  },
};

FlashMessage.propTypes = {
  info: PropTypes.shape({
    icon: PropTypes.string,
    isSuccess: PropTypes.boolean,
    content: PropTypes.string,
  }),
};

export default FlashMessage;
