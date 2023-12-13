import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
  
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
  
    const activeItem = { ...this.state.activeItem, [name]: value };
  
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Notes</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="prescription-name">Title</Label>
              <Input
                type="text"
                id="prescription-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Title Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="prescription-doctor">Note Taker</Label>
              <Input
                type="text"
                id="prescription-doctor"
                name="doctor"
                value={this.state.activeItem.doctor}
                onChange={this.handleChange}
                placeholder="Enter Note-Taker Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="prescription-date">Date</Label>
              <Input
                type="date"
                id="prescription-date"
                name="date"
                value={this.state.activeItem.date}
                onChange={this.handleChange}
                placeholder="Enter Date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="prescription-notes">Notes</Label>
              <Input
                type="textarea"
                id="prescription-notes"
                name="notes"
                value={this.state.activeItem.notes}
                onChange={this.handleChange}
                placeholder="Enter Notes"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="noteColor">Note Color:</Label>
              <Input
                type="color"
                id="noteColor"
                name="color"
                value={this.state.activeItem.color}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}