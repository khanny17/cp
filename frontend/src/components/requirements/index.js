import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import '../../css/requirements.css';
import Requirements from './requirements';
import SidebarToggle from './sidebar-toggle';

class RndRequirements extends React.Component {
  prevWidth = 350;
  state = { width: 0, height: 300, show: false };

  componentDidUpdate(prevProps) {
    // Remember the width when closing/opening
    if(this.state.show) {
      this.prevWidth = this.state.width;
    }

    if(prevProps.show !== this.props.show) {
      if(this.props.show) {
        this.setState({
          show: true,
          width: this.prevWidth,
        });
      } else {
        this.setState({
          show: false,
          width: 0,
        });
      }
    }
  }

  render() {
    const { width, height, show } = this.state;
    return (
      <Rnd
        className={'requirements ' + (show ? '' : 'hidden')}
        size={{ width: width, height: height }}
        position={{ x: 0, y: 0 }}
        disableDragging={true}
        enableResizing={{ right: true }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        <Requirements {...this.props} />
        <SidebarToggle />
      </Rnd>
    );
  }
}
RndRequirements.propTypes = { show: PropTypes.bool };

const RndRequirementsContainer = connect(
  state => ({
    show: state.ui.showReqsSidebar,
  }),
  dispatch => ({}),
)(RndRequirements);

export default RndRequirementsContainer;
