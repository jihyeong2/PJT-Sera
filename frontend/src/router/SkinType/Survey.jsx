import React, { useEffect, useState } from 'react';
import Logo from '../../components/common/Logo/Logo';
import clock from '../../assets/clock.png';
import report from '../../assets/report.png';
import one from '../../assets/one.png';
import Navbar from '../../components/common/Navbar/Navbar';
import Question from '../../components/SkinType/Question';
import styles from './Survey.module.css';
import Footer from '../../components/common/Footer/Footer';
import Swal from 'sweetalert2';
import setSkin from '../../service/skin';
import {update} from '../../actions/index';
import { useHistory } from 'react-router';
import {connect} from 'react-redux';
const Survey = ({user,skin,update}) => {
  const questions = [
    {
      title:"클렌징 후에, 아무것도 바르지 않고 2~3시간 후에 밝은 빛 아래서 거울을 보면 이마와 볼이 어떻게 보이고 어떻게 느껴지나요?",
      contents:[
        "매우 거칠고, 버석거리고 각질이 들떠 보인다",
        "당긴다",
        "당기지 않고 건조해 보이지 않고 번들거리지 않는다",
        "밝은 빛에 반사되는 듯이 번들거린다"
      ]
    },
    {
      title:"메이크업 파운데이션(파우더는 안 바른 상태)을 바른 지 2~3시간 후에 메이크업이 어떻게 보이나요?",
      contents:[
        "약간 들떠 보이고 주름진 부분이 나타난다",
        "부드러워 보인다",
        "번들거린다",
        "고정이 안되고 번들거린다"
      ]
    },
    {
      title:"거품이 많이 나는 비누를 사용할 때 피부의 상태는 어떠한가요?",
      contents:[
        "건조하고 갈라진다",
        "약간 건조하고 갈라지지는 않는다",
        "아무렇지 않다",
        "기름진다"
      ]
    },
    {
      title:"얼굴에서 T-존(이마와 코)가 기름지나요?",
      contents:[
        "그렇지 않다",
        "때때로 그렇다",
        "자주 그렇다",
        "항상 그렇다"
      ]
    },
    {
      title:"모이스처라이저를 바르고 2~3시간 후에 당신의 볼은 어떻나요?",
      contents:[
        "매우 거칠고, 각질이 일어나거나 또는 각질이 떨어진다",
        "부드럽다",
        "조금 번들거림이 있다",
        "번들거리고 기름진다 또는 모이스처라이저를 사용하지 않는다"
      ]
    },
    {
      title:"얼굴에 붉은 여드름이 있나요?",
      contents:[
        "없다",
        "거의 없다",
        "최소 한 달에 한 번 정도 있다",
        "최소 한 주에 한 번 정도 있다"
      ]
    },
    {
      title:"아토피, 습진 또는 접촉성 피부염으로 진단 받은 적이 있나요?",
      contents:[
        "없다",
        "모른다",
        "있다",
        "심각한 상태이다"
      ]
    },
    {
      title:"향기나는 버블 바스, 마사지 오일, 바디로션이 피부에 뭐가 나게 하거나 간지럽거나 건조하게 한 적이 있나요?",
      contents:[
        "없다",
        "거의 없다",
        "자주 있다",
        "항상 있다"
      ]
    },
    {
      title:"눈에 띄는 붉음증이나 혈관이 확장된 부분이 얼굴과 코에 얼마나 있나요?",
      contents:[
        "없다",
        "거의 없다 (코를 포함해서 1~3부분)",
        "약간 있다 (코를 포함해서 4~6부분)",
        "많다 (코를 포함해서 7부분 이상)"
      ]
    },
    {
      title:"메이크업, 선크림, 스킨케어 제품들로 가렵거나, 붓거나 붉어지는 증상을 가지고 있나요?",
      contents:[
        "없다",
        "때때로 있다",
        "자주 있다",
        "항상 있다"
      ]
    },
    {
      title:"여드름이나 피부속으로 파고드는 헤어가 난 후에 어둡고 갈색이거나 블랙스팟이 생기나요?",
      contents:[
        "그런 적이 없다",
        "때때로 있다 혹은 여드름이나 피부속으로 파고드는 헤어가 없다",
        "자주 있다",
        "항상 있다"
      ]
    },
    {
      title:"피부에 상처가 났을 때, 어둡거나 붉은기가 얼마나 오래도록 남아있나요?",
      contents:[
        "본 적 없다",
        "한 주",
        "몇 주",
        "여러 달"
      ]
    },
    {
      title:"햇빛을 보고 돌아다닐 때 피부 위에 있는 어두운 잡티가 더 심해지나요?",
      contents:[
        "잡티가 없다",
        "모른다",
        "약간 심해진다",
        "많이 심해진다"
      ]
    },
    {
      title:"얼굴, 가슴, 팔 등에 점들이 있나요?",
      contents:[
        "없다",
        "약간 있다 (1~5개)",
        "많이 있다 (6~15개)",
        "엄청 많이 있다 (16개 이상)"
      ]
    },
    {
      title:"몇 일 동안 지속적으로 햇볕을 보았을 때 피부에 어떤 변화가 일어나나요?",
      contents:[
        "선번과 물집이 생기거나 피부색은 변화 없다",
        "피부가 조금 어두워진다",
        "피부가 많이 어두워진다",
        "피부가 이미 어두워서 더 어두워지는지 잘 모른다"
      ]
    },
    {
      title:"얼굴에 주름이 있나요?",
      contents:[
        "없다 (웃거나 찡그리거나 눈썹을 들어올려도 생기지 않는다)",
        "표정을 지을 때만 생긴다",
        "표정을 지을 때도 생기고 표정을 짓지 않아도 주름이 조금 있다",
        "어떤 표정을 짓지 않아도 주름이 있다"
      ]
    },
    {
      title:"하루에 얼마나 많이 태양에 노출되어 지내나요?",
      contents:[
        "거의 없다 (대부분 실내에 머물고 햇빛을 많이 보지 않는다)",
        "약간 있다 (햇빛이 강하지는 않으나 일반적으로 햇빛을 본다)",
        "자주 있다 (꽤 햇빛에 노출되어 지낸다)",
        "많이 있다 (햇빛이 매우 쨍쨍한 곳에서 오래 지낸다)"
      ]
    },
    {
      title:"최근 5년동안 의도적이든 그렇지 않든 실외스포츠나 다른 활동 등으로 피부를 햇빛에 오래 노출한 적이 있나요?",
      contents:[
        "없다",
        "한 달에 한 번 있다",
        "일주일에 한 번 있다",
        "매일 있다"
      ]
    },
    {
      title:"얼마나 자주 과일과 채소를 먹나요?",
      contents:[
        "매일 먹는다",
        "하루에 한 번 먹는다",
        "자주 먹는다",
        "안 먹는다"
      ]
    },
    {
      title:"본인의 피부색이 어떻나요?",
      contents:[
        "어둡다",
        "중간이다",
        "약간 밝다",
        "매우 밝다"
      ]
    },
  ];
  const [surveyScores, setSurveyScores] = useState(new Array(20).fill(-1));
  const [pageNum, setPageNum] = useState(0);
  const history = useHistory();
  const onChangeQuestion = (questionIdx,contentIdx) => {
    if(surveyScores[questionIdx] !== contentIdx+1){
      const tmp = surveyScores.map((item,idx)=>(
          questionIdx !== idx ? item : contentIdx+1
      ));
      setSurveyScores(tmp);
    }
  };
  const onPageBack = () => {
    const tmp=pageNum-1;
    setPageNum(tmp);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  const onPageNext = () => {
    for(let i=pageNum*4; i<pageNum*4+5; i++){
      if(surveyScores[i]===-1){
        Swal.fire({
          icon: 'error',
          text: `${i+1}번 문항에 답하지 않았습니다.`,
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
    }
    const tmp=pageNum+1;
    setPageNum(tmp);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  const onSubmit = () => {
    for(let i=0; i<20; i++){
      if(surveyScores[i]===-1){
        Swal.fire({
          icon: 'error',
          text: `${i+1}번 문항에 답하지 않았습니다.`,
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
    }
    const D_O = surveyScores.slice(0,5).reduce(function add(sum,currVal){
      return sum+currVal;
    });
    const R_S = surveyScores.slice(5,10).reduce(function add(sum,currVal){
      return sum+currVal;
    });
    const N_P = surveyScores.slice(10,15).reduce(function add(sum,currVal){
      return sum+currVal;
    });
    const T_W = surveyScores.slice(15,20).reduce(function add(sum,currVal){
      return sum+currVal;
    });
    let result="";
    result+=D_O > 12 ? "O" : "D";
    result+=R_S > 12 ? "S" : "R";
    result+=N_P > 12 ? "P" : "N";
    result+=T_W > 12 ? "W" : "T";
    setSkin(
      user.userLoginId,
      result,
      (res)=>{
        if (res.data.data ==="성공"){
          const tmp = {...user};
          tmp.skinId={  
            skinId:skin.type[result].id,
            skinType:result
          };
          update(tmp);
          Swal.fire({
            icon: 'success',
            text: `${user.userNickname}님의 피부타입은 ${result}입니다.`,
            showConfirmButton: false,
            timer: 1500
          });
          history.push("/skin/result");
        }
        else{
          Swal.fire({
            icon: 'error',
            text: '진단에 실패했습니다.',
            showConfirmButton: false,
            timer: 1500
          });
          history.push("/skin");
        }
      },
      (err)=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          text: "진단에 실패했습니다.",
          showConfirmButton: false,
          timer: 1500
        });
        history.push("/skin");
      }
    )
  };
  useEffect(()=>{
    window.scrollTo(0,0);
    return () => {
      const zero = 0;
      const arr = new Array(20).fill(-1);
      setPageNum(zero);
      setSurveyScores(arr);
    }
  },[])
  return(
    <div style={{position:'relative', paddingBottom:'180px', minHeight:"100vh"}}>
      <div className={styles.container}>
        <Navbar/>
        <div className={styles.logo_box}>
          <Logo type={1}/>
        </div>
        <div className={styles.header}>
          <span className={styles.title}>바우만 테스트</span><br/>
          <span className={styles.subtitle}>진단 테스트를 통해 당신에게 16가지 중 맞는 피부타입 유형을 알려드립니다.</span>
        </div>
        <div className={styles.rule_box}>
          <div className={styles.rule}>
            <div className={styles.rule_img}>
              <img src={clock} alt=""/>
            </div>
            <div className={styles.rule_text}>
              총 검사시간은<br/>약 5분 입니다.
            </div>
          </div>
          <div className={styles.rule}>
            <div className={styles.rule_img}>
              <img src={report} alt=""/>
            </div>
            <div className={styles.rule_text}>
              20가지의 설문문항이<br/>존재합니다.
            </div>
          </div>
          <div className={styles.rule}>
            <div className={styles.rule_img}>
              <img src={one} alt=""/>
            </div>
            <div className={styles.rule_text}>
              선택지 중 한 개만<br/>선택해주세요.
            </div>
          </div>
        </div>
        <div className={styles.question_box}>
          {pageNum === 0 && questions.slice(0,5).map((question,idx) => {
            return (
              <Question key={idx} question={question} questionIdx={idx} onChangeQuestion={onChangeQuestion} surveyScores={surveyScores}/>
            );
          })}
          {pageNum === 1 && questions.slice(5,10).map((question,idx) => {
            return (
              <Question key={idx+5} question={question} questionIdx={idx+5} onChangeQuestion={onChangeQuestion} surveyScores={surveyScores}/>
            );
          })}
          {pageNum === 2 && questions.slice(10,15).map((question,idx) => {
            return (
              <Question key={idx+10} question={question} questionIdx={idx+10} onChangeQuestion={onChangeQuestion} surveyScores={surveyScores}/>
            );
          })}
          {pageNum === 3 && questions.slice(15,20).map((question,idx) => {
            return (
              <Question key={idx+15} question={question} questionIdx={idx+15} onChangeQuestion={onChangeQuestion} surveyScores={surveyScores}/>
            );
          })}
        </div>
        <div className={styles.btn_box}>
          {pageNum > 0 && <button onClick={onPageBack} className={styles.btn_back}>&lt;&lt; Back</button>}
          {pageNum < 3 && <button onClick={onPageNext} className={styles.btn_next}>Next &gt;&gt;</button>}
          {pageNum == 3 && <button onClick={onSubmit} className={styles.btn_next}>진단하기 &gt;&gt;</button>}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  skin: state.skin,
})

const mapDispatchToProps = (dispatch) => ({
  update: (user) => dispatch(update(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);