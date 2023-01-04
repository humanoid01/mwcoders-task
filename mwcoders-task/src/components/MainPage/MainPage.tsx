import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './MainPage.scss';
export const MainPage = () => {
  const { results } = useContext(GlobalContext);
  const sortedResults = [...results].sort((a, b) => +a.id - +b.id);
  return (
    <div>
      {sortedResults.map(({ answer, id }, i) => {
        return (
          <div className='result-floor' key={id ? id : i}>
            {answer}
          </div>
        );
      })}
    </div>
  );
};
