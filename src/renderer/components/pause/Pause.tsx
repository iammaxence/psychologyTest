interface PropsPause {
  stopPause: () => void;
}
const Pause = ({ stopPause }: PropsPause) => {
  return (
    <div>
      <h1>Pause</h1>
      <button onClick={stopPause}> Reprendre </button>
    </div>
  );
};

export default Pause;
