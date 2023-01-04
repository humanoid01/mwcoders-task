import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../src/firebase';
import { GlobalContext } from './GlobalContext';
import { ResultType } from '../types/calcTypes';

export const ContextWrapper = (props: any) => {
  const [results, setResults] = useState<ResultType[]>([]);
  const resultCollectionRef = collection(db, 'results');

  const getResults = async () => {
    const data = await getDocs(resultCollectionRef);
    setResults(
      data.docs.map(doc => ({ answer: doc.data().answer, id: doc.data().id }))
    );
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <GlobalContext.Provider value={{ results, getResults }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
