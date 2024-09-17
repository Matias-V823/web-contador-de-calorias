import { useMemo } from "react";
import { Activity } from "../types";

type CalorieTrackerProps = {
  activities: Activity[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  // Contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.categoria === 1 ? total + activity.calorias : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(()=> activities.reduce((total, activity) => activity.categoria ===2 ? total + activity.calorias: total ,0) ,[activities]);


  const caloriesDay = useMemo(()=> caloriesBurned-caloriesConsumed ,[activities])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center mt-5">
        Resumen de Calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-5 mt-10">
        <div className="bg-lime-600 rounded-full w-48 h-48 flex flex-col justify-center items-center text-center">
          <span className="font-black text-5xl text-zinc-800">
            {caloriesConsumed}
          </span>
          <span className="text-white font-semibold mt-2">Consumidas</span>
        </div>
        <div className="bg-zinc-800 rounded-full w-48 h-48 flex flex-col justify-center items-center text-center">
          <span className="font-black text-5xl text-white">
            {caloriesDay}
          </span>
          <span className="text-white font-semibold mt-2">Actual</span>
        </div>
        <div className="bg-orange-600 rounded-full w-48 h-48 flex flex-col justify-center items-center text-center">
          <span className="font-black text-5xl text-orange-500">
            {caloriesBurned}
          </span>
          <span className="text-white font-semibold mt-2">Quemadas</span>
        </div>
      </div>
    </>
  );
};

export default CalorieTracker;
