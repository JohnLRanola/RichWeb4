import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Modal from "./components/Modal";
import QRCode from 'react-qr-code';
import axios from "axios";


class GPs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        prescriptionList: [],
        modal: false,
        activeItem: {
          name: "",
          doctor: "",
          date: "",
          notes: "",
          completed: false,
          color: "#000000",
        },
      };
    }
  
    componentDidMount() {
      this.refreshList();
    }
  
    refreshList = () => {
      axios
        .get("/api/prescriptions/")
        .then((res) => {
          const sortedPrescriptions = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.setState({ prescriptionList: sortedPrescriptions });
        })
        .catch((err) => console.log(err));
    };
  
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    handleTabChange = (tab) => {
      this.setState({ activeTab: tab });
    };

    handleSubmit = (item) => {
      this.toggle();
      localStorage.setItem('color', item.color);
      
      item.color = localStorage.getItem('color') || "#000000";
    
      if (item.id) {
        axios
          .put(`/api/prescriptions/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      axios
        .post("/api/prescriptions/", item)
        .then((res) => this.refreshList());
    };
  
    handleDelete = (item) => {
      axios
        .delete(`/api/prescriptions/${item.id}/`)
        .then((res) => this.refreshList());
    };
  
    createItem = () => {
      const color = localStorage.getItem('color') || "#000000";
      const item = { name: "", doctor: "", date: "", notes: "", completed: false, color };
    
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
  
    editItem = (item) => {
      const color = localStorage.getItem('color') || "#000000";
      const { color: itemColor, ...itemWithoutColor } = item;
      const itemWithColor = { ...itemWithoutColor, color };

      this.setState({ activeItem: itemWithColor, modal: !this.state.modal });
    };
  
    displayCompleted = (status) => {
      if (status) {
        return this.setState({ viewCompleted: true });
      }
  
      return this.setState({ viewCompleted: false });
    };
  
    renderItems = () => {
      const { activeTab } = this.state;
      const newItems = this.state.prescriptionList.filter(
        (item) => item.completed === (activeTab === "completed")
      );
    
      return newItems.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ backgroundColor: item.color }} // Get the color from the item
        >
          <span
            className={`prescription-title mr-2 ${
              item.completed ? "completed-prescription" : ""
            }`}
            title={item.description}
          >
            <strong>ID:</strong> {item.id} <br/>
            <strong>Title:</strong> {item.name} <br/>
            <strong>Note Taker:</strong> {item.doctor} <br/>
            <strong>Note Date:</strong> {item.date} <br/>
            <strong>Notes:</strong> {item.notes}
          </span>
          <span>
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <QRCode value={item.id} />
          </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Prescription app</h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={this.createItem}
                  >
                    Add 
                  </button>
                </div>
                <div>
                  <button onClick={() => this.handleTabChange("notCompleted")}>Not Completed</button>
                  <button onClick={() => this.handleTabChange("completed")}>Completed</button>
                </div>
                <ul className="list-group list-group-flush border-top-0">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          <div>
          </div>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </main>
      );
    }
}

export default GPs;