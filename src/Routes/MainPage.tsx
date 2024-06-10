import { useState, useEffect } from "react";
// import { TrashIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
// import { ConfirmDialog } from "../Components/ConfirmDialog";
// import { useParams } from "react-router-dom";
// import { Pagination } from "antd";
import instance from "../utils/http-common";
import Todo from "../Model/Todo";
import Cookies from "js-cookie";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const role = Cookies.get("role") == "ADMIN" ? "admin" : "user";
  const [newTodo, setNewTodo] = useState<string>("");
  const navigate = useNavigate();
  // const [pagination, setPagination] = useState(0);
  // const [itemPerpage, setItemPerpage] = useState(0);
  // const handleChange = () => {

  // }
  const refreshData = () => {
    instance
      .get(`/api/v1/${role}/0/10`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      });
  };

  const handleCreate = () => {
    instance
      .post(
        `/api/v1/${role}`,
        {
          todos: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then(() => {
        alert("New Todo create sucessfully");
        refreshData();
        setNewTodo("");
      });
  };

  const handleUpdate = () => {
    todos?.map((todo) => {
      instance
        .put(
          `/api/v1/${role}`,
          {
            id: todo.id,
            todos: todo.todos,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
    });
    alert("Update successfully");
    refreshData();
  };

  const handleDelete = (id: number) => {
    instance
      .delete(`/api/v1/${role}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(() => {
        alert("Delete todo successfully");
        refreshData();
      });
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      instance
        .get(`/api/v1/${role}/0/10`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setTodos(res.data);
          console.log(res.data);
        });
    }
  }, [role, navigate]);
  return (
    <div className="w-screen h-screen flex flex-col p-16">
      <div>
        <div>Role : {role}</div>
        <Button
          onClick={() => {
            navigate("/");
            Cookies.remove("token");
          }}
        >
          Sign out
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-4">Todo ID</th>
            <th className="border border-black p-4">User ID</th>
            <th className="border border-black p-4">Detail</th>
            <th className="border border-black p-4"></th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo, index) => {
            // let str = todo.todos;
            return (
              <tr key={todo.id}>
                <td className="border border-black p-4">{todo.id}</td>
                <td className="border border-black p-4">{todo.user_id}</td>
                <td className="border border-black p-4">
                  <input
                    value={todo.todos}
                    onChange={(e) => {
                      // str = e.target.value;
                      // console.log(str)
                      todos[index].todos = e.target.value;
                      setTodos([...todos]);
                    }}
                  />
                </td>
                <td className="border border-black p-4">
                  <Flex gap="small">
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button
                      onClick={() => {
                        handleDelete(parseInt(todo.id));
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="border border-black p-4">New Todo</td>
            <td className="border border-black p-4">User_id</td>
            <td className="border border-black p-4">
              <input
                value={newTodo}
                onChange={(e) => {
                  setNewTodo(e.target.value);
                }}
              />
            </td>
            <td className="border border-black p-4">
              <Button onClick={handleCreate}>Create</Button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <Pagination
        defaultCurrent={1}
        pageSize={itemPerPage}
        pageSizeOptions={[2, 3, 4]}
        showSizeChanger
        onShowSizeChange={(current: number, size: number) => {
          setItemPerPage(size);
          // console.log(itemPerPage, e)
          console.log(current, size);
        }}
        total={total}
        onChange={(page: number) => {
          setPagination(page - 1);
        }}
      /> */}
    </div>
  );
};
