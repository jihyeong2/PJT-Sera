import React from 'react';
import styles from './review.module.css';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ReviewWrite from "./review_write_modal";
import ReviewChart from "./review_chart";

const dstyles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
});

const DialogTitle = withStyles(dstyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const ReviewHead = ({ product, onCreateReview, grade }) => {
    const history = useHistory();

    const [fullWidth, setFullWidth] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreateReview = () => {
        setOpen(false);
        onCreateReview();
    };
    return (
        <div className={styles.review_head} >
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <p className={styles.review_num_title}>총 <span>{grade.star_cnt}</span>건의 리뷰</p>
                    <p className={styles.review_rate}><span>{grade.star_avg}</span>점</p>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Rating name="read-only" value={grade.star_avg} readOnly /> 
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <ReviewChart grade={grade}/>
                </Grid>
                <Grid item xs={4}>
                    <p className={styles.review_btn_title}>리뷰를 써보세요.</p>
                    <Button className={styles.review_btn} variant="contained" onClick={handleClickOpen} >리뷰작성</Button>
                    <Dialog style={{ height: '90%', }} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            리뷰작성
                                </DialogTitle>
                        <DialogContent dividers>
                            <ReviewWrite product={product} onCreateReview={handleCreateReview}/>
                        </DialogContent>
                    </Dialog>
                </Grid>
            </Grid>
        </div>
    );
}

export default ReviewHead;