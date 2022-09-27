import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategorySelectList from '../CategorySelectList';
import StatusList from '../StatusList';

function AddNewStatusModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    statusText:"",
    color:"",
    selectCategoryId:""
  })

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    const newForm = {...form, [key]: value}
    setForm(newForm)
  }

  return (
    <>

      <Modal 
        show={props.show} 
        onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Statü Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group 
              className="mb-3" 
              controlId="exampleForm.ControlInput1">
                <Form.Label>Kategori Adı</Form.Label>
                <CategorySelectList 
                  categoryList={props.categoryList}
                  onChange={handleChange}
                  value={form.selectCategoryId}
                  name="selectCategoryId"
                />
            </Form.Group>
            <Form.Group 
              className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>Statü Adı</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={form.statusText}
                name="statusText"
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>
            <Form.Group 
              className="mb-3" 
              controlId="exampleForm.ControlInput1">
                <Form.Label>Statü Rengi</Form.Label>
                <Form.Select 
                  aria-label="Default select example" 
                  value={form.color} 
                  name="color" 
                  onChange={handleChange}>
                    <option>Renk Seçiniz</option>
                    <option value="primary">Mavi</option>
                    <option value="secondary">Gri</option>
                    <option value="success">Yeşil</option>
                    <option value="warning">Sarı</option>
                    <option value="danger">Kırmızı</option>
                </Form.Select>
            </Form.Group>
          </Form>
          <StatusList
            statusList = {props.statusList}
            categoryList ={props.categoryList}
            onUpdateStatus={props.onUpdateStatus}
            onDeleteStatus={props.onDeleteStatus}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={()=>{
              props.onClick(false)
            }}>
            Kapat
          </Button>
          <Button 
            variant="primary" 
            onClick={()=>{
              props.onAddStatus(form)
              setForm({statusText:"", color:"",selectCategoryId:"" })
            }}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewStatusModal
