import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/FormUsers.css'

const defaultValues= {
  email:"",
  password:"",
  first_name:"",
  last_name:"",
  birthday:""
}

const FormUsers = ({createNewUser, updateInfo, updateUserById, setUpdateInfo, setformIsClose}) => {

  const {handleSubmit, reset, register} = useForm()

  useEffect(() => {
    if(updateInfo){
      reset(updateInfo)
  }else{
    reset(defaultValues)
  }
},[updateInfo])  

  const submit = data => {
    if(updateInfo){
      //Update
      updateUserById(updateInfo.id, data)
      setUpdateInfo()
      alert("Actualización Exitosa")
    }else{
      //Create
      createNewUser(data)
      alert("Registro Exitoso")
    }
    
    reset(defaultValues)
    setformIsClose(true)
  }

  const handleCloseForm = () =>{
    setformIsClose(true)
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <i onClick={handleCloseForm} className="form__x fa-solid fa-xmark"></i>
      <h2 className="form__title">{updateInfo ? "Edit User" : "New User"}</h2>
        <div className="form__div">
            <label className="form__label" htmlFor="email">Email</label>
            <input className="form__input" placeholder="Enter your email" type="email" id="email" {...register("email")}/>
        </div>
        <div className="form__div">
            <label className="form__label" htmlFor="password">Password</label>
            <input className="form__input" placeholder="Enter your password" type="password" id="password" {...register("password")}/>
        </div>
        <div className="form__div">
            <label className="form__label" htmlFor="first_name">First Name</label>
            <input className="form__input" placeholder="Enter your first name" type="text" id="first_name" {...register("first_name")}/>
        </div>
        <div className="form__div">
            <label className="form__label" htmlFor="last_name">Last Name</label>
            <input className="form__input" placeholder="Enter your last name" type="text" id="last_name" {...register("last_name")}/>
        </div>
        <div className="form__div">
            <label className="form__label" htmlFor="birthday">Birthday</label>
            <input className="form__input" type="date" id="birthday" {...register("birthday")}/>
        </div>
        <button className='form__btn'>{updateInfo ? "Update" : "Create"}</button>
    </form>
  )
}

export default FormUsers