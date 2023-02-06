import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Statistics from 'renderer/feature/utils/statistics/Statistics';
import { getUserSelector } from 'renderer/store/auth';
import './Home.scss';
import Menu from 'renderer/components/menu/Menu';
import BlocManager from '../../feature/blocManager/BlocManager';
import TrainingTest from '../../feature/trainingTest/TrainingTest';
import { BlocResponse } from 'renderer/types/BlocResponse';
import { makeBlocListA, makeBlocListB } from 'renderer/data/BlocList';

const Home = () => {
  const user = useSelector(getUserSelector);

  const [menuSelection, setMenuSelection] = useState(0);

  function exportResult(data: BlocResponse[]) {
    const allResponse = blocResponseListToResponseList(data);
    console.log('All response: ', allResponse);
    const rows: string[][] = [];
    for (const value of allResponse) {
      rows.push([value.response, value.lengthStimuli, value.positionStimuli]);
    }

    const columns = [
      'Réponse du participant',
      'Longueur du stimulus',
      'Placement du stimulus',
      'Sons',
      'Orientation du son',
    ];
    Statistics.generateFile(user, columns, rows);
  }

  function blocResponseListToResponseList(data: BlocResponse[]) {
    console.log('response data: ', data);
    return data.flatMap((blocResponse) => blocResponse.responseList);
  }

  const goToMenuSelection = useCallback(
    (selection: number) => setMenuSelection(selection),
    []
  );

  const displayMenuSelection = () => {
    switch (menuSelection) {
      case 1:
        return <TrainingTest />;
      case 2:
        return (
          <BlocManager blocList={makeBlocListA()} sendData={exportResult} />
        );
      case 3:
        return (
          <BlocManager blocList={makeBlocListB()} sendData={exportResult} />
        );
      default:
        return <Menu setMenuSelection={goToMenuSelection} />;
    }
  };

  return <div className="home">{displayMenuSelection()}</div>;
};

export default Home;
