import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../utils/http-common";
import Todo from "../Model/Todo";

export const DetailPage = () => {
  const todo_id = String(useParams().id);
  const [detail, setDetail] = useState<Todo | undefined>(undefined);
  useEffect(() => {
    setTimeout(()=>{
      instance.get("/todos/" + todo_id).then((res) => {
        setDetail(res.data);
      });
    }, 2000);
  }, [todo_id]);

  return <div>
    <div>ID: {detail ? detail.id : "Loading ..."}</div>
    <div>User_id: {detail ? detail.user_id : "Loading ..."}</div>
    <div>Username: {detail ? detail.username : "Loading ..."}</div>
    <div>Email: {detail ? detail.email : "Loading ..."}</div>
    <div>Task: {detail ? detail.todo : "Loading ..."}</div>
    <div>Status: {detail ? detail.status : "Loading ..."}</div>
  </div>;
};
