import { createContext, useEffect, useState } from "react";

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [state, setState] = useState();

  // useEffect(() => {
  //   fetch("/api/tasks")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setState(data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <TasksContext.Provider
      value={{
        state,
        setState
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
