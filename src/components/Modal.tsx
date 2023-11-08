import Confetti from "./Confetti";
import * as classNames from "classnames";

const Modal = ({ isOpen }) => {

    return <section className={classNames('modal', {'modal-open': isOpen})}>
        <h1>Herzlichen Glückwünsch!</h1>
        <h2>Du hast Level 2 erreicht</h2>
        <Confetti/>
    </section>
}
export default Modal;