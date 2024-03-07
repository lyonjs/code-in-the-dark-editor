import styles from './styles.module.scss';
import {Button} from "../button/Button";

export const Modal = ({
  children,
  show,
  setShow,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: (value: boolean) => void;
}) => (
  <>
    {show && (
      <div className={styles.overlay} onClick={() => setShow(false)}>
        <div className={styles.modal}>
          <Button
            className={styles.close}
            onClick={() => setShow(false)}
          >
            X
          </Button>
          <div onClick={(e) => e.stopPropagation()} className={styles.body}>
            {children}
          </div>
        </div>
      </div>
    )}
  </>
);
