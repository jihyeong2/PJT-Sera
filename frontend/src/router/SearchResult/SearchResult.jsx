import React, {useState} from 'react';
import styles from './SearchResult.module.css';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProductList from '../../components/common/ProductList/ProductList';
import data from '../../data/GP_items_1-10000.json';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
const SearchResult = (props) => {
  console.log(props);
  const params=useParams();
  const classes = useStyles();
  const [products,setProducts] = useState(data.slice(0,8));
  const [products2,setProducts2] = useState(data.slice(8,16));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <Navbar/>
      <Logo type={1} className={styles.logo}/>
      <div className={styles.header}>
        "<span className={styles.highlight}>{params.name}</span>"의 검색 결과입니다.
      </div>
      <AppBar position="static" style={{ background: '#FFFFFF' , color: '#333333', boxShadow: 'none'}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="상품명 결과" {...a11yProps(0)} />
          <Tab label="성분명 결과" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProductList products={products}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductList products={products2}/>
      </TabPanel>
    </div>
  );
}

export default SearchResult;