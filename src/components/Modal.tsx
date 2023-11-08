import Confetti from './Confetti';
import * as classNames from 'classnames';
import Social from './Social';

const Modal = ({ isOpen, setIsOpen, level }: any) => {
  return (
    <section className={classNames('modal', { 'modal-open': isOpen })}>
      <button
        className="close"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        X
      </button>
      <div className="medal">🎉</div>
      <h1>Herzlichen Glückwünsch!</h1>
      <h2>
        Du hast <b>Level {level}</b> erreicht.
      </h2>
      <b>Mach weiter so!</b>
      <Confetti trigger={isOpen} />
      <Social />
    </section>
  );
};
export default Modal;
