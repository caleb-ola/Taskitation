import React, { useState } from "react";
import "./App.css";
import InputField from "./components/inputField";
import Todolist from "./components/todolist";
import Todo from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  // const data = [{ id: "t1", text: "Finish the course" }];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };
  // console.log(todos);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (destination === null) return;

    if (
      destination?.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "Todoslist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination?.droppableId === "Todosremove") {
      complete.splice(destination?.index, 0, add);
    } else if (destination?.droppableId === "Todoslist") {
      active.splice(destination?.index, 0, add);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="header">TASKITATION</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <Todolist
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
