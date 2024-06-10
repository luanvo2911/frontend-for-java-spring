import { useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../utils/http-common";
import Cookies from "js-cookie";

export const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState<string>("");
  const [secondname, setSecondname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleLogin = () => {
    instance
      .post("/api/v1/auth/signup", {
        firstname: firstname,
        secondname: secondname,
        email: email,
        password: password,
        role: role
      })
      .then(() => {
        instance
          .post("/api/v1/auth/signin", {
            email: email,
            password: password,
          })
          .then((res) => {
            Cookies.set("token", res.data.token, { expires: 7, secure: true });
            Cookies.set("role", res.data.role);
            navigate("/home");
          })
          .catch(() => {
            alert("User not found or incorrect password");
          });
      });
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-slate-300">
      <div className="w-full md:w-[500px] h-full md:h-[500px] bg-auth bg-no-repeat bg-cover bg-center rounded-xl">
        <div className="h-1/3 pt-14 p-16 text-end text-white text-3xl font-bold font-serif">
          Sign up
        </div>
        <div className="flex flex-col justify-center h-1/3">
          <div className="flex flex-col p-16 space-y-6">
            <input
              className="h-10 rounded-xl border-solid p-4"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
            <input
              className="h-10 rounded-xl border-solid p-4"
              placeholder="Second Name"
              value={secondname}
              onChange={(e) => {
                setSecondname(e.target.value);
              }}
            />
            <input
              className="h-10 rounded-xl border-solid p-4"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="h-10 rounded-xl border-solid p-4"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              className="h-10 rounded-xl border-solid p-4"
              placeholder="Role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center h-1/3 pt-12">
          <div className="">
            <p className="text-white px-4">
              Already have an account?{" "}
              <a href="/" className="font-bold text-slate-400 hover:text-white">
                Sign in
              </a>
            </p>
          </div>
          <div className="pt-4">
            <button
              className="bg-white px-4 py-1 text-xl font-serif font-bold rounded-lg hover:bg-slate-300"
              onClick={handleLogin}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
