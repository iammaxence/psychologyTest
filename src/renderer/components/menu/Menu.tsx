import SimpleButton from '../button/SimpleButton';
import './Menu.scss';

interface PropsMenu {
  setMenuSelection: (selection: number) => void;
}
const Menu = ({ setMenuSelection }: PropsMenu) => {
  return (
    <div>
      <h1>Choix du menu</h1>
      <div className="menuButtonList">
        <SimpleButton
          title="Commencer entrainement"
          key={`Menu${1}`}
          action={() => setMenuSelection(1)}
        />
        <SimpleButton
          title="Commencer le test"
          key={`Menu${2}`}
          action={() => setMenuSelection(2)}
        />
      </div>
    </div>
  );
};

export default Menu;
