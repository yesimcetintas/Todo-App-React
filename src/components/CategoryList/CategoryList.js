import React ,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineCloseCircle, AiOutlineCheck } from 'react-icons/ai';

function CategoryList(props) {

    const [editable, setEditable] = useState({
        id:"",
        isEditable: false
    })

    const [updateCategory, setUpdateCategory] = useState({
        updateCategoryId: "",
        updateCategoryName: ""
    })

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        const newCategoryForm = {...updateCategory, [key]: value}
        setUpdateCategory(newCategoryForm)
    }

  return (
    <div>
        <ListGroup variant="flush">
            {
                props.categoryList.map((item, idx)=>{
                   return( <ListGroupItem key={idx}>
                        {
                            (editable.id === item.id && editable.isEditable === true) ?
                            <div className='row'>
                                <div className="col-10">
                                    <Form.Control
                                        type='text'
                                        placeholder={item.name}
                                        onChange={handleChange}
                                        value={updateCategory.updateCategoryName}
                                        name="updateCategoryName"
                                        autoFocus/>
                                </div>
                                <div className="col-2">
                                    <AiOutlineCloseCircle
                                        className='close-icon me-1'
                                        onClick={()=>
                                            setEditable({id: item.id, isEditable: false})}/>
                                    <AiOutlineCheck
                                        className='check-icon me-1'
                                        onClick={()=>{
                                            props.onUpdateCategory(updateCategory)
                                            setEditable({id: item.id, isEditable: false})
                                        }}/>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="col-10">
                                    <Form.Label>
                                        {item.name}
                                    </Form.Label>
                                </div>
                                <div className="col-2 float-end">
                                    <AiFillDelete
                                        className='me-1 mt-1 delete-icon'
                                        onClick={()=>{
                                            props.onDeleteCategory(item.id)
                                        }}/>
                                    <AiFillEdit
                                        className='me-1 mt-1 edit-icon'
                                        onClick={()=>{
                                        setEditable({id: item.id, isEditable: true})
                                        setUpdateCategory({
                                            updateCategoryId: item.id,
                                            updateCategoryName: item.name
                                        })
                                    }}/>
                                </div>
                            </div> 
                        }
                    </ListGroupItem>
                   )
                })
            }
        </ListGroup>
    </div>
  )
}

export default CategoryList
