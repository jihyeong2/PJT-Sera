import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './home3.module.css';
import person1 from '../../assets/main_person1.png';
import person2 from '../../assets/main_person2.png';
import person3 from '../../assets/main_person3.png';
import person4 from '../../assets/main_person4.png';

const Home3 = (props) => {
  const [currPerson, setPerson] = useState(0);
  // console.log(currPerson);
  const profiles =[
    {
      name: '심수련',
      img: person1,
      skin: 'OSPW',
      worry: '피부에 붉은기가 심하고 자주 민감해져요.',
      cosmetics:[
        {
          "name": "리프팅 인텐시파이어",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140613/1402676015390.jpg?w=280",  
          "volume": "15ml",
          "price": "225,000 원",
          "brand": "라 메르 (LA MER)",
        },
        {
          "name": "트리트먼트 로션",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140613/1402676221315.jpg?w=280",
          "volume": "150ml",
          "price": "175,000 원",
          "brand": "라 메르 (LA MER)",
        },
        {
          "name": "바이탈라이저 V10 오일",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140515/1400209214756.jpg?w=280",
          "volume": "30ml",
          "price": "50,000 원",
          "brand": "BRTC (비알티씨)",          
        }
      ]
    },
    {
      name: '천서진',
      img: person2,
      skin: 'DSPW',
      worry: '피부가 너무 민감해서 트러블이 심해요.',
      cosmetics:[
        {
          "name": "쟈스민 워터 비비크림 [SPF30]",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/product/20200716/1594880006617.png?w=280",
          "volume": "35g",
          "price": "28,000 원",
          "brand": "BRTC (비알티씨)",
        },
        {
          "name": "울트라 스킨 파워 제트크림",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140509/1399863251601.jpg?w=280",
          "volume": "80ml",
          "price": "38,000 원",
          "brand": "인쏘뷰 (insobeau)",
        },
        {
          "name": "이모르뗄 브라이트닝 에센스",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140622/1403498944181.jpg?w=280",
          "volume": "30ml",
          "price": "88,000 원",
          "brand": "록시땅 (LOCCITANE)",      
        }
      ]
    },
    {
      name: '주단태',
      img: person3,
      skin: 'OSPT',
      worry: '색소침착이 심해서 검은 점이 많아요.',
      cosmetics:[
        {
          "name": "에센스 마스크 포맨",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140516/1401177365748.JPG?w=280",
          "volume": "5ea",
          "price": "8,900 원",
          "brand": "퓨어덤 (PUREDERM)",
        },
        {
          "name": "28 레미디 쥬브나일 썬 비비 포맨",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20170725/1500951924392.png?w=280",
          "volume": "45ml",
          "price": "25,000 원",
          "brand": "낫츠 (NOTS)",
        },
        {
          "name": "28 레미디 밸런싱 토너 포맨",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140508/1399613744009.jpg?w=280",
          "volume": "60ml",
          "price": "25,000 원",
          "brand": "낫츠 (NOTS)",
        }
      ]
    },
    {
      name: '하윤철',
      img: person4,
      skin: 'DRNW',
      worry: '피부가 너무 건조해서 주름이 많이 생겨요.',
      cosmetics:[
        {
          "name": "효용고 포맨 로션",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140515/1400159841721.jpg?w=280",
          "volume": "140ml",
          "price": "27,000 원",
          "brand": "다나한 (Danahan)",
        },
        {
          "name": "포맨 액티브 비비크림",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140516/1400240008979.png?w=280",
          "volume": "50ml",
          "price": "29,000 원",
          "brand": "닥터자르트 (Dr.Jart)",
        },
        {
          "name": "포맨 익스트림 리뉴 스킨",
          "image": "https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140516/1400761481173.gif?w=280",
          "volume": "120ml",
          "price": "24,000 원",
          "brand": "미샤 (MISSHA)",
        }
      ]
    }
  ];
  const onMouseOver = (e) => {
    const idx = Number(e.target.dataset.key);
    console.log(e.target.dataset.key);
    // console.log(idx);
    setPerson(idx);
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <div className={styles.card}>
            <div className={styles.card_top}>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <img className={styles.img} src={profiles[currPerson].img} alt=""/>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.profile_box}>
                    <div className={styles.label}>이름</div>
                    <div className={styles.value}>{profiles[currPerson].name}</div>
                  </div>
                  <div className={styles.profile_box}>
                    <div className={styles.label}>피부타입</div>
                    <div className={styles.value}>{profiles[currPerson].skin}</div>
                  </div>
                  <div className={[styles.profile_box, styles.vertical].join(' ')}>
                    <div className={styles.label}>고민</div>
                    <div style={{marginTop: '0.5em'}} className={styles.value}>{profiles[currPerson].worry}</div>
                  </div>
                  
                </Grid>
              </Grid>
            </div>
            <div className={styles.card_bottom}>
              <div className={styles.card_bottom_title}>
                {profiles[currPerson].name}님께 추천하는 화장품
              </div>
              <Grid container spacing={1}>
                {profiles[currPerson].cosmetics.map(item =>{
                  return(
                    <Grid key={item.name} item xs={4}>
                      <div className={styles.box}>
                        <div className={styles.image_box}>
                          <img style={{width:'80px', height:'80px'}}  src={item.image} alt="Product Image"/>
                        </div>
                        <div className={styles.brand}>{item.brand}</div>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.volume_price}>{item.volume} / {item.price}</div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={styles.text_box}>
            <div className={styles.title}>
              나만의 화장품을 찾는 <br/>
              내 피부 맞춤 추천
            </div>
            <div className={styles.content}>
              새라는 실제 사용자의 리뷰를 기반으로<br/>
              피부에 꼭 맞는 화장품을 추천합니다.
            </div>
          </div>
          <Grid container spacing={1} justify="center" style={{margin:'2em 0 0 0'}}>
            {profiles.map((item,idx)=>{
              return(
                <Grid key={idx}  item xs={3}>
                  <div data-key={idx} onMouseOver={onMouseOver} style={{display: 'flex', flexDirection:"column", justifyContent:"center", alignItems:"center",cursor:"pointer"}}>
                    <img data-key={idx} className={styles.img} src={item.img} alt="" />
                    <div data-key={idx} className={styles.profile_name}>{item.name}</div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};

export default Home3;