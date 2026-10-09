import React, { useState, useRef } from 'react'

//day5

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Ahmad',
      age: 18
    }
  ])
  const [editUser, setEditUser] = useState(null)   // кого сейчас редактируем
  const dialogRef = useRef(null)                   // ссылка на <dialog>

  function dltUser(id) {
    setData(data.filter((elem) => elem.id !== id))
  }

  const addsubmit = (e) => {
    e.preventDefault()
    let newUser = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value
    }
    setData([...data, newUser])
    e.target.reset()
  }

  // открыть окно редактирования
  const openEdit = (user) => {
    setEditUser(user)
    dialogRef.current.showModal()
  }

  // сохранить изменения
  const editSubmit = (e) => {
    e.preventDefault()
    setData(
      data.map((elem) =>
        elem.id === editUser.id
          ? { ...elem, name: e.target.name.value, age: e.target.age.value }
          : elem
      )
    )
    dialogRef.current.close()
    setEditUser(null)
  }

  // закрыть без сохранения
  const closeEdit = () => {
    dialogRef.current.close()
    setEditUser(null)
  }

  return (
    <div>
      <div>
        <form onSubmit={addsubmit}>
          <input type="text" placeholder='name..' name='name' />
          <input type="text" placeholder='age' name='age' />
          <button type='submit'>Save</button>
        </form>
      </div>

      <dialog ref={dialogRef}>
        {/* key нужен, чтобы defaultValue обновлялся для каждого пользователя */}
        <form onSubmit={editSubmit} key={editUser?.id}>
          <input
            type="text"
            placeholder='name..'
            name='name'
            defaultValue={editUser?.name}
          />
          <input
            type="text"
            placeholder='age'
            name='age'
            defaultValue={editUser?.age}
          />
          <button type='submit'>Save</button>
          <button type='button' onClick={closeEdit}>Cancel</button>
        </form>
      </dialog>

      {data.map((elem) => {
        return (
          <div key={elem.id}>
            <h1>{elem.name}</h1>
            <p>{elem.age}</p>
            <button onClick={() => dltUser(elem.id)}>Delete</button>
            <button onClick={() => openEdit(elem)}>edit</button>
          </div>
        )
      })}
    </div>
  )
}

export default App
