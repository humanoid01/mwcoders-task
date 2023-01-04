import React, { useState, useContext, useRef } from 'react';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { GlobalContext } from './../../context/GlobalContext';
import './Calculator.scss';
import { CalculatorSingle } from './CalculatorSingle/CalculatorSingle';
export const Calculator = () => {
  const [firstNum, setFirstNum] = useState<string>('');
  const [secondNum, setSecondNum] = useState<string>('');
  const [result, setResult] = useState<string | number>('');
  const [isFirstInputActive, setIsFirstInputActive] = useState<boolean>(true);
  const [isSecondInputActive, setIsSecondInputActive] =
    useState<boolean>(false);
  const resultsCollectionRef = collection(db, 'results');
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const { getResults } = useContext(GlobalContext);

  const operateCalc = (operator: string): number => {
    const firstRealNum = +firstNum;
    const secondRealNum = +secondNum;

    switch (operator) {
      case '+':
        return +(firstRealNum + secondRealNum).toFixed(2);

      case '-':
        return +(firstRealNum - secondRealNum).toFixed(2);

      case '/':
        return +(firstRealNum / secondRealNum).toFixed(2);

      default:
        return +(firstRealNum * secondRealNum).toFixed(2);
    }
  };
  const getResultSendToDb = async (res: number | string) => {
    if (!firstNum || !secondNum) return;

    setResult(res);
    await addDoc(resultsCollectionRef, { answer: res, id: Date.now() });
    getResults();
  };

  const checkSyntax = (buttonVal: string, isFirstNum: boolean) => {
    if (isFirstNum) {
      if (buttonVal === '.' && firstNum.includes('.')) {
        alert(`You've already used comma.`);
        return;
      }
      setFirstNum(prev => prev + buttonVal);
    } else {
      if (isNaN(Number(secondNum))) {
        alert('Please use numbers only');
        return;
      }
      if (buttonVal === '.' && secondNum.includes('.')) {
        alert(`You've already used comma.`);
        return;
      }
      setSecondNum(prev => prev + buttonVal);
    }
  };

  const produceToInput = (buttonVal: string) => {
    if (firstInputRef.current && isFirstInputActive) {
      checkSyntax(buttonVal, true);
    } else if (secondInputRef.current && isSecondInputActive) {
      checkSyntax(buttonVal, false);
    }
    return;
  };

  const props = {
    produceToInput,
    setFirstNum,
    setSecondNum,
    getResultSendToDb,
    operateCalc,
    setResult,
    setIsFirstInputActive,
    setIsSecondInputActive,
    firstNum,
    secondNum,
    firstInputRef,
    secondInputRef,
    result,
  };

  return <CalculatorSingle {...props} />;
};
