"use client";

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { supabase } from "../../utils/supabase";
import "./page.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}`,
        data: {
          username,
        },
      },
    });

    console.log(data.user?.email);
    window.alert(error);
  };

  const handleField =
    (setter: Dispatch<SetStateAction<any>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.length === 0 || email.length === 0 || password.length || 0)
      window.alert("Please fill in all fields");

    signUp(email, password);
  };

  return (
    <main className="main">
      <div className="container">
        <section className="wrapper coolGradient">
          <div className="heading">
            <h1 className="text text-large">Sign In</h1>
            <p className="text text-normal">
              New user?
              <span>
                <a href="#" className="text text-links">
                  Create an account
                </a>
              </span>
            </p>
          </div>
          <form name="signin" className="form" onSubmit={handleSubmit}>
            <div className="input-control">
              <label htmlFor="username" className="input-label" hidden>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="input-field"
                placeholder="Username"
                value={username}
                onChange={handleField(setUsername)}
              />
            </div>
            <div className="input-control">
              <label htmlFor="email" className="input-label" hidden>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="Email Address"
                value={email}
                onChange={handleField(setEmail)}
              />
            </div>
            <div className="input-control">
              <label htmlFor="password" className="input-label" hidden>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={handleField(setPassword)}
              />
            </div>
            <div className="input-control">
              <a href="#" className="text text-links">
                Forgot Password
              </a>
              <input
                type="submit"
                name="submit"
                className="input-submit"
                value="Sign In"
              />
            </div>
          </form>
          <div className="striped">
            <span className="striped-line"></span>
            <span className="striped-text">Or</span>
            <span className="striped-line"></span>
          </div>
          <div className="method">
            <div className="method-control">
              <a href="#" className="method-action">
                <span>Sign in with Google</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
