import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  }
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-slate-300">
      <div className="w-full md:w-[500px] h-full md:h-[400px] bg-auth bg-no-repeat bg-cover bg-center rounded-xl">
        <div className="h-1/3 pt-14 p-16 text-end text-white text-3xl font-bold font-serif">
          Sign in
        </div>
        <div className="flex flex-col justify-center h-1/3">
          <div className="flex flex-col p-16 space-y-6">
            <input className="h-10 rounded-xl border-solid p-4" placeholder="Username" />
            <input className="h-10 rounded-xl border-solid p-4" placeholder="Password" />
            <p className="text-white px-4">Don't have account? <a href="/signup" className="font-bold text-slate-400 hover:text-white">Sign up</a></p>
          </div>
        </div>
        <div className="flex flex-col items-center h-1/3">
          <div className="pt-8">
            <button className="bg-white px-4 py-1 text-xl font-serif font-bold rounded-lg hover:bg-slate-300" onClick={handleLogin}>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  );
};
