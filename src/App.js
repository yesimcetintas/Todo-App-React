import AddTodoForm from './components/AddTodoForm';
import Button from 'react-bootstrap/Button';
import AddNewCategoryModal from './components/AddNewCategoryModal';
import './App.css';
import { useState } from 'react';

import AddNewStatusModal from './components/AddNewStatusModal';
import TodoList from './components/TodoList/TodoList';
import Filter from "./components/Filter"



function App() {

  const [todoList, setTodoList] = useState([
    {selectCategoryId: "1", selectStatusId:"2", todoId:"3", todoText:"Süpürge yapılacak"},
    {selectCategoryId: "6", selectStatusId:"5", todoId:"4", todoText:"Ödevler yapılacak"}
  ])

  const [categoryList, setCategoryList] = useState([
    {id: "1", name:"Ev işleri"},
    {id: "6", name:"Eğitim"}
  ])

  const [statusList, setStatusList] = useState([
    {color:"primary", statusId:"2", categoryId:"1", name:"yapılacak."},
    {color:"success", statusId:"3", categoryId:"1", name:"yapılıyor."},
    {color:"success", statusId:"5", categoryId:"6", name:"başlandı."},
    {color:"danger", statusId:"6", categoryId:"6", name:"başlanmadı."}
  ])

  const handleAddTodo = (form) => {
    if(form.todoText === ""){
      alert("yapılacak iş eklemelisiniz!")
      return
    }
    const values={
      selectCategoryId: form.selectCategoryId,
      selectStatusId:form.selectStatusId,
      todoText: form.todoText,
      todoId: String(Math.round(Math.random()*5000))
    }

    setFilteredTodoList([...filteredTodoList, values])

    setTodoList([...todoList, values])
  }

  const handleAddCategory = (category) =>{
    if( category.categoryText === ""){
      alert ("Kategori adını girmelisiniz.")
      return;
    }
    const values = {
      name: category.categoryText,
      id: String(Math.round(Math.random()*5000))
    }
    setCategoryList([...categoryList, values])
  }

  const handleAddStatus = (status) => {
    if(status.statusText === ""){
      alert("Statü adını girmelisiniz.")
      return
    }
    if(status.selectCategoryId ===""){
      alert("Kategori adını girmelisiniz.")
      return
    }
    const values = {
      categoryId: status.selectCategoryId,
      statusId: String(Math.round(Math.random()*5000)),
      name: status.statusText,
      color: status.color
    }
    setStatusList([...statusList, values])
  }

  const [showCategory, setShowCategory] = useState(false);
  const handleShowCategory = () => setShowCategory(true);
  const handleCloseCategory = () => setShowCategory(false);

  const [showStatus, setShowStatus] = useState(false);
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = () => setShowStatus(true);

  const handleDeleteTodo = (id) => {
    const newTodoList = todoList.filter((elm)=>
      elm.todoId !== id
    )
    setTodoList(newTodoList)
  }

  const handleDeleteCategory = (categoryId) => {
    const newCategoryList = categoryList.filter((elm)=>
      elm.id !== categoryId
    )

    const newTodoList = todoList.filter((elm)=>
      elm.selectCategoryId !== categoryId
    )

    const newTodoListLength = newTodoList.length
    const confirmText = newTodoListLength + " tane yapılacak iş silinecektir. Onaylıyor musun?"
    if (window.confirm(confirmText) === false){
      return
    }else{
      setFilteredTodoList(newTodoList)

      setCategoryList(newCategoryList)
    }

  }

  const handleUpdateTodoList = (newTodo) => {
    const updateTodo = todoList.find((elm)=>
      elm.todoId === newTodo.todoId
    )

    updateTodo.todoText = newTodo.updateTodoText
    updateTodo.selectCategoryId = newTodo.selectCategoryId
    updateTodo.selectStatusId = newTodo.selectStatusId
    
    setTodoList([...todoList])

  }

  const handleUpdateCategory = (newCategory) => {
    const updateCategory = categoryList.find((elm)=>
      elm.id === newCategory.updateCategoryId
    )

    updateCategory.name = newCategory.updateCategoryName

    setCategoryList([...categoryList])

  }

  const handleUpdateStatus = (newStatus) => {
    const updateStatus = statusList.find((elm) =>
      elm.statusId === newStatus.updateStatusId && elm.categoryId ===newStatus.updateCategoryId
    )
    
    updateStatus.name=newStatus.updateStatusName
    updateStatus.categoryId=newStatus.updateCategoryId
    updateStatus.color=newStatus.updateStatusColor

    setStatusList([...statusList])
  }

  const handleDeleteStatus = (categoryId, statusId) => {

    const deletecategoryArr = statusList.filter((elm)=>
      elm.categoryId === categoryId
    )

    const deleteIndex = deletecategoryArr.findIndex((elm)=>
      elm.statusId === statusId
    )

    const updateTodoStatusObj = todoList.find((elm)=>
      elm.selectStatusId ===statusId)
    
    if( deletecategoryArr.length === 1){
      alert("Bir sonraki statü değeri olmadığı için son kalan statü silinemez. Düzenleme yapabilirsiniz.")
      return
    }

    updateTodoStatusObj.selectCategoryId = deletecategoryArr[deleteIndex+1].categoryId
    updateTodoStatusObj.selectStatusId= deletecategoryArr[deleteIndex+1].statusId
    
    setTodoList([...todoList])

    const newStatusList = statusList.filter((elm)=>
      elm.statusId !==statusId
    )
    setStatusList(newStatusList)

  }

  let filteredCategoryList=[]

  let filteredStatusList =[] 

  filteredCategoryList=[...categoryList]
  filteredStatusList=[...statusList]

  let [filteredTodoList, setFilteredTodoList] = useState(todoList)

  console.log("filteredtodolist",filteredTodoList)
  console.log("todoList",todoList)

  const handlerFiltered = (filteredForm) =>{
    let searchResult = todoList;
    console.log("searchResult",searchResult)
    console.log("filteredForm",filteredForm)

    if(filteredForm.selectCategoryId !== '0' && filteredForm.selectCategoryId !== '') {
      searchResult = searchResult.filter(item=>item.selectCategoryId ===  filteredForm.selectCategoryId);
    }

    if(filteredForm.selectStatusId !== '0' && filteredForm.selectStatusId !== ''  ) {
      searchResult = searchResult.filter(item=>item.selectStatusId ===  filteredForm.selectStatusId);
    }
    setFilteredTodoList(searchResult);

  }

  return (
    <div className='app'>
      <div className="row">
        <div className="col-12">
          <Button 
            variant="dark" 
            size='sm'
            onClick={handleShowStatus} 
            className="float-end mt-3 addStatus"
          >
              Statü Ekle
          </Button>
          <AddNewStatusModal
            categoryList={categoryList}
            statusList={statusList}
            show={showStatus}
            onAddStatus = {handleAddStatus}
            onClick= {handleCloseStatus}
            onUpdateStatus={handleUpdateStatus}
            onDeleteStatus={handleDeleteStatus}
          />
          <Button
            variant="dark" 
            size='sm'
            onClick={handleShowCategory}
            className="float-end me-1 mt-3">
              Kategori Ekle
          </Button>
          <AddNewCategoryModal
            onAddCategory = {handleAddCategory}
            categoryList= {categoryList}
            show={showCategory}
            onClick={handleCloseCategory}
            onDeleteCategory={handleDeleteCategory}
            onUpdateCategory={handleUpdateCategory}
          />
          
        </div>
      </div>
      <div className="row">
        <div className="col-6 filtered">
          <Filter
            filteredCategoryList={filteredCategoryList}
            filteredStatusList={filteredStatusList}
            onFiltered={handlerFiltered}/>
        </div>
      </div>
      <div className="row">
        <div className="col-8 mx-auto mt-5">
          <AddTodoForm
            onAddTodo={handleAddTodo}
            categoryList={categoryList}
            statusList={statusList}
          />
        </div>

      </div>
      <div className="row">
        <div className="col-8 mt-3 mx-auto">
            <TodoList
              todoList={filteredTodoList}
              categoryList={categoryList}
              statusList={statusList}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodoList={handleUpdateTodoList}
            />
        </div>
      </div>

      
    </div>
  );
}

export default App;
