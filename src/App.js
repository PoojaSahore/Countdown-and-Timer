import React, { Component } from 'react'
import {Form, FormControl, Button} from 'react-bootstrap'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deadline : 'January 01, 2019',
      newDeadline : ''
    }
    this.handleDeadline = this.handleDeadline.bind(this)
  }

  handleDeadline() { console.log(Date.parse(this.state.newDeadline))
    if(this.state.newDeadline === '' || isNaN(Date.parse(this.state.newDeadline))) 
      alert("enter a valid date")
      else {
        this.setState({deadline: this.state.newDeadline})
      }
      this.setState({newDeadline: ''})
  }

  render() {  //console.log(this.state)
    return (
      <div className="App">
        <h1>Countdown to {this.state.deadline}</h1>
        <Clock deadline={this.state.deadline} />
        <Form inline>
          <FormControl value={this.state.newDeadline} placeholder="enter new date" type='text' onChange={(e) => {this.setState({newDeadline:e.target.value})}} />
          <Button onClick={this.handleDeadline}> GO! </Button>
        </Form>
        <Timer />
      </div>
    )
  }
}

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days : 0,
      hours : 0,
      mins : 0,
      sec : 0
    }
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date())
    const sec = Math.floor((time / 1000) % 60)
    const mins = Math.floor((time / 1000 / 60) % 60) 
    const hours = Math.floor((time / (1000*3600)) % 24)
    const days = Math.floor((time / (1000*3600*24)))
    this.setState({
      days, hours, mins, sec
    })
  }

  componentWillMount() {
    this.getTimeUntil(this.props.deadline)
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000)
  }

  leading0(num) {
    return num < 10 ? '0' + num : num
  }

  render() {
    
    return (
      <div className="count">
        <div className="clock-days">{this.leading0(this.state.days)} days</div>
        <div className="clock-hours">{this.leading0(this.state.hours)} hrs</div>
        <div className="clock-mins">{this.leading0(this.state.mins)} mins</div>
        <div className="clock-sec">{this.leading0(this.state.sec)} sec</div>
      </div>
    )
  }
}

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      h : '', m : '', s : '',
      hours : 0,
      mins : 0,
      sec : 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() { 
    if((this.state.h === '') || (this.state.m === '') || (this.state.s === '') || (isNaN(this.state.h)) || (isNaN(this.state.m)) || (isNaN(this.state.s)))
      alert("enter a valid time")
      else {
      this.setState({
        hours : this.state.h,
        mins :  this.state.m,
        sec : this.state.s
      })
      let totalSeconds = (parseInt(this.state.h)*3600) + (parseInt(this.state.m)*60) + parseInt(this.state.s)
      //console.log(totalSeconds)
      setInterval(() => {
      totalSeconds--
      this.getTimeUntil(totalSeconds)}, 1000)
      }
      this.setState({h: '', m: '', s: ''})
  }

  getTimeUntil(totalSeconds) {
    //console.log(totalSeconds)
    if(totalSeconds === -1)
      alert('time up')
    if(totalSeconds >= 0) {
        const hours   = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds - (hours * 3600)) / 60);
        const sec = totalSeconds - (hours * 3600) - (mins * 60);
        this.setState({
          hours, mins, sec
        })
    }
  }

  render() {  //console.log(this.state)
    return (
      <div className="timer">
        <h1>Timer</h1>
        <Form inline>
        <FormControl type="text" value={this.state.h} placeholder="enter hours" onChange={(e) => this.setState({h : e.target.value})} />
        <FormControl type="text" value={this.state.m} placeholder="enter minutes" onChange={(e) => this.setState({m : e.target.value})} />
        <FormControl type="text" value={this.state.s} placeholder="enter seconds" onChange={(e) => this.setState({s : e.target.value})} />
        <Button onClick={this.handleClick}>start</Button>
        </Form>
        <Counter hours={this.state.hours} mins={this.state.mins} sec={this.state.sec} />
      </div>
    )
  }
}

const Counter = (props) => {

  const leading0 = (num) => {
    return num < 10 ? '0' + num : num
  }
  //console.log(this.state)
    return (
      <div className="count">
        <div className="clock-hours">{leading0(props.hours)} hrs</div>
        <div className="clock-mins">{leading0(props.mins)} mins</div>
        <div className="clock-sec">{leading0(props.sec)} sec</div>
      </div>
    )

}

export default App;
