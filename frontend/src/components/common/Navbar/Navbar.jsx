import React from 'react';
import styles from './Navbar.module.css';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {withStyles } from '@material-ui/core/styles';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from '../SearchModal/SearchModal';
import {connect} from 'react-redux';
import {logout} from '../../../actions/index';
import { useHistory } from 'react-router';

const StyledTabs = withStyles({
  indicator: {
    display: 'none',
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#666666',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      color: '#FD6C1D',
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const Navbar = ({user,logout}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Material Toggle Menu
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const history = useHistory();
  const onClickLogin = (e) => {
    handleClose(e);
    history.push('/login');
  }
  const onClickLogout = (e) => {
    handleClose(e);
    logout();
    history.push('/login');
  }
  const onClickSignup = (e) => {
    handleClose(e);
    history.push('/signup1');
  }
  const onClickMyPage = (e) => {
    handleClose(e);
    history.push('/mypage');
  }
  const onClickMyPick = (e) => {
    handleClose(e);
    history.push('/mypick');
  }
  if(user===null){
    return (
      <nav className={styles.navbar}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="피부 진단" className={styles.tab}/>
          <StyledTab label="퍼스널컬러 진단" className={styles.tab}/>
          <StyledTab label="상품 보기" className={styles.tab}/>
        </StyledTabs>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{color: '#666666'}}
        >
          비회원 &nbsp;
          <FontAwesomeIcon icon="chevron-down" size="lg"/>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem className={styles.menu_item} onClick={onClickLogin}>로그인</MenuItem>
                    <MenuItem className={styles.menu_item} onClick={onClickSignup}>회원가입</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <SearchModal/>
      </nav>
    )
  }
  return (
    <nav className={styles.navbar}>
      <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
        <StyledTab label="피부 진단" className={styles.tab}/>
        <StyledTab label="퍼스널컬러 진단" className={styles.tab}/>
        <StyledTab label="상품 보기" className={styles.tab}/>
      </StyledTabs>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{color: '#666666'}}
      >
        {user.nickName}님&nbsp;
        <FontAwesomeIcon icon="chevron-down" size="lg"/>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem className={styles.menu_item} onClick={onClickLogout}>로그아웃</MenuItem>
                  <MenuItem className={styles.menu_item} onClick={onClickMyPage}>마이페이지</MenuItem>
                  <MenuItem className={styles.menu_item} onClick={onClickMyPick}>내 찜 목록</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <SearchModal/>
    </nav>
  )
}
const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);