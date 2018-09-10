import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Form, Header, Icon, List } from 'semantic-ui-react';

class AttributeList extends React.Component {
  state = {};

  onFormChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addAttribute() {
    const { attribute } = this.state;
    if(!attribute) {
      return; //TODO error handling
    }

    this.props.onChange({
      target: {
        name: 'attributes',
        value: this.props.attributes.concat(attribute),
      },
    });
  }

  delAttribute(attribute) {
    this.props.onChange({
      target: {
        name: 'attributes',
        value: this.props.attributes.filter(a => a === attribute),
      },
    });
  }


  render() {
    const { attributes } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid placeholder="Attribute" name="attribute"
              onChange={this.onFormChange.bind(this)} />
            <Button primary onClick={this.addAttribute.bind(this)}>Add</Button>
          </Form.Group>
        </Form>
        <List celled verticalAlign="middle">
          {attributes.map((attribute,i) =>
            <List.Item key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div>{attribute}</div>
              <div style={{flex: 1}} />
              <Button size="tiny" className="show-on-hover"
                onClick={() => this.delAttribute(attribute)}>Delete</Button>
            </List.Item>
          )}
        </List>
      </React.Fragment>
    );
  }
}
AttributeList.propTypes = { onChange: PropTypes.func, attributes: PropTypes.array };

export default AttributeList;
