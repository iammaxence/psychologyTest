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
          title="Test 1"
          key={`Menu${2}`}
          action={() => setMenuSelection(2)}
        />
        <SimpleButton
          title="Test 2"
          key={`Menu${3}`}
          action={() => setMenuSelection(3)}
        />
      </div>
    </div>
  );
};

export default Menu;
