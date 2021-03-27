const initialState = {
  type:{
    'OSPT':{
      color:'#329B95',
      info:'피지-염증-색소침착의 악순환이 반복되고 검은 점이 더 오래 남아 있는 피부입니다.',
      tag:[
        'Oily (지성)',
        'Sensitive (민감성)',
        'Pigment (색소성)',
        'Tight (탄력)'
      ],
    },
    'OSNT':{
      color: '#EE9BB6',
      info: '감정 변화나 다양한 자극으로 쉽게 얼굴이 붉어지고 곳곳에 여드름이 보이는 피부입니다.',
      tag:[
        'Oily (지성)',
        'Sensitive (민감성)',
        'Non-Pigment (비색소성)',
        'Tight (탄력)',
      ]
    },
    'OSPW':{
      color: '#F08964',
      info: '다양한 피부트러블과 함께 색소침착, 노화까지 겪고 있는 총체적 난국의 피부입니다.',
      tag:[
        'Oily (지성)',
        'Sensitive (민감성)',
        'Pigment (색소성)',
        'Wrinkle (주름)',
      ]
    },
    'OSNW':{
      color: '#E85881',
      info: '잘 익은 바닷가재처럼 햇빛에 쉽게 붉어지고 번들거리며 종종 여드름이 보이는 피부입니다.',
      tag:[
        'Oily (지성)',
        'Sensitive (민감성)',
        'Non-Pigment (비색소성)',
        'Wrinkle (주름)',
      ]
    },
    'ORNT':{
      color: '#FCD25C',
      info: '번들거림은 있으나, 어느 것 하나 흠 잡을 곳 없이 광채가 나는 피부입니다.',
      tag:[
        'Oily (지성)',
        'Resistant (저항성)',
        'Non-Pigment (비색소성)',
        'Tight (탄력)',
      ]
    },
    'ORPW':{
      color: '#ED7100',
      info: '민감성 피부의 흔적으로 매일 아침마다 넓은 모공과 주름, 반점을 마주하는 피부입니다.',
      tag:[
        'Oily (지성)',
        'Resistant (저항성)',
        'Pigment (색소성)',
        'Wrinkle (주름)',
      ]
    },
    'ORNW':{
      color: '#FABE00',
      info: '피부 트러블이 없어 피부에 관심이 적으나, 주름과 노화가 눈에 띄는 피부입니다.',
      tag:[
        'Oily (지성)',
        'Resistant (저항성)',
        'Non-Pigment (비색소성)',
        'Wrinkle (주름)',
      ]
    },
    'ORPT':{
      color: '#FABE00',
      info: '자외선으로 주근깨와 검은 반점이 쉽게 생겨 고민이지만 장점이 훨씬 많은 피부입니다.',
      tag:[
        'Oily (지성)',
        'Resistant (저항성)',
        'Pigment (색소성)',
        'Tight (탄력)',
      ]
    },
    'DSNT':{
      color: '#D1E5AB',
      info: '사막에 있는 것처럼 심한 건조함과 화끈거림을 느끼며 각질과 붉은 기를 보이는 피부입니다.',
      tag:[
        'Dry (건성)',
        'Sensitive (민감성)',
        'Non-Pigment (비색소성)',
        'Tight (탄력)',
      ]
    },
    'DSPW':{
      color: '#77C49D',
      info: '피부가 매우 민감하고 얇아 쉽게 반응을 보이며, 모든 종류의 문제를 보일 수 있는 피부입니다.',
      tag:[
        'Dry (건성)',
        'Sensitive (민감성)',
        'Pigment (색소성)',
        'Wrinkle (주름)',
      ]
    },
    'DSNW':{
      color: '#A6CE58',
      info: '하루마다 피부 상태가 급변하고 가려움, 따가움, 홍초 등과 함께 주름이 보이는 피부입니다.',
      tag:[
        'Dry (건성)',
        'Sensitive (민감성)',
        'Non-Pigment (비색소성)',
        'Wrinkle (주름)',
      ]
    },
    'DSPT':{
      color: '#8ACECC',
      info: '수많은 민감 증상으로 매순간 고통을 받으며, 특히 습진, 각질, 색소침착 등을 겪는 피부입니다.',
      tag:[
        'Dry (건성)',
        'Sensitive (민감성)',
        'Pigment (색소성)',
        'Tight (탄력)',
      ]
    },
    'DRPW':{
      color: '#42A7DB',
      info: '과거 피부에 문제가 없어 방치하였으나, 지금은 검은 반점과 주름을 가진 피부입니다.',
      tag:[
        'Dry (건성)',
        'Resistant (저항성)',
        'Pigment (색소성)',
        'Wrinkle (주름)',
      ]
    },
    'DRNW':{
      color: '#7C86C1',
      info: '젊었을 때 좋은 피부를 유지하지만, 건조함과 함께 빠른 노화를 겪는 피부입니다.',
      tag:[
        'Dry (건성)',
        'Resistant (저항성)',
        'Non-Pigment (비색소성)',
        'Wrinkle (주름)',
      ]
    },
    'DRPT':{
      color: '#96B5DF',
      info: '자외선으로 기미, 검은 반점이 나타나기 쉽지만 아름답게 관리할 수 있는 피부입니다.',
      tag:[
        'Dry (건성)',
        'Resistant (저항성)',
        'Pigment (색소성)',
        'Tight (탄력)',
      ]
    },
    'DRNT':{
      color: '#B2B5DB',
      info: '피부 복권에 당첨된 것처럼 피부 결이 좋고 깨끗한 피부입니다.',
      tag:[
        'Dry (건성)',
        'Resistant (저항성)',
        'Non-Pigment (비색소성)',
        'Tight (탄력)',
      ]
    },
  },
  type_info:{
    'Oily (지성)': '번들거림이 보이고 여드름이 나타나는 피부',
    'Dry (건성)' : '건조함을 느끼며 각질이 나타나는 피부',
    'Sensitive (민감성)': '피부 트러블 및 피부 자극으로, 예민하게 반응하는 피부',
    'Resistant (저항성)': '특별한 피부 문제 없이 피부장벽이 튼튼한 피부',
    'Pigment (색소성)':'기미, 잡티, 색소침착이 쉽게 나타나는 피부',
    'Non-Pigment (비색소성)': '기미, 잡티, 색소침착이 쉽게 나타나지 않는 피부',
    'Tight (탄력)': '주름이 보이지 않으며, 젊고 탱탱한 피부',
    'Wrinkle (주름)': '탄력이 줄어들고 노화가 시작된 피부',
  }
}
const skin = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SKIN_TYPE':
      return state;
    default:
      return state;
  }
}

export default skin;