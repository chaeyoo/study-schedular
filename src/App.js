import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import React, {useReducer, useRef} from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE': {
      newState = [ action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((el) => el.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((el) =>
        el.id === action.data.id ? { ...action.data } : el
      );
      break;
    }
    default: {
      return state;
    }
  }

  return newState;

}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion
      },
    });
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onRemove, onEdit
      }}>
        <BrowserRouter>
          <div className="App">

            <Routes>
              <Route path='/' element={<Home/> }/>
              <Route path='/new' element={<New/> }/>
              <Route path='/diary/:id' element={<Diary/> }/>
              <Route path='/edit' element={<Edit/> }/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
