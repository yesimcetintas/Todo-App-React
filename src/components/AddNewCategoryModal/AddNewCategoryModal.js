import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryList from '../CategoryList';

function AddNewCategoryModal(props) {

  const [form, setForm] = useState({
    categoryText:""
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Modal.Title>Kategori Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group 
              className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>Kategori Adı</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={form.categoryText}
                name="categoryText"
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>
          </Form>
          <CategoryList
            categoryList={props.categoryList}
            onDeleteCategory={props.onDeleteCategory}
            onUpdateCategory= {props.onUpdateCategory}/>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={()=>{
              props.onClick()
            }}>
            Kapat
          </Button>
          <Button 
            variant="primary" 
            onClick={()=>{ 
              props.onAddCategory(form)
              setForm({categoryText:""})
            }}
            >
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewCategoryModal
