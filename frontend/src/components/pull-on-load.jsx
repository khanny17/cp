import React from 'react';
import PropTypes from 'prop-types';


/*
 * This is a util wrapper class that will pull missing data as instructed.
 * It takes two props: info and pull.
 * info is an object matching this format:
 * {
 *   data: Object holding the data. Starts as null if it hasn't been pulled yet
 *   error: Boolean. true if it tried to pull the data but an error occurred
 *   loading: Boolean. True if in the process of pulling the data
 * }
 *
 * pull is the function used to grab the data from the server
 */
class POL extends React.Component {
  pullIfNeeded() {
    const { data, error, loading } = this.props.info;

    // If we already have the data, if there was an error, or if we are loading,
    // we do not want to pull
    if(data || error || loading) {
      return;
    }

    this.props.pull();
  }

  componentDidMount() {
    this.pullIfNeeded();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.info.data !== prevProps.info.data) {
      this.pullIfNeeded();
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

POL.propTypes = {
  info: PropTypes.object,
  pull: PropTypes.func,
  children: PropTypes.any,
};

export default POL;
