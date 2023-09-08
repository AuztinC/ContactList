import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [hash, setHash] = useState(window.location.hash.slice(1)*1)
  useEffect(()=>{
    fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
  }, [])

  useEffect(()=> {
    window.addEventListener("hashchange", ()=>{
      setHash(window.location.hash.slice(1)*1)
    })
  }, [])

  const user = users.find( user => user.id === hash)
  return (
    <>
    <h1> Today we have { users.length } Users! </h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id } className={ hash === user.id ? "selected" : null }>
                <a href={`#${user.id === hash ? "" : user.id}`}>
                  { user.name }
                </a>
              </li>
            )
          })
        }
      </ul>

      {
        user ? <div>
          { user.email } <br></br>
          { user.company.name } <br></br>
          { user.phone }
        </div> : null
      }
    </>
  )
}

export default App
