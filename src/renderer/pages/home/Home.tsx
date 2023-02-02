import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExplanatoryText from 'renderer/feature/explanatoryText/ExplanatoryText';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/testResponse/TestResponse';
import Statistics from 'renderer/feature/statistics/Statistics';
import { getUserSelector } from 'renderer/store/auth';
import './Home.scss';
import Menu from 'renderer/components/menu/Menu';
import BlocManager from '../blocManager/BlocManager';
import TrainingTest from '../trainingTest/TrainingTest';

const Home = () => {
  // const user = useSelector(getUserSelector);

  const [menuSelection, setMenuSelection] = useState(0);

  // function exportResult() {
  //   const columns = [
  //     'Réponse du participant',
  //     'Longueur du stimulus',
  //     'Placement du stimulus',
  //     'Sons',
  //     'Orientation du son',
  //   ];
  //   const rows: string[][] = [];
  //   for (const [, value] of userResponseMap) {
  //     rows.push([
  //       value.response,
  //       value.lengthStimuli,
  //       value.positionStimuli,
  //       'none',
  //       'none',
  //     ]);
  //   }
  //   Statistics.generateFile(user, columns, rows);
  // }

  const goToMenuSelection = useCallback(
    (selection: number) => setMenuSelection(selection),
    []
  );

  const displayMenuSelection = () => {
    switch (menuSelection) {
      case 1:
        return <TrainingTest sendResult={() => ''} />;
      case 2:
        return <BlocManager />;
      default:
        return <Menu setMenuSelection={goToMenuSelection} />;
    }
  };

  return <div className="home">{displayMenuSelection()}</div>;
};

export default Home;
