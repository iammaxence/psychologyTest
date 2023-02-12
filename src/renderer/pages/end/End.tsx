import SimpleButton from 'renderer/components/button/SimpleButton';
import './End.scss';

interface EndProps {
  callback: () => void;
}
const End = ({ callback }: EndProps) => {
  return (
    <div>
      <h1 className="end--title">Le test est terminé</h1>
      <SimpleButton title="Retour au menu" action={callback} />
    </div>
  );
};

export default End;
