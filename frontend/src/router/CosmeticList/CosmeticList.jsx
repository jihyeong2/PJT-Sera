import React  from 'react';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import RecentList from '../../components/common/RecentList/recent_list';
import ProductNav from '../../components/CosmeticList/product_nav';
import styles from './CosmeticList.module.css'

const CosmeticList = () => {
  return (
      <div className={styles.containar}>
      <Navbar/>
      <Logo type={1}/>
      <React.StrictMode>
      <ProductNav />
      </React.StrictMode>
      <RecentList />
    </div>
    
  );
} 

export default CosmeticList;
