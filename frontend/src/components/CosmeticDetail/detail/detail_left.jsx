import React from 'react';
import styles from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Detail = ({ product }) => {
    console.log(product);
    // const [heart, setHeart] = useState(null);

    // const getHeart = () => {
    //     axios({
    //         method: 'GET',
    //         url: `http://localhost:8000/v1/items/15`,
    //         headers:{
    //           "Content-type": "application/json",
    //         }
    //       })
    //       .then(res=>{
    //           console.log("데이터");
    //         console.log(res.data);
    //       })
    //       .catch(err=>{
    //           console.log("에러");
    //         console.error(err);
    //       })
    // }


    return (
        <div className={styles.detail_left}>
                <div className={styles.wrap}>
                    <img className={styles.product_image} src={product.item_img} alt="Product Image"/>
                    {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞지 않아요 👎🏻</span></div>}
                    {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞아요 👍🏻</span></div>}
                    {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.match}><span className={styles.match_name} >보통이에요 🤏🏻</span></div>}
                </div>

            <div className={styles.icon}>
                {product.dibs_cnt} &nbsp;<span className={styles.heart_icon}><FontAwesomeIcon icon={['far', 'heart']} size="lg" color="red" /></span>
                {/* <FontAwesomeIcon icon={['fas', 'heart']} size="2x" color="red"/> */}
            </div>
        </div>
    )

};

export default Detail;
