import { useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../utils/http-common";
import Cookies from "js-cookie";

export const AuthPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    instance
      .post("/api/v1/auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token, { expires: 7, secure: true });
        Cookies.set("role", res.data.role)
        console.log(Cookies.get("token"));
        console.log(Cookies.get("role"));
        navigate("/home");
      })
      .catch(() => {
        alert("User not found or incorrect password");
      });
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-slate-300">
      <div className="w-full md:w-[500px] h-full md:h-[400px] bg-auth bg-no-repeat bg-cover bg-center rounded-xl">
        <div className="h-1/3 pt-14 p-16 text-end text-white text-3xl font-bold font-serif">
          Sign in
        </div>
        <div className="flex flex-col justify-center h-1/3">
          <div className="flex flex-col p-16 space-y-6">
            <input
              className="h-10 rounded-xl border-solid p-4"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <input
              type="password"
              className="h-10 rounded-xl border-solid p-4"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <p className="text-white px-4">
              Don't have account?{" "}
              <a
                href="/signup"
                className="font-bold text-slate-400 hover:text-white"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center h-1/3">
          <div className="pt-8">
            <button
              className="bg-white px-4 py-1 text-xl font-serif font-bold rounded-lg hover:bg-slate-300"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
