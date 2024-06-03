import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./service/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "20px 30px",
            borderRadius: "8px",
            gap: "20px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
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
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "background 0.3s",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#d32f2f")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#f44336")
            }
          >
            Sign Out
          </button>
        </div>
        {users.length === 0 ? (
          <button
            type="button"
            onClick={getUsers}
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
              ((e.currentTarget as HTMLElement).style.background = "#45a049")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#4CAF50")
            }
          >
            All users
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={getUsers}
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
                ((e.currentTarget as HTMLElement).style.background = "#45a049")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#4CAF50")
              }
            >
              Refresh users
            </button>
            <ol
              style={{
                padding: "20px",
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
                    Email: {email} -
                    <span
                      style={{
                        color: isActivated ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {isActivated ? "activated" : "disabled"}
                    </span>
                  </p>
                </li>
              ))}
            </ol>
          </>
        )}
      </header>
    </div>
  );
}

export default observer(App);
