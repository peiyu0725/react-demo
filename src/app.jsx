import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store";
import { Main } from "./components/Main";

class Demo extends React.Component {
  //render是唯一必要的屬性，會回傳一個根Element

  constructor(props) {
    super(props)
    this.state = { time: new Date().toLocaleTimeString(), clickCount: 0, selValue: 'none' }
    this.addCount = this.addCount.bind(this)
    this.changeSelect = this.changeSelect.bind(this)
  }

  componentDidMount() {
    const upTime = () => {
      this.setState({ time: new Date().toLocaleTimeString() })
    }
    setInterval(upTime, 1000)
  }

  addCount(count) {
    this.setState({ clickCount: this.state.clickCount + parseInt(count) }, () => {
      console.log(`${this.state.clickCount}`)
    })
  }

  changeSelect(event) {
    console.log(event);
    this.setState({ selValue: event.target.value })
  }
  componentDidUpdate() {
    // console.log('123')
  }
  render() {
    // console.log('456')
    let arry = [
      { value: "none", name: "不顯示" },
      { value: "time", name: "時間" },
      { value: "button", name: "按鈕" },
      { value: "input", name: "輸入" },
      { value: "temperature", name: "溫度計" },
      { value: "message", name: "留言板" },
      { value: "stateMessage", name: "state留言板" }
    ];
      let opts = [];

      for (let i = 0; i <= arry.length - 1; i++) {
        opts.push(<option value={arry[i].value} key={arry[i].value}>{arry[i].name}</option>)
      }

      let showElement
      if (this.state.selValue === 'time') 
        showElement = <span>現在時間：{this.state.time}</span>
      else if (this.state.selValue === 'button')
        showElement = <button type="button" onClick={this.addCount.bind(this, this.props.count)}>{"點我 + " + this.props.count}</button>
      else if (this.state.selValue === 'input')
        showElement = <Form />
      else if (this.state.selValue === 'temperature')
        showElement = <Temperature />
      else if (this.state.selValue === "message") 
        showElement = <MessageForm />;
      else if (this.state.selValue === "stateMessage")
        showElement = <StateMessageForm />;
      else showElement = null;

      return (
        <div>
          <div style={this.props.style}>Hello，{this.props.name}</div>
          <div style={{marginBottom: 10 + 'px'}}>
            <select onChange={this.changeSelect.bind(this)} value={this.state.selValue}>{opts}</select>
          </div>
          <div>{showElement}</div>
        </div>
      )
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      introduction: '',
      gender: 'W',
      lists: [
        { id: '01', listName: '寫文章', check: false },
        { id: '02', listName: '打程式', check: false },
        { id: '03', listName: '耍廢', check: true }
      ]
    }
    this.changeState = this.changeState.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.filebox = React.createRef()
  }

  changeState(event) {
    let changeName = event.target.name
    this.setState({ [changeName]: event.target.value })
  }
  changeCheckBox(index) {
      let arrLists = this.state.lists
      if (arrLists[index].check)
        arrLists[index].check = false
      else
        arrLists[index].check = true

      this.setState({ lists: arrLists })
  }
  submitForm() {
    let status = ''
    console.log(`現在輸入的名字是：${this.state.name}`)
    console.log(`現在選擇的性別是：${(this.state.gender == 'M') ? '男' : '女'}`)
    console.log(`現在輸入的介紹內容是：${this.state.introduction}`)
    this.state.lists.map((list) => { (list.check) ? status += `${list.listName} ` : '' })
    console.log('待辦清單：' + status)
    // console.log(`選擇檔案為：${this.filebox.current.files[0].name}`)
    event.preventDefault()
  }
  render() {
    let lists = this.state.lists.map((list, index) => (
      <div key={list.id}>
        <input type="checkbox"
          checked={list.check}
          onChange={this.changeCheckBox.bind(this, index)}
          key={list.id} />
        <label>{list.listName}</label>
      </div>
    ));

    return (
      <form onSubmit={this.submitForm}>
        <div>
          <label>姓名：</label>
          <input type="text" id="name" name="name"
            value={this.state.name}
            onChange={this.changeState} />
        </div>
        <div>
          <label>性別：</label>
          <select id="gender" name="gender"
            value={this.state.gender}
            onChange={this.changeState} >
            <option value="M">男</option>
            <option value="W">女</option>
          </select>
        </div>
        <div>
          <label>自我介紹：</label><br />
          <textarea id="introduction" name="introduction"
            value={this.state.introduction}
            onChange={this.changeState}></textarea>
          <br />
        </div>
        <div>
          <label>待辦清單：</label>
          {lists}
        </div>
        {/* <div>
          <label>上傳大頭照：</label>
          <input type="file"
            ref={this.filebox} />
        </div> */}
        <input type="submit" value="送出表單" />
      </form>
    )
  }
}

//輸入溫度的組件
class InputTemperature extends React.Component{
    /*因為將該組件需要用到的state(例如:state.temperature或state.changeState)都移到共同的父組件<EasyForm>
    所以這裡只需要render負責輸出組件內容*/
    render(){
        return(
            /*所有的資料都從父組件傳進來，所以使用props接收資料，包括function*/
            <div>
                <span>目前輸入溫度是：{this.props.temperature}度{this.props.type}</span><br/>
                <input name="temperature" 
                        value={this.props.temperature} 
                        onChange={this.props.changeState} />度{this.props.type}
            </div>
        )
    }
}

class Temperature extends React.Component {
  constructor(props) {
    super(props);
    //用state來記錄溫度數值和該數值是哪個溫度單位(攝氏或華氏)
    this.state = { temperature: 0, type: "" };
    //設定changeState是在此class下執行
    this.changeState = this.changeState.bind(this);
  }

  //轉換溫度單位
  toConvert(temperature, type) {
    //如果type是C就帶公式將華氏轉攝氏，F就轉華氏
    if (type == "C") return ((temperature - 32) * 5) / 9;
    else return (temperature * 9) / 5 + 32;
  }

  //傳入type代表現在是哪種溫度變化
  changeState(type) {
    //取得目前輸入的值
    let temperature = window.event.target.value;
    //將目前溫度和溫度的單位寫進去state中
    this.setState({ temperature: temperature, type: type });
  }

  render() {
    /*在render的時候，先去取state判斷目前儲存的溫度是攝氏還華氏
        華氏的話temperature_F就不用轉，攝氏的話換temperature_C不轉
        但是如果有不同就得傳進toConvert中做單位的轉換*/
    let temperature_C =
      this.state.type == "F"
        ? this.toConvert(this.state.temperature, "C")
        : this.state.temperature;
    let temperature_F =
      this.state.type == "C"
        ? this.toConvert(this.state.temperature, "F")
        : this.state.temperature;

    return (
      <div>
        <InputTemperature
          type="C"
          temperature={temperature_C}
          /*設定事件changeState，
                所以在<InputTemperature />中就可以用props呼叫該事件*/
          changeState={this.changeState.bind(this, "C")}
        />

        <InputTemperature
          type="F"
          temperature={temperature_F}
          changeState={this.changeState.bind(this, "F")}
        />
      </div>
    );
  }
}

//訊息資料
let msg = [{id:'1',name:'R',message:'大家再多說一點，聊深入一點'},
            {id:'2',name:'大哥',message:'＝＿＝'},
            {id:'3',name:'愛麗絲',message:'做蛋糕給你吃＾＾'},
            {id:'4',name:'Jerry',message:'齁伊係！！'},]

class Message extends React.Component {
  render() {
    let divStyle = { marginBottom: 20 };
    let messageStyle = { marginLeft: 20 };
    return (
      <div style={divStyle}>
        <div>{this.props.name} ：</div>
        <div style={messageStyle}>{this.props.message}</div>
      </div>
    );
  }
}

class MessageBlock extends React.Component {
  render() {
    let message = this.props.messageData.map(item => {
      //在這裡用if判斷留言者item.name中是否含有this.props.searchName的值，如果有就執行，沒有就不動作
      if (item.name.indexOf(this.props.searchName) != -1)
        return (
          <Message key={item.id} name={item.name} message={item.message} />
        );
    });
    return <div>{message}</div>;
  }
}

class SearchBlock extends React.Component {
  render() {
    return (
      <div>
        <span>搜尋留言人：</span>
        <input
          type="text"
          value={this.props.searchName}
          onChange={this.props.changeState}
        />
      </div>
    );
  }
}

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.changeState = this.changeState.bind(this);
  }

  changeState(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <SearchBlock
          searchName={this.state.name}
          changeState={this.changeState}
        />
        <hr />
        <MessageBlock
          messageData={msg}
          searchName={this.state.name}
        />
      </div>
    );
  }
}

class StateMessageForm extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

ReactDOM.render(<Demo name="Pei-Yu" count="4" style={{ 'fontWeight': 600 }} /> ,document.getElementById('root'))
