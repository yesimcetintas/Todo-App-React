import React from 'react'
import Form from 'react-bootstrap/Form';

function StatusSelectList(props) {

  return (
    <div>
        <Form.Select 
            aria-label="Default select example" 
            onChange={props.onChange} 
            value={props.value} 
            name={props.name} 
            size='sm'>
            <option value="0">
                Statü seçiniz
            </option>
            {
                props.statusList.filter((elm)=>
                    elm.categoryId===props.selectCategoryId
                )
                .map((status)=>
                    <option 
                        key={status.statusId} 
                        value={status.statusId}>
                            {status.name}
                    </option>
                )
            }
        </Form.Select>
    </div>
  )
}

export default StatusSelectList
