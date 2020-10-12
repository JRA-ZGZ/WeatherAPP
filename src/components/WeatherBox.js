import React from 'react';
import './WeatherBox.css';
import Utils from '../Utils';

export default class WeatherBox extends React.Component {
  clickWeatherBox = (e) => {
    e.preventDefault()
    this.props.action(this.props.date)
  }

  render(props) {
    return (
      <div className='weather-box' onClick={this.clickWeatherBox}>
        <h1>{this.props.date ? Utils.getWeekDay(this.props.date) : ''}</h1>
        <img
          src={
            this.props.icon
              ? require(`../images/${this.props.icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Math.round(this.props.temp - 273.15)}°C</span>
      </div>
    );
  }
}
