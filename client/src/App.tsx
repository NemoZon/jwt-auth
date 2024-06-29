import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./service/UserService";
import { Pages } from "./models/Pages";
import { Articles } from "./models/Articles";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState<Pages>(Pages.SCHEMA);
  const [article, setArticle] = useState<Articles>(Articles.JWT);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (pageName: Pages) => {
    if (pageName === Pages.ALLUSERS) {
      getUsers();
    }
    setPage(pageName);
  };

  if (store.isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading ...</p>
        </header>
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>User is Unauthorized</h1>
          <LoginForm />
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            backgroundColor: "#222222",
          }}
        >
          <div
            style={{
              padding: "5px 20px",
              display: "flex",
              gap: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => changePage(Pages.ALLUSERS)}
              style={{
                padding: "10px 20px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#7dcc81")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#4CAF50")
              }
            >
              All users
            </button>
            <button
              type="button"
              onClick={() => changePage(Pages.SCHEMA)}
              style={{
                padding: "10px 20px",
                background: "#604ff7",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#8c80fc")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#604ff7")
              }
            >
              How it works
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "8px",
              gap: "20px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              User {store.user.email} is Authorized
            </h1>
            <button
              type="button"
              onClick={() => store.logout()}
              style={{
                padding: "10px 20px",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
                background: "#f44336",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#ff2020")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#f44336")
              }
            >
              Sign Out
            </button>
          </div>
        </nav>
        {page === Pages.SCHEMA && (
          <div>
            <nav style={{ display: "flex", gap: "10px" }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setArticle(Articles.JWT);
                }}
              >
                JWT
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setArticle(Articles.INTERCEPTORS);
                }}
              >
                Interceptor
              </a>
            </nav>
            {article === Articles.JWT && (
              <article>
                <p
                  style={{
                    fontSize: "18px",
                  }}
                >
                  JSON Web Token (JWT) authentication is a stateless
                  authentication mechanism used in modern web applications to
                  ensure secure and efficient communication between clients and
                  servers. Here&lsquo;s a detailed explanation of how JWT
                  authentication works:
                </p>
                <ol>
                  <li>
                    User Authentication Request:
                    <ul>
                      <li>
                        The process begins when a user attempts to log in to an
                        application by providing their credentials (e.g.,
                        username and password) to the server.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Server Verifies Credentials:
                    <ul>
                      <li>
                        The server receives the credentials and verifies them
                        against the stored user information in the database. If
                        the credentials are valid, the server proceeds to
                        generate a JWT.
                        <ul>
                          <li>
                            <span>Header:</span> Contains metadata about the
                            token, such as the type of token (JWT) and the
                            signing algorithm (e.g., HS256).
                          </li>
                          <li>
                            <span>Payload:</span> Contains the claims, which are
                            statements about an entity (typically, the user) and
                            additional data. Common claims include sub
                            (subject), exp (expiration time), and custom claims.
                          </li>
                          <li>
                            <span>Signature:</span> Ensures the token has not
                            been tampered with. It is created by encoding the
                            header and payload using Base64Url, then signing it
                            using a secret key or a public/private key pair.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Sending the JWT to the Client:
                    <ul>
                      <li>
                        The server sends the generated JWT back to the client,
                        usually as part of the response body or in an HTTP-only
                        cookie for added security.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Client Stores the JWT:
                    <ul>
                      <li>
                        The client stores the JWT, typically in local storage or
                        a cookie. This token will be used for authenticating
                        subsequent requests.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Client Makes Authenticated Requests:
                    <ul>
                      <li>
                        For every request to a protected route or resource, the
                        client includes the JWT in the Authorization header
                        using the Bearer schema:
                        <pre>
                          <code>{`Authorization: Bearer <token>`}</code>
                        </pre>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Server Verifies the JWT:
                    <ul>
                      <li>
                        Upon receiving a request with a JWT, the server verifies
                        the token&apos;s validity. This involves:
                        <ol>
                          <li>
                            <span>Decoding:</span> Extracting the header,
                            payload, and signature.
                          </li>
                          <li>
                            <span>Verifying Signature:</span> Ensuring the token
                            has not been altered by validating the signature
                            with the same secret key or public key used to sign
                            it.
                          </li>
                          <li>
                            <span>Checking Claims:</span> Ensuring the token is
                            not expired and the claims meet any other criteria
                            required by the application (e.g., checking user
                            roles or permissions).
                          </li>
                        </ol>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Processing the Request:
                    <ul>
                      <li>
                        If the JWT is valid, the server processes the request
                        and allows access to the protected resources. The server
                        can also extract user information from the token&apos;s
                        payload to identify the user making the request.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Response to the Client:
                    <ul>
                      <li>
                        The server sends the response back to the client. If the
                        token is invalid or expired, the server responds with an
                        appropriate error message (e.g., 401 Unauthorized).
                      </li>
                    </ul>
                  </li>
                </ol>
                <img src="../JWT_tokens_EN.webp" />
              </article>
            )}
            {article === Articles.INTERCEPTORS && (
              <article>
                <p
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Using interceptors for JWT authentication allows you to
                  automate the process of adding JWT tokens to requests and
                  handling authentication errors seamlessly. Here’s a detailed
                  explanation of how to use interceptors for JWT authentication:
                </p>
                <ol>
                  <li>
                    Setting Up Axios Interceptor:
                    <ul>
                      <li>
                        First, install Axios if you haven&apos;t already:
                        <pre>
                          <code>npm install axios</code>
                        </pre>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Creating Axios Instance:
                    <ul>
                      <li>
                        Create an Axios instance and configure the interceptor:
                        <div
                          style={{
                            backgroundColor: "#080808",
                            width: "max-content",
                            padding: "2px",
                          }}
                        >
                          <pre>
                            <code>{`import axios from 'axios';
       
       // Create an Axios instance
       const api = axios.create({
           baseURL: 'https://api.example.com',
       });
       
       // Add a request interceptor
       api.interceptors.request.use(
           config => {
               const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
               if (token) {
                   config.headers['Authorization'] = \`Bearer \${token}\`; // Add the token to the Authorization header
               }
               return config;
           },
           error => {
               return Promise.reject(error);
           }
       );
       
       // Add a response interceptor
       api.interceptors.response.use(
           response => {
               return response;
           },
           error => {
               if (error.response.status === 401) {
                   // Handle unauthorized error (token expired or invalid)
                   // Redirect to login or refresh token logic can be added here
                   console.log('Unauthorized, redirecting to login...');
                   window.location.href = '/login';
               }
               return Promise.reject(error);
           }
       );
       
       export default api;`}</code>
                          </pre>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Using Axios Instance:
                    <ul>
                      <li>
                        Use the configured Axios instance in your components:
                        <div
                          style={{
                            backgroundColor: "#080808",
                            width: "max-content",
                            padding: "2px",
                          }}
                        >
                          <pre>
                            <code>{`import React, { useEffect } from 'react';
       import api from './api'; // Import the configured Axios instance
       
       const App = () => {
           useEffect(() => {
               // Example of making a request with the configured Axios instance
               api.get('/protected-route')
                   .then(response => {
                       console.log(response.data);
                   })
                   .catch(error => {
                       console.error(error);
                   });
           }, []);
       
           return <div>Check the console for API response</div>;
       };
       
       export default App;`}</code>
                          </pre>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Summary:
                    <ul>
                      <li>
                        Interceptors are a powerful tool for managing
                        authentication and other cross-cutting concerns in your
                        application. When using JWT tokens, interceptors can
                        automatically add the token to requests, handle token
                        expiration, and manage errors, making the authentication
                        process more seamless and secure.
                      </li>
                    </ul>
                  </li>
                </ol>
                <img
                  style={{ width: "800px" }}
                  src="../1_n7eNojDCLgaAZx149Fir5w.png"
                  alt="JWT Interceptor Diagram"
                />
              </article>
            )}
          </div>
        )}
        {page === Pages.ALLUSERS && (
          <div>
            <ol
              style={{
                padding: "20px",
                fontSize: "18px",
              }}
            >
              {users.map(({ id, email, isActivated }) => (
                <li
                  key={id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <p style={{ margin: "5px 0" }}>
                    Email: {email}
                    <span
                      style={{
                        color: isActivated ? "green" : "red",
                        fontWeight: "bold",
                        fontSize: "12px",
                        verticalAlign: "super",
                        marginBottom: "15px",
                      }}
                    >
                      {isActivated ? "activated" : "disabled"}
                    </span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </header>
    </div>
  );
}

export default observer(App);
