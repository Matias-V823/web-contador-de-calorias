import { Dispatch, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import categories from '../data/categories';
import { Activity } from '../types';
import { ActivityState, ActivityActions } from '../reducers/activity-reducer';

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}



const Form = ({dispatch, state} : FormProps) => {


    const initialState : Activity = ({
        id: uuidv4(),
        categoria: 1,
        actividad: '',
        calorias: 0
    })

    const [activity, setActivity] = useState<Activity>(initialState)

    
    useEffect(() => { 
        if(state.activeId){
            const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        const isNumberField = ['categoria', 'calorias'].includes(e.target.id)


        setActivity({
            ...activity,
            [id]: isNumberField ? +value : value
        })
    }

    const validacionForm = () => {
        const { actividad, calorias } = activity;
        return actividad.trim() !== '' && calorias > 0
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch({type: 'save-activity', payload: {newActivity : activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }




    return (
        <form 
            className="bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <div className='flex flex-col'>
                    <label htmlFor="categoria">Categoria:</label>
                    <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="categoria" value={activity.categoria} onChange={handleChange}>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id} >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="actividad">Actividad: </label>
                    <input id='actividad' type="text" className='p-2 rounded-lg border border-slate-300' placeholder='Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, etc.' value={activity.actividad} onChange={handleChange} />

                </div>
                <div className='flex flex-col'>
                    <label htmlFor="calorias">Calorías</label>
                    <input type="number" name="" id="calorias" className='p-2 rounded-lg border border-slate-300' value={activity.calorias} onChange={handleChange} />
                </div>
            </div>
            <input
                type="submit"
                className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer mt-4 rounded-md disabled:opacity-10'
                value={activity.categoria === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!validacionForm()}

            />
        </form>
    )
}

export default Form