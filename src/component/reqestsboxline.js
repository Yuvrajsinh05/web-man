import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import styles from './reqbox.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux';
import { addRequest, cleanUp, removeRequest, setCurrentUrl } from '../features/requestSlice';



const DynamicBoxLine = () => {
    const requests = useSelector(state => state.request.value);
    const dispatch = useDispatch(); 
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
    };

    
    const maxUrlLength = maxLengthMapping[requests?.length] || 3;

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
            <div className={styles.extraIcon} onClick={()=> dispatch(cleanUp())}>
                <DeleteForeverIcon />
            </div>
        </div>
    );
};

export default DynamicBoxLine;
