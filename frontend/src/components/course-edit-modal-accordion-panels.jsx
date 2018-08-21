import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Accordion, Button, Form, Header, Icon, List } from 'semantic-ui-react';

class PrereqList extends React.Component {
  state = {};

  onFormChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addPrereq() {
    const { subject, number } = this.state;
    if(!subject || !number) {
      return; //TODO error handling 
    }

    this.props.onChange({
      target: {
        name: 'prereqs',
        value: this.props.prereqs.concat({ subject, number }),
      },
    });
  }

  delPrereq(prereq) {
    this.props.onChange({
      target: {
        name: 'prereqs',
        value: this.props.prereqs.filter(p => {
          return p.subject !== prereq.subject || p.number !== prereq.number;
        }),
      },
    });
  }


  render() {
    const { prereqs } = this.props;
    return (
      <div>
        <Header>Prereqs</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid placeholder="Subject" name="subject"
              onChange={this.onFormChange.bind(this)} />
            <Form.Input fluid placeholder="Number" name="number"
              onChange={this.onFormChange.bind(this)} />
            <Button primary onClick={this.addPrereq.bind(this)}>Add</Button>
          </Form.Group>
        </Form>
        <List celled verticalAlign="middle">
          {prereqs.map((prereq,i) =>
            <List.Item key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div>{prereq.subject + ' ' + prereq.number}</div>
              <div style={{flex: 1}} />
              <Button size="tiny" className="show-on-hover"
                onClick={() => this.delPrereq(prereq)}>Delete</Button>
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}
PrereqList.propTypes = { onChange: PropTypes.func, prereqs: PropTypes.array };

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
    const {prereqs, onChange, color, colorOptions, onColorChange} = this.props;
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
          <Icon name='dropdown' /> Prereqs, Attributes
        </Accordion.Title>
        {active[0] ?
          <Accordion.Content active={true} key="content-0">
            <PrereqList prereqs={prereqs || []} onChange={onChange} />
          </Accordion.Content>
          : null}


        <Accordion.Title active={active[1]} index={1} key="title-1"
          onClick={this.accordionClick}
        >
          <Icon name='dropdown' /> Colorscheme
        </Accordion.Title>

        {active[1] ?
          <Accordion.Content active={true} key="content-1">
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
  onChange: PropTypes.func,
  color: PropTypes.string,
  colorOptions: PropTypes.array,
  onColorChange: PropTypes.func,
};

export default AccordionPanels;
