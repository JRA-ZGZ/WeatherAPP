import React from 'react';
import './WeatherBoxDetails.css';

export default class WeatherBoxDetails extends React.Component {

  render(props) {
    return (
      <div className='weather-box'>
        <h1>{this.props.dt_txt ? this.props.dt_txt : ''}</h1>
        <img
          src={
            this.props.weather[0].icon
              ? require(`../images/${this.props.weather[0].icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Math.round(this.props.main.temp - 273.15)}°C</span>
        <span className='temp'>{this.props.weather[0].description}</span>
      </div>
    );
  }
}
