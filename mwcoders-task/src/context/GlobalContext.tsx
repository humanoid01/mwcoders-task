import React from 'react';
import { ResultType } from '../types/calcTypes';

export const GlobalContext = React.createContext({
  results: [] as ResultType[],
  getResults: () => {},
});
