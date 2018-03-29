import React, { Component } from 'react';
import './Metronome.css';
import click1 from './assets/click1.wav';
import click2 from './assets/click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      timeSignature: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm
      });

    } else {
      this.setState({ bpm });
    }
  }

  handleTimeSignatureChange = event => {
    const timeSignature = event.target.value;

    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);

      this.setState({
        count: 0,
        timeSignature
      });

    } else {
      this.setState({ timeSignature });
    }
  }

  startStop = () => {
    if(this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }
  }

  playClick = () => {
    const { count, timeSignature } = this.state;

    if(count % timeSignature === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.timeSignature
    }));
  }

  render() {
    const { playing, bpm, timeSignature, count } = this.state;

    return (
      <main className="metronome">
        <section className="bpm-slider">
          <h2 className="title">Metronome</h2>
          <p className="bpm">{bpm} BPM</p>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange} />
        </section>
        <section className="bottom">
          <section className="time-signature">
            <p>{timeSignature}/4 Time Signature</p>
            <input
              className="time-signature-slider"
              type="range"
              min="1"
              max="11"
              value={timeSignature}
              onChange={this.handleTimeSignatureChange} />
          </section>
          <p className="count">{count == 0 ? timeSignature : count}</p>
        </section>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </main>
    );
  }
}

export default Metronome;
