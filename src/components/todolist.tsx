import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Todo from "../model";
import SingleTodo from "./singleTodo";
import "./styles.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todolist: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="Todoslist">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver && "dragactive"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  key={todo.id}
                />
              );
            })}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="Todosremove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver && "dragcomplete"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  key={todo.id}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Todolist;
