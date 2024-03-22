import { useState, useEffect } from "react";
import { TrashIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
// import { ConfirmDialog } from "../Components/ConfirmDialog";
import instance from "../utils/http-common";
import User from "../Model/User";
import Todo from "../Model/Todo";

export const MainPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [todoList, setTodoList] = useState<Todo[] | undefined>(undefined);
  const [saveTodoID, setSaveTodoID] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: "--",
    user_id: "--",
    username: "unknown",
    email: "unknown",
    todo: "unknown",
    status: "false",
  });
  // const save = useRef(todoList);

  const callAPI_users = () => {
    setTimeout(() => {
      instance
        .get<User[] | undefined>("/users", {})
        .then((res) => setUsers(res.data));
    }, 2000);
  };

  const callAPI_todos = () => {
    setTodoList(undefined);
    setTimeout(() => {
      instance.get<Todo[] | undefined>("/todos", {}).then((res) => {
        setTodoList(res.data);
      });
    }, 2000);
  };

  useEffect(() => {
    callAPI_users();
    callAPI_todos();
  }, []);

  // use tanstack here to get Users and Todolist
  const handleChange = (e: { target: HTMLInputElement }, index: number) => {
    if (todoList) {
      todoList[index].todo = e.target.value;
      setTodoList([...todoList]);
      if (!saveTodoID.includes(todoList[index].id)) {
        setSaveTodoID([...saveTodoID, todoList[index].id]);
      }
    }
  };
  const handleDelete = async (index: number) => {
    if (todoList) {
      await instance
        .delete("/todos/" + todoList[index].id, {})
        .then(() => setTodoList([...todoList]));
    }
    callAPI_todos();
    // Call Back-end to delete item
  };

  const handleSave = () => {
    // Call back-end to update item
    console.log({
      ...newTodo,
      id: String((todoList ? todoList.length : 0) + 1),
    });
    if (todoList && saveTodoID.length > 0) {
      saveTodoID.forEach((id) => {
        const todoUpdate = todoList.filter((item) => item.id === id)[0];
        instance.put("/todos", {
          id: id,
          user_id: todoUpdate.user_id,
          todo: todoUpdate.todo,
          status: todoUpdate.status,
        });
      });
    }
    if (newTodo.todo !== "unknown") {
      instance.post("/todos", {
        id: String((todoList ? todoList.length : 0) + 1),
        user_id: newTodo.user_id,
        todo: newTodo.todo,
        status: newTodo.status,
      });
      setNewTodo({
        id: "--",
        user_id: "--",
        username: "unknown",
        email: "unknown",
        todo: "unknown",
        status: "false",
      });
    }
    callAPI_todos();
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="p-8">
        <p className="font-bold text-3xl py-4">List current users</p>
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-4">ID</th>
              <th className="border border-black p-4">Username</th>
              <th className="border border-black p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users == undefined ? (
              <div>Loading....</div>
            ) : (
              users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="border border-black p-4">{user.id}</td>
                    <td className="border border-black p-4">{user.username}</td>
                    <td className="border border-black p-4">{user.email}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="p-8">
        <div className="flex items-center">
          <p className="font-bold text-3xl py-4 mr-16">
            List current todo list
          </p>
          <button
            className="w-6 h-6 mr-16"
            onClick={() => {
              setTodoList(undefined);
              callAPI_todos();
            }}
          >
            <ArrowPathIcon />
          </button>
          <select
            aria-label="Filter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            {users?.map((u) => {
              return <option value={u.username}>{u.username}</option>;
            })}
          </select>
        </div>
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-4">ID</th>
              <th className="border border-black p-4">User ID</th>
              <th className="border border-black p-4">Username</th>
              <th className="border border-black p-4">Email</th>
              <th className="border border-black p-4">Todo</th>
              <th className="border border-black p-4">Status</th>
              <th className="border border-black p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todoList == undefined ? (
              <div>Loading....</div>
            ) : (
              todoList
                .filter((i) =>
                  filter === "all" ? true : i.username === filter
                )
                .map((todo, index) => {
                  return (
                    <tr key={todo.id}>
                      <td className="border border-black p-4">{todo.id}</td>
                      <td className="border border-black p-4">
                        {todo.user_id}
                      </td>
                      <td className="border border-black p-4">
                        {todo.username}
                      </td>
                      <td className="border border-black p-4">{todo.email}</td>
                      <td className="border border-black p-4">
                        <input
                          required
                          className="hover:cursor-pointer hover:bg-slate-200"
                          id={todo.id}
                          value={todo.todo}
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                        />
                      </td>
                      <td className="border border-black p-4">
                        <select
                          defaultValue={todo.status}
                          className="hover:cursor-pointer hover:bg-slate-200"
                        >
                          <option value="true">Completed</option>
                          <option value="false">In Progress</option>
                        </select>
                      </td>
                      <td className="border border-black p-4">
                        <TrashIcon
                          className="w-5 h-5 hover:cursor-pointer hover:bg-slate-300"
                          onClick={() => {
                            handleDelete(index);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
            )}
            <tr>
              <td className="border border-black p-4">
                {(todoList ? todoList.length : 0) + 1}
              </td>
              <td className="border border-black p-4">
                <select
                  value={newTodo.user_id === "--" ? "choose" : newTodo.user_id}
                  onChange={(e) => {
                    if (e.target.value !== "choose") {
                      setNewTodo({
                        ...newTodo,
                        user_id: e.target.value,
                        username: users?.filter(
                          (i) => i.id == e.target.value
                        )[0].username
                          ? users?.filter((i) => i.id == e.target.value)[0]
                              .username
                          : "undefined",
                        email: users?.filter((i) => i.id == e.target.value)[0]
                          .username
                          ? users?.filter((i) => i.id == e.target.value)[0]
                              .email
                          : "undefined",
                      });
                    }
                  }}
                >
                  <option value="choose">--</option>
                  {users?.map((user) => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.id}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td className="border border-black p-4">
                {newTodo.user_id !== "--"
                  ? users?.filter((i) => i.id == newTodo.user_id)[0].username
                  : "unknown"}
              </td>
              <td className="border border-black p-4">
                {newTodo.user_id !== "--"
                  ? users?.filter((i) => i.id == newTodo.user_id)[0].email
                  : "unknown"}
              </td>
              <td className="border border-black p-4">
                <input
                  required
                  className="hover:cursor-pointer hover:bg-slate-200"
                  onChange={(e) => {
                    setNewTodo({
                      ...newTodo,
                      todo: e.target.value,
                    });
                  }}
                  value={newTodo.todo}
                />
              </td>
              <td className="border border-black p-4">
                <select
                  defaultValue="false"
                  className="hover:cursor-pointer hover:bg-slate-200"
                  onChange={(e) => {
                    setNewTodo({
                      ...newTodo,
                      status: e.target.value,
                    });
                  }}
                >
                  <option value="true">Completed</option>
                  <option value="false">In Progress</option>
                </select>
              </td>
              <td className="border border-black p-4">Add new todos</td>
            </tr>
          </tbody>
        </table>
        <button
          className="p-2 my-2 border border-black bg-slate-200 font-bold text-lg hover:bg-slate-300"
          onClick={handleSave}
        >
          Save
        </button>
        {/* <ConfirmDialog /> */}
      </div>
    </div>
  );
};

//
