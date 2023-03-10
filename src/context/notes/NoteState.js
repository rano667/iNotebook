import React from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    let s1 = {
        "name":"ranjan",
        "class":"10A",
    }
    
    
  return (
    <NoteContext.Provider value={s1}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
