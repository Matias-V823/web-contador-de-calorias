import { Activity } from "../types"

//Type initialState
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

//Type que describe lo que pasa en el reducer acciones
//Las acciones nos van a ayudar a describir que es lo que está pasando y que informacion es la que va a modificar la parte del state
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity }  }  | 
    { type: 'set-activeId', payload: { id : Activity['id'] }  }  |
    { type: 'delete-activity', payload: { id : Activity['id'] }  }  |
    { type: 'restart-app' }   




const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

//state inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: '',
}


// reducer
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-activity'){

        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)

        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state, 
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }

    }
    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter(actividad => actividad.id != action.payload.id)
        }
    }
    if(action.type === 'restart-app'){
        return{
            activities: [],
            activeId: ''
        }
    }

    return state
}