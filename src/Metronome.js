import React, { Component } from 'react';
import './Metronome.css';
import { tsConstructorType } from '@babel/types';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
    constructor(props){
        super(props);

        this.state = {
            bpm: 100,
            playing: false,
            beatsPerMeasure: 4,
            count: 0
        };  
        
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
        if(this.state.playing){
            //stop old timer and start new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60/bpm)*1000);

            //set new bpm and reset beat counter
            this.setState({
                count: 0,
                bpm
            });
        }//else case where metronome isnt playing just update bpm
        else{
            //just update bpm
            this.setState({bpm});
        }
    };

    startStop = () =>{
        if(this.state.playing){
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        }
        else {
            //start timer with current bpm
            this.timer = setInterval(
                this.playClick,
                (60/this.state.bpm)*1000
            );
            this.setState({
                count: 0,
                playing: true,
                //play a click immeadiately(after setState finishes)
            }, 
            this.playClick
            );
        }
    }

    playClick = () => {
        const {count, beatsPerMeasure} = this.state;

        //the first beat will have a different sound than others
        if(count % beatsPerMeasure ===0){
            this.click2.play();
        }
        else{
            this.click1.play();
        }

        //keep track of which beat we're on
        this.setState(state => ({
            count : (state.count+1) % state.beatsPerMeasure
        }));
    };

    render(){
        const {playing, bpm} = this.state;
        

        return (
            <div className='metronome'>
                <div className='bpm-slider'>
                    <div>{bpm}BPM</div>
                    <input 
                    type='range' 
                    min='60' 
                    max='240' 
                    value={bpm}
                    onChange = {this.handleBpmChange}
                    >
                    
                    </input>
                    
                </div>
                <button onClick = {this.startStop}>
                {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        );
    }

}

export default Metronome;