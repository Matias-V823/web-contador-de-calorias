import { useReducer, useEffect, useMemo } from 'react'
import Form from "./Components/Form"
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './Components/ActivityList'
import CalorieTracker from './Components/CalorieTracker'

function App() {

  //dispatch es una fx especial que me va a permitir ejecutar las acciones del activity-reducer
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])


  const canRestartApp = () => useMemo(() => state.activities.length > 0 ,[state.activities])


  return (
    <>
      <header className="bg-lime-600 py-2">
        <div className='max-w-4xl mx-auto flex justify-between'>
          <h1 className="text-xl text-white text-center font-bold uppercase">Dashboard Contador de Calorias</h1>
          <button className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
           disabled={!canRestartApp} 
           onClick={() => dispatch({type: 'restart-app'})}>
            Reiniciar App</button>
        </div>
      </header>
      <main className="bg-lime-500 grid md:grid-cols-2 py-20 px-5 mx-auto  mb-20">
        <div>
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
        <div>
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </main>
      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
