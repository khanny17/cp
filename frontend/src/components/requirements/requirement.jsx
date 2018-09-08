import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline';
import { Dropdown, Icon } from 'semantic-ui-react';
import Badges from './badges';

class Requirement extends React.Component {
  typeColors = {
    COURSE: 'blue',
    ATTRIBUTE: 'purple',
  };

  typeOptions = [
    {
      text: (
        <span>
          <Icon name="circle" style={{ color: this.typeColors.COURSE }}/>
          Course
        </span>
      ),
      value: 'COURSE',
    },
    {
      text: (
        <span>
          <Icon name="circle" style={{ color: this.typeColors.ATTRIBUTE }}/>
          Attribute
        </span>
      ),
      value: 'ATTRIBUTE',
    },
  ];

  onChange(toUpdate) {
    this.props.updateRequirement({
      fid: this.props.requirement.fid,
      ...toUpdate,
    });
  }

  constructor(props) {
    super(props);

    this.state = { requirement: this.props.requirement };
  }
  componentDidUpdate(prevProps) {
    if(prevProps.requirement !== this.props.requirement) {
      this.setState({ requirement: this.props.requirement });
    }
  }

  render() {
    const { notMet } = this.props;
    const { requirement } = this.state;

    return (
      <div className="requirement">
        <div className="type">
          <Dropdown options={this.typeOptions} inline
            icon={notMet ? 'circle outline' : 'circle'}
            style={{ color: this.typeColors[requirement.type] }}
            onChange={(e, data) => this.onChange({ type: data.value })}
          />
        </div>

        <div className="value">
          {requirement.value.length === 0 ?
            <input onBlur={e => this.onChange({ value: e.target.value })}
              onKeyPress={e => {
                if(e.key === 'Enter') {
                  this.onChange({ value: e.target.value });
                }
              }}
            />
            :
            <InlineEdit
              paramName="value"
              tabIndex={0}
              editing={requirement.value.length === 0}
              text={requirement.value}
              change={this.onChange.bind(this)}
            />
          }
        </div>

        {requirement.type === 'ATTRIBUTE' ?
          <Badges badges={[{
            fid: requirement.fid,
            color: 'red',
            shape: 'diamond',
            course: requirement.course,
          }]} />
          : null}
      </div>
    );
  }
}
Requirement.propTypes = {
  requirement: PropTypes.object,
  updateRequirement: PropTypes.func,
  notMet: PropTypes.bool,
};

export default Requirement;
