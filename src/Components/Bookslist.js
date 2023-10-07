import React, { useReducer, useState } from 'react';

const booksdata = [
    {id: 1,
    name: "Bangla",
    },

    {id: 2,
    name: "English",
    },
    
    {id: 3,
    name: "Mathematics",
    },
]



const Bookslist = () => {

   const [bookname, setBookname] = useState("");

   const  intialvalues = {
        books: booksdata,
        isModelopen: false,
        isModeltext: ""

    }
    
    function reducer(state, action) { 

          if(action.type === "ADD") {
            const allbooks = [...state.books, action.payload]
            return (
              {...state,
               books: allbooks,
               isModelopen: true,
               isModeltext:"Book is Added",
              })
          }

          else if(action.type === "REMOVE") {
            const allbooks = [...state.books].filter((book) => {return book.id !== action.payload} );
            return ({
              ...state,
              books:allbooks,
              isModelopen: true,
              isModeltext:"Book is removed",
            })
          }
     return state;
      
    }
    
    const [bookstate, dispatch] = useReducer(reducer, intialvalues);
    
    console.log(bookstate.books)

    function handleSubmit(event){
      event.preventDefault();
      console.log(bookname)
     const newBook = {id: new Date().getTime().toString(), name: bookname}
      dispatch({type: "ADD", payload: newBook})

      setBookname("");
    }
    function removeBooks(id){
     
     dispatch({type:"REMOVE", payload:id} )
    }

  return (
    <div>
      <h3>Books List</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange ={(e)=>{return setBookname(e.target.value)} }value={bookname}></input>
        <button type='submit'> Add Book</button>
      </form>
        {bookstate.isModelopen && <p>{bookstate.isModeltext}</p>}
        {bookstate.books.map((book) =>{return <li key={Math.random()}>{book.name} <button onClick={() =>{removeBooks(book.id)}}>Remove</button></li>})}
    </div>
  )
}

export default Bookslist;