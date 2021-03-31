import React from 'react';
import styles from './recent_list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const RecentList = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
     };

     const handleClose = () => {
        setOpen(false);
      };

    return(
        <>
            <div className={styles.recent_btn} onClick={handleClickOpen}>
                최근 본 상품 &nbsp;
                <FontAwesomeIcon icon="chevron-down" size="lg"/>
            </div>

            <Dialog
                style={{height:'40%',}}
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    상품 보여줄거임 
            </Dialog>
        </>
    );
}

export default RecentList;