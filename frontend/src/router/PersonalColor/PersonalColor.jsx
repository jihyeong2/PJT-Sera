import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, useEffect, useCallback} from 'react';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import styles from './PersonalColor.module.css';
import profile from '../../assets/profile.png';
import Footer from '../../components/common/Footer/Footer';
import {setColor, colorTest} from '../../service/color';
import {connect} from 'react-redux';
import {update} from '../../actions/index';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import TopButton from '../../components/common/Button/TopButton/TopButton';

const PersonalColor = ({user,color,update}) => {
  let historys = useHistory();
  if(user == null){
    Swal.fire({
      icon: 'error',
      text: '로그인 후 이용해주세요',
      confirmButtonText: '확인',
    }).then(() => {
      historys.push("/login");
    })
  }

  const [prevImg, setPrevImg] = useState(profile);
  const [imgFile, setImgFile] = useState(null);
  const [isScroll,setIsScroll] = useState(false);
  const history = useHistory();
  const onUploadImage = (e) => {
    const input = document.querySelector('#file_route');
    if (e.target.files && e.target.files[0]){
      let reader = new FileReader();
      reader.onload=function(event){
        setPrevImg(event.target.result);
        input.value=e.target.files[0].name;
      }
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("user_id", user.userId);
    colorTest(
      formData,
      (res)=>{
        console.log(res);
        console.log(user);
        const tmp = {...user, personalColor:res.data.personal_color,userImg:res.data.user_img};
        console.log(tmp);
        update(tmp);
        // Swal.fire({
        //   icon: 'success',
        //   text: `${user.userNickname}님의 피부타입은 ${res.data.personal_color}입니다.`,
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        history.push("/personal_color/result");
      },
      (err)=>{
        console.log(err);
      }
    )
  };
  const scrollEvent = useCallback(()=>{
    if(window.scrollY>0){
      setIsScroll(true);
    } else{
      setIsScroll(false);
    }
  },[]);  
  useEffect(()=>{
    window.addEventListener('scroll', scrollEvent, true);
    return () => {
      window.removeEventListener('scroll', scrollEvent, true);
    }
  });
  const onClickTopButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };    
  return(
    <div style={{position:'relative', paddingBottom:'180px', minHeight:"100vh"}}>
      <div className={styles.container}>
        <Navbar/>
        <div className={styles.logo_box}>
          <Logo type={1}/>
        </div>
        <div className={styles.header}>
          <span className={styles.title}>퍼스널컬러 진단</span><br/>
        </div>
        <div className={styles.guide_box}>
          <div className={styles.guide_left}>
            <div className={[styles.guide_left_title, styles.bold_text].join(' ')}>
              퍼스널 컬러<br/>
              진단 프로세스
            </div>
            <div className={styles.guide_left_text}>
              3가지 카테고리 | 약 2분 소요
            </div>
          </div>
          <div className={styles.guide_right}>
            <div className={styles.guide_step}>
              <FontAwesomeIcon icon="portrait" size="5x" color="#333333"/>
              <div className={styles.guide_step_text}>
                01<br/>
                본인 사진<br/>
                업로드
              </div>
            </div>
            <div className={styles.guide_step}>
              <FontAwesomeIcon icon="comment-dots" size="5x" color="#333333"/>
              <div className={styles.guide_step_text}>
                02<br/>
                퍼스널컬러<br/>
                분석
              </div>
            </div>
            <div className={styles.guide_step}>
              <FontAwesomeIcon icon="envelope-open-text" size="5x" color="#333333"/>
              <div className={styles.guide_step_text}>
                03<br/>
                테스트<br/>
                결과
              </div>
            </div>
          </div>
        </div>
        <div className={styles.test_box}>
          <div className={styles.test_left}>
            <div className={styles.test_title}>
              <span className={[styles.highlight, styles.bold_text].join(' ')}>나의 진짜 퍼스널 컬러는?</span><br/>
              <span className={styles.bold_text}>퍼스널컬러</span>가 궁금하시다구요?<br/>
              지금 바로 확인해보세요!
            </div>
            <div className={styles.test_input_box}>
              <div style={{width:'100%', display:'flex'}}>
                <input className={styles.file_route}type="text" placeholder="사진을 업로드해주세요." readOnly="readonly" id="file_route"/>
                <label className={styles.test_input} htmlFor="input-file">파일 선택</label>
                <input id="input-file" type="file" accept="image/png, image/jpeg" onChange={onUploadImage}/><br/>
              </div>
              <div className={styles.test_input_guide}>* JPG, PNG 이미지 파일만 첨부 가능합니다.</div>
            </div>
            <div className={styles.desc_box}>
              <div className={styles.highlight}>잠깐!! 테스트 하기 전에</div>
              <div className={styles.bold_text}>1. 자연광 혹은 아주 밝은 조명</div>
              <div>실제 색깔을 그대로 볼 수 있는 조명이 필요해요.</div>
              <div className={styles.bold_text}>2. 쌩얼</div>
              <div>렌즈를 빼고 화장을 지운 얼굴을 준비해주세요.</div>
            </div>
          </div>
          <div className={styles.test_right}>
            <img className={styles.img} src={prevImg} alt=""/>
            <div className={styles.img_back}></div>
            <button className={styles.test_btn} onClick={onSubmit}>
              퍼스널컬러 테스트 Go!
            </button>
          </div>
        </div>
      </div>
      {
        isScroll && <TopButton onClick={onClickTopButton}/>
      }
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  color: state.color,
})

const mapDispatchToProps = (dispatch) => ({
  update: (user) => dispatch(update(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalColor);