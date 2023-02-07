import SimpleButton from '../button/SimpleButton';
import './Menu.scss';

interface PropsMenu {
  menuList: string[];
  setMenuSelection: (selection: number) => void;
}
const Menu = ({ menuList, setMenuSelection }: PropsMenu) => {
  const displayMenuList = () => {
    return menuList.map((title, index) => (
      <SimpleButton
        title={title}
        key={`Menu${title}`}
        action={() => setMenuSelection(index + 1)}
      />
    ));
  };
  return (
    <div>
      <h1>Choix du menu</h1>
      <div className="menuButtonList">{displayMenuList()}</div>
    </div>
  );
};

export default Menu;
