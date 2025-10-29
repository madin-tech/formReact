import { useEffect, useRef, useState } from "react";

const Input = () => {
 
 const storedTodo = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(storedTodo ? storedTodo : []);
 const inputRef = useRef();
  const [edited, setEdited] = useState(null);
useEffect(()=>{
localStorage.setItem("todos", JSON.stringify(todos));
},[todos])
 const form = (e) => {
    e.preventDefault();

if(edited){
const updated = todos.find((todo)=>todo.id==edited);
updated.text = inputRef.current.value;
const newTodo = todos.map((todo) => (todo.id==edited ? updated : todo));
setTodos(newTodo);
setEdited(null);


}else{
   const newTodo = {
     id: Date.now(),
     text: e.target[0].value,
     isCompleted: false,
   };
    setTodos((prev) => [...prev, newTodo]);
}
  
  e.target[0].value = ""; 
  };
  const handleDel = (id)=>{
   
 let deleteArr = todos.filter((todo) => todo.id !== id);
 setTodos(deleteArr);


  };
const handleEdit = (id)=>{
 todos.map((todo) => {
   
    if(todo.id==id){
   setEdited(todo.id);
    inputRef.current.value = todo.text;
    }
})

}
const toggle = (id) => {
  const newArr =  todos.map((todo) => {
    if(id === todo.id)
        return {...todo, isCompleted: !todo.isCompleted}

    return todo
  });

  setTodos(newArr)

    
}
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`,
        marginTop: `60px`,
      }}
    >
      <form action="" onSubmit={form}>
        <input type="text" placeholder="Add todo..." ref={inputRef} />
        <button type="submit"> {edited ? "Update" : "Add"}</button>
      </form>
      <div style={{ display: `flex`, flexDirection: `column` }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
              width: `500px`,
            }}
          >
            <div style={{ padding: `30px` }}>
              <p
                style={{
                  fontSize: `20px`,
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
                onClick={() => toggle(todo.id)}
              >
                {todo.text}
              </p>
            </div>
            <div style={{ display: `flex`, gap: `20px` }}>
              <button
                style={{ padding: `5px 15px` }}
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
              <button
                style={{ padding: `5px 15px` }}
                onClick={() => handleDel(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;
