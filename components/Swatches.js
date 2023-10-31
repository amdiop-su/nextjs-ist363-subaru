import styles from './swatches.module.scss';

const Swatches = ({ 
    changeHandler,
    data
}) => {

    return <ul className={styles.swatch_list}>
        {data.map((item) => {
            return <li 
                className={styles.swatch_item}
                style={{ backgroundColor: item.hex}}
                onClick={() => {
                    changeHandler(item);
                }}
            >
        
            </li>
        })}
    </ul>
}
export default Swatches;