import React from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';
import WeatherBoxDetails from './components/WeatherBoxDetails';
import Utils from './Utils';

class App extends React.Component {

  state = {
    city: undefined, // City name selected.
    dayindex:0, // Selected day in the days array. (index 0 -> today)
    days: [], //All week days info from today
    today: 'today', // Day of the week selected.
    details:[] //Next hours for the day selected.
  };
  
    // tries to make an API call with the given city name and triggers state update
    makeApiCall = async city => {
      try{

        const fetchData = await fetch(
          `/api/weather/city/${city}/${Date.now()}`
        )
        const api_data = await fetchData.json();        
              
        if (api_data.cod === '200') {
          await this.updateState(api_data); 
          return true;
        } 
        return false;
      } catch(e){
        console.error(e);
        if (e.cod === '200') {
          return true;
        } 
        return false;
      }
    };
  
    // returns array with Indexes of the next five days in the list
    parseData = data => {
      const oneDayInMill = 86400000;
      let dayIndexes = [];   
      let index = 0;
      let dayTimeStamp;
      let currentTimeStamp = Date.now();
      const lastIndex = data.list.length;
  
      dayTimeStamp = data.list[index].dt*1000;
      let weekday = new Date(dayTimeStamp).getUTCDay();
      
      const detailsByDay = new Map();
      detailsByDay.set(weekday,[]);
  
      while (index < lastIndex) {
        dayTimeStamp = data.list[index].dt*1000;      
        if(currentTimeStamp < dayTimeStamp ){
          dayIndexes.push(index);
          currentTimeStamp+=oneDayInMill;
        }
        if( weekday !== new Date(dayTimeStamp).getUTCDay()){
          weekday = new Date(dayTimeStamp).getUTCDay();
          detailsByDay.set(weekday,[data.list[index]]);
        } else {
          detailsByDay.get(weekday).push(data.list[index]);
        }
        index++;      
      }
      return {dayIndexes,detailsByDay};
    };


  // creates the day objects and updates the state
  updateState = data => {
    const city = data.city.name;
    const days = [];
    const  {dayIndexes, detailsByDay} = this.parseData(data);
    
    for (let i = 0; i < dayIndexes.length; i++) {
      let weekday = new Date(data.list[dayIndexes[i]].dt*1000).getUTCDay();
      days.push({
        date: data.list[dayIndexes[i]].dt_txt,
        weather_desc: data.list[dayIndexes[i]].weather[0].description,
        icon: data.list[dayIndexes[i]].weather[0].icon,
        temp: data.list[dayIndexes[i]].main.temp,
        weekday: weekday,
        details: detailsByDay.get(weekday)
      });
    }
    this.setState({
      city: city,
      days: days,
      dayindex: 0,
      today: Utils.getWeekDay(Date.now()),
      details: detailsByDay.values().next().value
    });
  };

  updateSelectedDay = index => {
    try{
      const newWeekDay = new Date(index).getUTCDay();
      let newIndex = this.state.days.findIndex(d => d.weekday===newWeekDay);
      const currentIndex = this.state.dayindex;
      if(newIndex !== currentIndex) {        
        this.setState({
          city:this.state.city,
          days: this.state.days,
          dayindex: newIndex,
          today:Utils.getWeekDay(new Date(index)),
          details: this.state.days[newIndex].details 
        });
      }
    }catch(e){
      console.error("error",e,index);
    }        
  }

  render() {
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.map(day => (
        <li>
          <WeatherBox {...day} action={this.updateSelectedDay.bind(this)} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };
    const WeatherBoxDetail = () => {     
      try{
        const details = this.state.details;
        const weatherBoxDetail = details.map(detail => (
            <li><WeatherBoxDetails {...detail}/></li>
        ));        
        return <ul className='weather-box-list-detail'> {weatherBoxDetail} </ul>;
      }catch(e){
        console.error(e);
      }
      
    };

    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={this.state.days[this.state.dayindex]} city={this.state.city} today={this.state.today}>
            <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <WeatherBoxes />
            <section    
            style={{
              visibility: this.state.details.length ? 'visible' : 'hidden',
              opacity: this.state.details.length ? '1' : '0'
            }}>
              <h2>Weather on {this.state.today} </h2>
              <WeatherBoxDetail/>
            </section>
            </MainWeatherWindow>
        </header>
      </div>
    );
  }
}

export default App;
