import React from 'react';
import styles from './recent_list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Drawer from '@material-ui/core/Drawer';

const RecentList = (props) => {
    const [state, setState] = React.useState({ bottom: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

    const anchor = "bottom";
    const list = (anchor) => (
        <div className={styles.up_box}>
            가로슬라이드 
        </div>
      );

    return(
        <>
            <div>
                <React.Fragment key={anchor}>
                    <div className={styles.recent_btn} onClick={toggleDrawer(anchor, true)}>
                        최근 본 상품 &nbsp;
                        <FontAwesomeIcon icon="chevron-down" size="lg"/>
                    </div>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            </div>
        </>
    );
}

export default RecentList;