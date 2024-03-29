import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Statistics from 'renderer/feature/utils/statistics/Statistics';
import { getUserSelector } from 'renderer/store/auth';
import './Home.scss';
import Menu from 'renderer/components/menu/Menu';
import BlocManager from '../../feature/blocManager/BlocManager';
import TrainingTest from '../../feature/trainingTest/TrainingTest';
import { BlocResponse } from 'renderer/interfaces/BlocResponse';
import { makeBlocListA, makeBlocListB } from 'renderer/data/BlocListData';
import {
  transalteLengthStimuliStats,
  translatePositionStimuliStats,
  translateResponseStats,
  translateSoundNameStats,
  translateSoundOrientationStats,
} from 'renderer/feature/translation/StatsTranslation';
import End from '../end/End';
import Stimuli from 'renderer/components/stimuli/Stimuli';

const Home = () => {
  const user = useSelector(getUserSelector);
  const [menuSelection, setMenuSelection] = useState(0);

  const menuList = ['Entrainement', 'Test A', 'Test B'];

  function exportResult(data: BlocResponse[]) {
    setMenuSelection(4);
    const allResponse = blocResponseListToResponseList(data);

    const rows: string[][] = [];
    for (const value of allResponse) {
      rows.push([
        translateResponseStats(value.response),
        transalteLengthStimuliStats(value.lengthStimuli),
        translatePositionStimuliStats(value.middlePosition),
        translateSoundNameStats(value.sound?.name),
        translateSoundOrientationStats(value.sound?.orientation),
      ]);
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
    return data.flatMap((blocResponse) => blocResponse.userStatisticsList);
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
      case 4:
        return <End callback={() => setMenuSelection(-1)} />;
      case 5:
        return (
          <Stimuli
            id={0}
            middleDivergence={0}
            size={500}
            reverseDiagonal={true}
          />
        );
      default:
        return (
          <Menu menuList={menuList} setMenuSelection={goToMenuSelection} />
        );
    }
  };

  return <div className="home">{displayMenuSelection()}</div>;
};

export default Home;
