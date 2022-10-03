import { CarCalculator } from 'components/CarCalculator';
import styles from './style.module.scss';
import 'normalize.css';


function App() {
    return (
        <div className={styles.wrapper}>
            <CarCalculator />
        </div>
    );
}

export default App;
