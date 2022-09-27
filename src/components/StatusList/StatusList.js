import React, {useState} from 'react'
import { FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlineCloseCircle } from 'react-icons/ai'
import Badge from 'react-bootstrap/Badge';
import CategorySelectList from '../CategorySelectList';
import Form from 'react-bootstrap/Form';

function StatusList(props) {

    const [editable, setEditable] = useState({
        categoryId: "", 
        statusId: "", 
        color:"", 
        isEditable: false
    })

    const [updateStatus, setUpdateStatus] = useState({
        updateCategoryId: "",
        updateStatusId:"",
        updateStatusName:"",
        updateStatusColor:""
    })

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        const newCategoryForm = {...updateStatus, [key]: value}
        setUpdateStatus(newCategoryForm)
    }

  return (
    <div>
        <ListGroup variant="flush">
            {
                props.statusList.map((status, idx)=>{
                    const category = props.categoryList.find((elm)=>
                        elm.id===status.categoryId
                )
                    return(
                        <ListGroupItem key={idx}>
                            {
                                (editable.categoryId === status.categoryId && editable.statusId === status.statusId && editable.isEditable === true)?
                                <div className="row">
                                    <div className="col-4">
                                        <CategorySelectList
                                            categoryList={props.categoryList}
                                            onChange={handleChange}
                                            value={updateStatus.updateCategoryId}
                                            name="updateCategoryId"
                                        />
                                    </div>
                                    <div className="col-3">
                                    <Form.Control
                                        onChange={handleChange}
                                        value={updateStatus.updateStatusName}
                                        name="updateStatusName"
                                        type="text"
                                        autoFocus
                                    />
                                    </div>
                                    <div className="col-3">
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        value={updateStatus.updateStatusColor} 
                                        name="updateStatusColor" 
                                        onChange={handleChange}>
                                            <option>Renk Seçiniz</option>
                                            <option value="primary">Mavi</option>
                                            <option value="secondary">Gri</option>
                                            <option value="success">Yeşil</option>
                                            <option value="warning">Sarı</option>
                                            <option value="danger">Kırmızı</option>
                                    </Form.Select>
                                    </div>
                                    <div className="col-2">
                                        <AiOutlineCloseCircle
                                            className='close-icon me-1'
                                            onClick={()=>{
                                                setEditable({
                                                    categoryId: status.categoryId, 
                                                    statusId: status.statusId, 
                                                    color:status.color, 
                                                    isEditable: false
                                                })
                                            }}/>
                                        <AiOutlineCheck
                                            className='check-icon me-1'
                                            onClick={()=>{
                                                props.onUpdateStatus(updateStatus)
                                                setEditable({
                                                    categoryId: status.categoryId, 
                                                    statusId: status.statusId, 
                                                    color:status.color, 
                                                    isEditable: false
                                                })
                                            }}/>
                                    </div>
                                </div>
                                :
                                <div className="row">
                                    <div className="col-4">
                                        <FormLabel>
                                            {category.name}
                                        </FormLabel>
                                    </div>
                                    <div className="col-3">
                                        <FormLabel>
                                            {status.name}
                                        </FormLabel>
                                    </div>
                                    <div className="col-3">
                                        <Badge className={"bg-"+status.color + " text-white"}>
                                            Color
                                        </Badge>
                                    </div>
                                    <div className="col-2 float-end">
                                        <AiFillDelete
                                            className='me-1 mt-1 delete-icon'
                                            onClick={()=>{
                                                props.onDeleteStatus(status.categoryId, status.statusId)}}
                                        />
                                        <AiFillEdit
                                            className='me-1 mt-1 edit-icon'
                                            onClick={()=>{
                                                setEditable(
                                                    {categoryId: status.categoryId, 
                                                    statusId: status.statusId, 
                                                    color:status.color, 
                                                    isEditable: true})
                                                setUpdateStatus({
                                                    updateCategoryId: status.categoryId,
                                                    updateStatusId: status.statusId,
                                                    updateStatusName: status.name,
                                                    updateStatusColor: status.color
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

export default StatusList
