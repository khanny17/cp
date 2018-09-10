import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Accordion, Button, Form, Header, Icon, List } from 'semantic-ui-react';
import PrereqList from './course-edit-modal-prereqs';
import AttributeList from './course-edit-modal-attributes';

class AccordionPanels extends React.Component {
  state = { active: { 0: true } };

  accordionClick = (e, titleProps) => {
    const { index } = titleProps;

    this.setState({
      active: {
        ...this.state.active,
        [index]: !this.state.active[index],
      }
    });
  }

  render() {
    const {prereqs, attributes, onChange, color, colorOptions, onColorChange} = this.props;
    const { active } = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="accordion"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >

        <Accordion.Title active={active[0]} index={0} key="title-0"
          onClick={this.accordionClick}
        >
          <Icon name='dropdown' /> Prerequisites
        </Accordion.Title>
        {active[0] ?
          <Accordion.Content active={true} key="content-0">
            <PrereqList prereqs={prereqs || []} onChange={onChange} />
          </Accordion.Content>
          : null}

        <Accordion.Title active={active[1]} index={1} key="title-1"
          onClick={this.accordionClick}
        >
          <Icon name='dropdown' /> Attributes
        </Accordion.Title>
        {active[1] ?
          <Accordion.Content active={true} key="content-1">
            <AttributeList attributes={attributes || []} onChange={onChange} />
          </Accordion.Content>
          : null}


        <Accordion.Title active={active[2]} index={2} key="title-2"
          onClick={this.accordionClick}
        >
          <Icon name='dropdown' /> Colorscheme
        </Accordion.Title>

        {active[2] ?
          <Accordion.Content active={true} key="content-2">
            <CirclePicker color={color} onChange={onColorChange}
              colors={colorOptions} />
          </Accordion.Content>
          : null }

      </ReactCSSTransitionGroup>
    );
  }
}
AccordionPanels.propTypes = {
  prereqs: PropTypes.array,
  attributes: PropTypes.array,
  onChange: PropTypes.func,
  color: PropTypes.string,
  colorOptions: PropTypes.array,
  onColorChange: PropTypes.func,
};

export default AccordionPanels;
