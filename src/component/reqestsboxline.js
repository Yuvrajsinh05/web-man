import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import styles from './reqbox.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { addRequest, removeRequest, setCurrentUrl } from '../features/requestSlice';
// import { addRequest } from './features/requestSlice'; // Import addRequest action

const DynamicBoxLine = () => {
    const requests = useSelector(state => state.request.value); // Use Redux state instead of local state
    const dispatch = useDispatch(); // Initialize dispatch
    const currentUrl = useSelector(state => state.request.currentUrl);
    
    const maxLengthMapping = {
        1: 50,
        2: 40,
        3: 30,
        4: 35,
        5: 35,
        6: 22,
        7: 17,
        8: 15,
        9: 6,
        10: 5,
        11: 4,
        // Add more cases as needed
    };

    // Determine the maximum URL length based on requests.length
    const maxUrlLength = maxLengthMapping[requests?.length] || 3; // Default to 3 characters if not specified in mapping

    const limitUrl = (url, maxLength) => {
        return url?.length > maxLength ? url?.substring(0, maxLength) + '..' : url;
    };

    const handleAddRequest = () => {
        const newRequest = {
            url: "New URL",
            id:requests?.length+1
        };
        dispatch(addRequest(newRequest));
    };
    
    return (
        <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
            <div className={styles.grid_container}>
                <div className={styles.grid_inner} style={{ gridTemplateColumns: `repeat(${requests.length}, auto)` , cursor:'pointer' }}>
                    {requests.map((item, index) => (
                        <div key={index}  className={styles.grid_item} >
                            <span style={{ borderBottom: item?.id === currentUrl?.id ? '0.5px solid gray' : null, lineHeight: '40px' }} className={styles.url} onClick={()=>dispatch(setCurrentUrl(item))} >{limitUrl(item?.url, maxUrlLength)}</span>
                            <span onClick={()=>dispatch(removeRequest(item))}>     <CloseIcon  sx={{ fontSize: '15px', margin: '5px' }} /></span>
                        </div>
                    ))}
                </div>
            </div>
            &nbsp;
            &nbsp;
            <div className={styles.extraIcon} onClick={() => handleAddRequest()}>
                <AddIcon />
            </div>
            <div className={styles.extraIcon}>
                <DeleteForeverIcon />
            </div>
        </div>
    );
};

export default DynamicBoxLine;
