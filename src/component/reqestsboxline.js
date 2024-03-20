import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import styles from './reqbox.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DynamicBoxLine = ({ dummyHttpRequests }) => {
    const [requests, setRequests] = useState(dummyHttpRequests);

    const maxLengthMapping = {
        1: 20,
        2: 19,
        3: 18,
        4: 17,
        5: 16,
        6: 22,
        7: 17,
        8:15,
        9:6,
        10:5,
        11:4,
        // Add more cases as needed
    };

    // Determine the maximum URL length based on requests.length
    const maxUrlLength = maxLengthMapping[requests.length] || 3; // Default to 5 characters if not specified in mapping
// Adjust the URL length dynamically


    const addRequest = () => {
        const newRequest = {
            url: "New URL", // Modify this according to your logic
            // Other properties of the request
        };
        setRequests([...requests, newRequest]);
    };

    const limitUrl = (url, maxLength) => {
        return url.length > maxLength ? url.substring(0, maxLength) + '..' : url;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
            <div className={styles.grid_container}>
                <div className={styles.grid_inner} style={{ gridTemplateColumns: `repeat(${requests.length}, auto)` }}>
                    {requests.map((item, index) => (
                        <div key={index} className={styles.grid_item}>
                            <span className={styles.url}>{limitUrl(item.url, maxUrlLength)}</span>
                            <CloseIcon sx={{ fontSize: '15px', margin: '5px' }} />
                        </div>
                    ))}
                </div>
            </div>
            &nbsp;
            &nbsp;
            <div className={styles.extraIcon} onClick={addRequest}>
                <AddIcon  /> 
             
            </div>
            <div className={styles.extraIcon}>
            <DeleteForeverIcon/>
            </div>
        </div>
    );
};

export default DynamicBoxLine;
