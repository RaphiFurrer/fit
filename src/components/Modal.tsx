import Confetti from './Confetti';
import * as classNames from 'classnames';

const Modal = ({ isOpen, setIsOpen }: any) => {
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
      <h2>Du hast Level 2 erreicht.</h2>
        <p>Mach weiter so!</p>
      <Confetti trigger={isOpen} />
    </section>
  );
};
export default Modal;
