import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { AiFillDelete, AiFillEdit, AiOutlineCloseCircle, AiOutlineCheck } from 'react-icons/ai';
import CategorySelectList from '../CategorySelectList';
import StatusSelectList from '../StatusSelectList';


function TodoList(props) {


    const [editable, setEditable] = useState({
        todoId:"",
        isEditable: false
    })

    const [updateForm, setUpdateForm] = useState({
        selectCategoryId:"",
        selectStatusId:"",
        updateTodoText:"",
        todoId: ""
      }) 

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        const newForm = {...updateForm, [key]: value}
        setUpdateForm(newForm)
    }

  return (
    <div className='col-12'>
        <Form.Label className='fw-bold'>Yapılacaklar Listesi</Form.Label>
        <Card>
            <ListGroup variant="flush">
                {
                    props.todoList.map((item,idx)=> {
                        const selectCategory = props.categoryList.find((category)=>
                            category.id === item.selectCategoryId
                        )
                        const selectStatus = props.statusList.find((status)=>
                            status.statusId === item.selectStatusId
                        )
                        return (
                            <ListGroup.Item key={idx}>
                                {
                                    (editable.todoId===item.todoId && editable.isEditable===true) ? 
                                            <div className='row'>
                                                <div className="col-5">
                                                    <Form.Control 
                                                        size="sm" 
                                                        type="text" 
                                                        placeholder={item.todoText}
                                                        onChange={handleChange}
                                                        value={updateForm.updateTodoText}
                                                        name="updateTodoText"
                                                    /> 
                                                </div>
                                                <div className="col-3">
                                                    <CategorySelectList
                                                        categoryList={props.categoryList}
                                                        onChange={handleChange}
                                                        value={updateForm.selectCategoryId}
                                                        name="selectCategoryId"/> 
                                                </div>
                                                <div className="col-3">
                                                    <StatusSelectList
                                                        statusList={props.statusList}
                                                        onChange={handleChange}
                                                        value={updateForm.selectStatusId}
                                                        name="selectStatusId"
                                                        selectCategoryId={selectCategory.id}/> 
                                                </div>
                                                <div className="col-1">
                                                    <AiOutlineCloseCircle 
                                                        className='me-1 mt-1 close-icon' 
                                                        onClick={()=> 
                                                            setEditable({todoId: item.todoId, isEditable:false})}/>
                                                    <AiOutlineCheck 
                                                        className='me-1 mt-1 check-icon' 
                                                        onClick={()=> {
                                                            props.onUpdateTodoList(updateForm)
                                                            setEditable({todoId: item.todoId, isEditable:false})
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                    :
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label 
                                                className='me-5'>{item.todoText}
                                            </Form.Label>
                                        </div>
                                        <div className="col-3">
                                            <Form.Label 
                                                className='fw-bold'>
                                                    {selectCategory.name}
                                            </Form.Label>
                                        </div>
                                        <div className='col-3 float-end'>
                                            <Badge 
                                                className=' me-3' 
                                                pill bg={selectStatus.color}>
                                                    {selectStatus.name}
                                            </Badge>
                                            <AiFillDelete 
                                                className='me-1 mt-1 delete-icon' 
                                                onClick={() => 
                                                    props.onDeleteTodo(item.todoId)}/>
                                            <AiFillEdit 
                                                className='me-1 mt-1 edit-icon' 
                                                onClick={()=>{
                                                    setEditable({todoId: item.todoId, isEditable:true})
                                                    setUpdateForm({
                                                        selectCategoryId: selectCategory.id,
                                                        selectStatusId: selectStatus.statusId,
                                                        updateTodoText: item.todoText,
                                                        todoId: item.todoId
                                                    })
                                                }
                                            } />
                                        </div>
                                    </div>
                                }
                            </ListGroup.Item>
                        )
                    }
                    )
                }
            </ListGroup>
        </Card>
    </div>
  )
}

export default TodoList
