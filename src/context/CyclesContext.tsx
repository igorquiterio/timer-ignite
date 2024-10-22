import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Cycle, cyclesReducer } from '../reducers/Cycles/reducer';
import {
  ActionTypes,
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  markCurrentCycleAsInterrupetedAction,
} from '../reducers/Cycles/actions';
import { differenceInSeconds } from 'date-fns';

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  iterruptCurrentCycle: () => void;
  createNewCycle: (data: NewCycleFormData) => void;
}
interface CreeateCycleData {
  task: string;
  minutesAmount: number;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initailState) => {
      const storedStateAsJson = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      );
      if (storedStateAsJson) return JSON.parse(storedStateAsJson);

      return initailState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    } else return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreeateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function iterruptCurrentCycle() {
    dispatch(markCurrentCycleAsInterrupetedAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        iterruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
