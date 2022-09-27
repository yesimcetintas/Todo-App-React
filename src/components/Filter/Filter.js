import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import CategorySelectList from '../CategorySelectList'
import StatusSelectList from '../StatusSelectList'

function Filter(props) {

  const [filteredForm, setFilteredForm] = useState({
    selectCategoryId:"",
    selectStatusId:""
  }) 

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    const newForm = {...filteredForm, [key]: value}
    setFilteredForm(newForm)
}

  return (
    <div className='row'>
      <div className="col-4">
        <CategorySelectList
          categoryList={props.filteredCategoryList}
          onChange={handleChange}
          value={filteredForm.selectCategoryId}
          name="selectCategoryId"/>
      </div>
      <div className="col-4">
        <StatusSelectList
          statusList={props.filteredStatusList}
          onChange={handleChange}
          value={filteredForm.selectStatusId}
          name="selectStatusId"
          selectCategoryId={filteredForm.selectCategoryId}
          />
      </div>
      <div className="col-4">
        <Button
          variant="dark" 
          size='sm'
          onClick={()=>{
            props.onFiltered(filteredForm)
          }}
          >Filtrele</Button>
      </div>
    </div>
  )
}

export default Filter
