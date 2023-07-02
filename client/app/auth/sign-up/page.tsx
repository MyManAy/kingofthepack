"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { supabase } from "../../utils/supabase";
// import "./page.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signUp(email, password);
  };

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
    // <main className="main">
    //   <div className="container">
    //     <section className="wrapper">
    //       <div className="heading">
    //         <h1 className="text text-large">Sign In</h1>
    //         <p className="text text-normal">
    //           New user?
    //           <span>
    //             <a href="#" className="text text-links">
    //               Create an account
    //             </a>
    //           </span>
    //         </p>
    //       </div>
    //       <form name="signin" className="form" onSubmit={handleSubmit}>
    //         <div className="input-control">
    //           <label htmlFor="email" className="input-label" hidden>
    //             Email Address
    //           </label>
    //           <input
    //             type="email"
    //             name="email"
    //             id="email"
    //             className="input-field"
    //             placeholder="Email Address"
    //             value={email}
    //             onChange={handleEmail}
    //           />
    //         </div>
    //         <div className="input-control">
    //           <label htmlFor="password" className="input-label" hidden>
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             name="password"
    //             id="password"
    //             className="input-field"
    //             placeholder="Password"
    //             value={password}
    //             onChange={handlePassword}
    //           />
    //         </div>
    //         <div className="input-control">
    //           <a href="#" className="text text-links">
    //             Forgot Password
    //           </a>
    //           <input
    //             type="submit"
    //             name="submit"
    //             className="input-submit"
    //             value="Sign In"
    //           />
    //         </div>
    //       </form>
    //       <div className="striped">
    //         <span className="striped-line"></span>
    //         <span className="striped-text">Or</span>
    //         <span className="striped-line"></span>
    //       </div>
    //       <div className="method">
    //         <div className="method-control">
    //           <a href="#" className="method-action">
    //             <span>Sign in with Google</span>
    //           </a>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </main>
  );
}
