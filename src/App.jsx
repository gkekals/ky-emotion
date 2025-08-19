import './App.css';
import { useReducer, useRef, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate, data } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';


const mockData = [
  {
    id: 1,
    createDate: new Date("2025-08-17").getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createDate: new Date("2025-07-05").getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  },
  {
    id: 3,
    createDate: new Date("2024-12-05").getTime(),
    emotionId: 4,
    content: "3번 일기 내용"
  }
]

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE":
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ?
          action.data
          : item
      )
    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id)
      )
    default:
      return state
  }
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()
function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(4)

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData
    })
  }, [])

  const onCreate = (createDate, emotionId, content) => {

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content
      }
    })
  }
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content
      }
    })
  }
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }
  return (

    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>

  )
}

export default App
