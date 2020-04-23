import {
    createStore
} from "redux";

const data = {
    message:[{
        id: '1',
        name: 'R',
        message: '大家再多說一點，聊深入一點'
    },
    {
        id: '2',
        name: '大哥',
        message: '＝＿＝'
    },
    {
        id: '3',
        name: '愛麗絲',
        message: '做蛋糕給你吃＾＾'
    },
    {
        id: '4',
        name: 'Jerry',
        message: '齁伊係！！'
    },
]}

const addMessage = article => ({
    type: "addMessage",
    payload: article
});

const rootReducer = (state = data, action) => {
  switch (action.type) {
    case "addMessage":
      action.payload.id = String(state.message.length + 1);
      //這裡把接收到的資料payload增加到message的陣列中，並回傳整個state的內容
      return { ...state, message: [...state.message, action.payload] };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

//這邊多加了一個msg是想讓大家確認原本的資料是不會變的！
window.data = data;
window.store = store;
window.addMessage = addMessage;

export { store, addMessage };