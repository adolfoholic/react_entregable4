import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'


const baseURL = 'https://users-crud1.herokuapp.com'

function App() {
 
  const [users, setUsers] = useState()
  //Esto para pasar info desde userCard hasta formUser
  const [updateInfo, setUpdateInfo] = useState()
  const [formIsClose, setformIsClose] = useState(true)

  //Para hacer el get de todos los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))//el set renderiza el componente
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getAllUsers() //esta funcion ya tiene el set
  },[])

  //Para crear un nuevo usuario
  const createNewUser = data =>{
    const URL = `${baseURL}/users/`
    axios.post(URL, data)//data se recibe como parametro de la funcion
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  //Para eliminar un usuario especifico
  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        alert("Se eliminó el registro con éxito")
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  //Para actualizar un usuario en especifico
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const handleOpenForm = () =>{
    setformIsClose(false)
    setUpdateInfo()
  }

  return (
    <div className="App">
      <div className="App__container-title">
      <h1 className="App__title">WebApp ⇛ Users CRUD 🧾</h1>
          <button onClick={handleOpenForm} className="App__btn">Create a New User</button>
          </div>
           <div className={`form-container ${formIsClose && "disable__form"}`}>
            <FormUsers
              createNewUser={createNewUser}
              updateInfo={updateInfo}
              updateUserById={updateUserById}
              setUpdateInfo={setUpdateInfo}
              setformIsClose={setformIsClose}
            />
     </div>
     <div className="users-container">
     {
      users?.map(user => (
        <UserCard
        key={user.id}
        user={user}
        deleteUserById={deleteUserById}
        setUpdateInfo={setUpdateInfo}
        setformIsClose={setformIsClose}
        />
      ))
     }
     </div>
    </div>
  )
}

export default App
