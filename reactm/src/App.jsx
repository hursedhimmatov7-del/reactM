import React, { useState } from 'react'

const App = () => {
  const [data , setData] = useState([
    {
   id : 1 ,
   name : 'Ahmad' ,
   age : 12 ,
   status : true
    },
      {
   id : 2 ,
   name : 'Jafar' ,
   age : 14 ,
   status : false
    }
  ])
  const [addModal , setaddModal] = useState(false)
  const addSave = (event) => {
    event.preventDefault()
    const newUser = {
      id:Date.now() ,
      name : event.target.name.value , 
      age : event.target.age.value , 
      status : false
    }
    setData((prev) => [...prev , newUser])
    setaddModal((prev)=> !prev)
  }
  return (
    <div>
      <button onClick={() => setaddModal((prev)=> !prev)}>ADD+</button>
    <div>
        {
        data.map((elem) => {
          return(
            <div >
              <h1>{elem.name}</h1>
              <h1>{elem.age}</h1>
              <button >Delete</button>
            </div>
          )
        })
      }
    </div>
    {
      addModal?(
        <div>
          <div>
            <h1>Add User</h1>
          </div>
           <form onSubmit={addSave} >
        <input type="text" placeholder='name' name='name' />
        <input type="text" placeholder='age' name='age' />
        <button type='submit'>Save</button>
      </form>
        </div>
    ):null
    }
    </div>
  )
}

export default App