const initialState = {
  '봄웜':{
    skin: '노란빛이 도는 밝은색',
    hair: '밝은 갈색, 짙은 갈색',
    eyes: '갈색, 황갈색',
    accessory: '로즈골드, 도트, 리본, 플라워',
    color: '노랑이 섞인 선명하고 부드러운 색',
    palette:['#F6F4C4','#FAD0C2','#E78383','#EC8226','#E55928','#DF2622','#DDE6A7','#F4DF86','#EEE741','#A7C33B','#3BA34A','#D9AB5F','#BEE3EC','#79C7E1','#27AE7F','#1762A6','#86378E','#AE8051'],
  },
  '여름쿨':{
    skin: '흰빛이나 붉은빛이 도는 색',
    hair: '회갈색, 적갈색',
    eyes: '회색, 검은색',
    accessory: '실버, 진주, 실크, 큐빅',
    color: '파랑과 흰색이 섞인 밝고 부드러운 색',
    palette:['#F8E8F2','#F6D1E2','#EFADC9','#E27594','#E24F6B','#E24F6B','#F4EBDC','#F6F1AF','#BEDBBD','#57B9A2','#1F9875','#5C7476','#D8EEFB','#1F8C64','#90B1DA','#C4B6D9','#7F77AA','#8D97A1'],
  },
  '가을웜':{
    skin: '노란빛이 도는 어두운색',
    hair: '밝은 갈색, 짙은 갈색',
    eyes: '갈색, 황갈색',
    accessory: '골드, 나무, 니트, 상아',
    color: '황토색이 섞인 짙고 깊은 색',
    palette:['#B66027','#E47272','#E04528','#A82127','#A79D44','#823B2E','#F29829','#E4662B','#9DC195','#6D9945','#E57171','#DBAB59','#787F32','#004737','#6A4A31','#49867F','#15789F','#A57953'],
  },
  '겨울쿨':{
    skin: '붉거나 잿빛이 도는 색',
    hair: '검은색, 회갈색, 적갈색',
    eyes: '청회색, 회색, 검은색',
    accessory: '실버, 메탈, 가죽, 기하학',
    color: '파랑과 검정이 섞인 선명한 색',
    palette: ['#B662A0','#CE1F58','#575F62','#292E89','#D5E8E6','#969897','#F4E775','#DB1682','#CBCBCB','#FFFFFF','#4A266C','#A42471','#2065AA','#DBD0BC','#158E47','#95274A','#E2CFE2','#221816'],
  },
}
const color = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PERSONAL_COLOR':
      return state;
    default:
      return state;
  }
}

export default color