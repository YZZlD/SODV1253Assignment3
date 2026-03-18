import styles from './PaginationButton.module.css';

export default function PaginationButton(props) {
    return (
        <>
            <button className={styles.pageButton} onClick={props.handlePageChange}>{props.message}</button>
        </>
    )
}
