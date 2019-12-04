import React from 'react';
import ReactDOM from 'react-dom';

class NowTime extends React.Component {
  //render是唯一必要的屬性，會回傳一個根Element
  render() {
      return (
        <div>
          <div style={this.props.style}>Hello，{this.props.name}</div>
          <span>現在時間：{new Date().toLocaleTimeString()}</span>
        </div>
      )
  }
}

//宣告一個匿名function
const displayTime = () =>{
  let element = (
    <NowTime name="Pei-Yu" style={{'fontWeight': 600}}/>
  )

  //將上方的組件放進id為root的element中
  ReactDOM.render(element ,document.getElementById('root'))
}

//每隔一秒重新取得時間放到畫面上
setInterval(displayTime,1000)