import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Thikr {
  id: number;
  text: string;
  defaultCount: number;
}

interface CounterState {
  [category: string]: {
    [id: number]: number;
  };
}

interface AthkarContextType {
  counters: CounterState;
  incrementCounter: (category: string, id: number) => void;
  decrementCounter: (category: string, id: number) => void;
  resetCounters: (category: string, athkar: Thikr[]) => void;
  resetAllCounters: () => void;
}

const AthkarContext = createContext<AthkarContextType | undefined>(undefined);

type Action =
  | { type: 'INCREMENT'; category: string; id: number }
  | { type: 'DECREMENT'; category: string; id: number }
  | { type: 'RESET_CATEGORY'; category: string; athkar: Thikr[] }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_STATE'; state: CounterState };

function athkarReducer(state: CounterState, action: Action): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.id]: (state[action.category]?.[action.id] || 0) + 1,
        },
      };
    case 'DECREMENT':
      const currentCount = state[action.category]?.[action.id] || 0;
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.id]: Math.max(0, currentCount - 1),
        },
      };
    case 'RESET_CATEGORY':
      const resetCategoryState = { ...state };
      action.athkar.forEach((thikr) => {
        if (!resetCategoryState[action.category]) {
          resetCategoryState[action.category] = {};
        }
        resetCategoryState[action.category][thikr.id] = 0;
      });
      return resetCategoryState;
    case 'RESET_ALL':
      return {};
    case 'LOAD_STATE':
      return action.state;
    default:
      return state;
  }
}

export function AthkarProvider({ children }: { children: React.ReactNode }) {
  const [counters, dispatch] = useReducer(athkarReducer, {});

  useEffect(() => {
    const savedState = localStorage.getItem('athkar-counters');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', state: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('athkar-counters', JSON.stringify(counters));
  }, [counters]);

  const incrementCounter = (category: string, id: number) => {
    dispatch({ type: 'INCREMENT', category, id });
  };

  const decrementCounter = (category: string, id: number) => {
    dispatch({ type: 'DECREMENT', category, id });
  };

  const resetCounters = (category: string, athkar: Thikr[]) => {
    dispatch({ type: 'RESET_CATEGORY', category, athkar });
  };

  const resetAllCounters = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  return (
    <AthkarContext.Provider
      value={{
        counters,
        incrementCounter,
        decrementCounter,
        resetCounters,
        resetAllCounters,
      }}
    >
      {children}
    </AthkarContext.Provider>
  );
}

export function useAthkar() {
  const context = useContext(AthkarContext);
  if (context === undefined) {
    throw new Error('useAthkar must be used within an AthkarProvider');
  }
  return context;
}