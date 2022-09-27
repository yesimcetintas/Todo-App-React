import React from 'react'
import Form from 'react-bootstrap/Form';

function CategorySelectList(props) {
  return (
    <div>
        <Form.Select 
          aria-label="Default select example" 
          onChange={props.onChange} 
          value={props.value} 
          name={props.name} 
          size='sm'>
          <option value="0">
            Kategori seçiniz
          </option>
            {
                props.categoryList
                .map((category)=>
                    <option 
                      key={category.id} 
                      value={category.id}>
                        {category.name}
                    </option>
                )
            }
        </Form.Select>
    </div>
  )
}

export default CategorySelectList
