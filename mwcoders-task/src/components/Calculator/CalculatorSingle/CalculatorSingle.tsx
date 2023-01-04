interface Props {
  produceToInput: Function;
  setFirstNum: Function;
  setSecondNum: Function;
  getResultSendToDb: Function;
  operateCalc: Function;
  setResult: Function;
  setIsFirstInputActive: Function;
  setIsSecondInputActive: Function;
  firstNum: string;
  secondNum: string;
  firstInputRef: React.RefObject<HTMLInputElement>;
  secondInputRef: React.RefObject<HTMLInputElement>;
  result: string | number;
}
export const CalculatorSingle = ({
  produceToInput,
  setFirstNum,
  setSecondNum,
  getResultSendToDb,
  operateCalc,
  firstNum,
  secondNum,
  firstInputRef,
  secondInputRef,
  setResult,
  setIsFirstInputActive,
  setIsSecondInputActive,
  result,
}: Props) => {
  const buttonNums: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
    'C',
  ];
  const buttonOperations: string[] = ['+', '-', '/', '*'];
  const checkSyntax = (str: string, isFirst: boolean) => {
    if (isNaN(Number(str)) && str === '.') {
      alert('Please provide correct syntax');
      return;
    }

    if (isFirst) {
      if ((str === '.' && firstNum.includes('.')) || isNaN(Number(str))) {
        alert(`Please provide correct syntax`);
        return;
      } else {
        setFirstNum(str);
      }
    } else {
      if ((str === '.' && secondNum.includes('.')) || isNaN(Number(str))) {
        alert(`Please provide correct syntax`);
        return;
      } else {
        setSecondNum(str);
      }
    }
  };

  return (
    <div>
      <h3> Hit the operation button to see the result!</h3>
      <div className='calc'>
        <div className='button-box'>
          <div className='button-box-left'>
            {buttonNums.map((num, i) => (
              <button
                onClick={() => {
                  if (num === 'C') {
                    setFirstNum('');
                    setSecondNum('');
                    setResult('');
                    return;
                  }

                  produceToInput(num);
                }}
                className='button black'
                key={i}>
                {num}
              </button>
            ))}
          </div>

          <form className='button-box-right' onSubmit={e => e.preventDefault()}>
            <div className='button-box-right-oper'>
              {buttonOperations.map((oper, i) => (
                <button
                  className='button pink'
                  key={i}
                  onClick={() => getResultSendToDb(operateCalc(oper))}>
                  {oper}
                </button>
              ))}
            </div>
            <div className='button-box-right-inp'>
              <input
                value={firstNum}
                ref={firstInputRef}
                placeholder='Input 1'
                onClick={() => {
                  setIsFirstInputActive(true);
                  setIsSecondInputActive(false);
                }}
                required
                onChange={e => {
                  checkSyntax(e.target.value, true);
                }}
              />
              <input
                value={secondNum}
                ref={secondInputRef}
                placeholder='Input 2'
                onClick={() => {
                  setIsFirstInputActive(false);
                  setIsSecondInputActive(true);
                }}
                required
                onChange={e => {
                  checkSyntax(e.target.value, false);
                }}
              />
              <input
                type='number'
                placeholder='Result'
                value={result}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
