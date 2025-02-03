/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import styles from "./auth.module.css"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../../firebase/firebase";
import { showAlert } from "../../../utils/alertUtils";


const Auth: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      
      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid }),
      );

      navigate("/home");

    } catch (err: any) {
      showAlert("error",err)
    }
  };

  return (
    <main className={`flex bg-slate-100 justify-center items-center flex-col overflow-hidden h-[100vh]`}>
      <section
        className={`rounded-3xl relative w-[520px] max-w-full overflow-hidden shadow-2xl h-[500px] flex justify-center md:w-[950px] md:inline`}
        ref={containerRef}
      >
    
        <div className={`md:${styles.formContainer}  md:${styles.loginContainer} w-[520px] h-full md:pr-6`}>
          <form
            onSubmit={handleLogin}
            className={`bg-white flex items-center justify-center flex-col px-[50px] h-full text-center ${styles.form}`}
          >
            <h1 className="text-4xl font-bold">Sign In here.</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`${styles.inputLogin}`}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`${styles.inputLogin}`}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className={`${styles.overlayContainer} invisible md:visible`}>
          <div className={styles.overlay}>
            <div
              className={`${styles.overlayPanel} ${styles.overlayLeft} absolute flex items-center justify-center flex-col px-[40px] text-center top-0 h-full w-1/2 translate-x-0`}
            >
              <h1 className="text-5xl font-bold max-w-[300px]">
                manage your items
              </h1>
              <p className="text-lg my-5">
                If you have an account, login here and have fun
              </p>
            </div>

            <div
              className={`${styles.overlayPanel} ${styles.overlayRight} absolute flex items-center justify-center flex-col px-[40px] text-center top-0 h-full w-1/2 translate-x-0 `}
            >
              <h1 className="text-5xl font-bold max-w-[300px]">
                manage your items
              </h1>
              <p className="text-lg my-5">
                If you dont have an account yet, join us and start the journey
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;