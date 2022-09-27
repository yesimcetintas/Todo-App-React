import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import CategorySelectList from '../CategorySelectList';
import Button from 'react-bootstrap/Button';

import "./AddTodoForm.css"
import StatusSelectList from '../StatusSelectList';

function AddTodoForm(props) {

  const [form, setForm] = useState({
    todoText:"",
    selectCategoryId:"",
    selectStatusId:""
  }) 

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    const newForm = {...form, [key]: value}
    setForm(newForm)
  }

  return (
    <div className='row'>
      <div className="col-5">
        <Form.Control 
          size="sm" 
          type="text" 
          placeholder="Todo giriniz"
          onChange={handleChange}
          value={form.todoText}
          name="todoText"
        />
      </div>
      <div className="col-3">
        <CategorySelectList
          categoryList={props.categoryList}
          onChange={handleChange}
          value={form.selectCategoryId}
          name="selectCategoryId"
        />
      </div>
      <div className="col-3">
        <StatusSelectList
          statusList={props.statusList}
          onChange={handleChange}
          value={form.selectStatusId}
          name="selectStatusId"
          selectCategoryId={form.selectCategoryId}
        />
      </div>
      <div className="col-1">
        <Button 
          variant="dark" 
          size='sm'
          onClick={()=>{
            props.onAddTodo(form)
            setForm(
            {todoText:"",
            selectCategoryId:"",
            selectStatusId:""})
          }}>
            Ekle
        </Button>
      </div>
      

    </div>
  )
}

export default AddTodoForm
