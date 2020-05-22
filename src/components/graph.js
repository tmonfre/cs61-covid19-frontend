import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getCountry, getState, getCounty } from '../state/actions';


class Graph extends React.Component {
  componentDidMount() {
    this.retrieveData();
  }

    retrieveData = () => {
      console.log('retrieve data');
      if (this.props.type === 'country') {
        this.props.getCountry();
      } else if (this.props.type === 'state') {
        this.props.getState(this.props.state);
      } else if (this.props.type === 'county') {
        this.props.getCounty(this.props.county);
      }
    }

    handleData = (d) => {
      let data = [];
      switch (this.props.type) {
        case 'county':
          data = this.props.countyData;
          break;
        case 'state':
          data = this.props.stateData;
          break;
        case 'country':
          data = this.props.countryData;
          break;
        default:
          data = [];
          break;
      }
      data.forEach((day) => {
        d.labels.push(JSON.stringify(new Date(day.Date).toDateString()));
        if (parseInt(day.CaseCountSum, 10) < 0) d.datasets[0].data.push(0);
        else d.datasets[0].data.push(parseInt(day.CaseCountSum, 10));
        if (parseInt(day.DeathCountSum, 10) < 0) d.datasets[1].data.push(0);
        else d.datasets[1].data.push(parseInt(day.DeathCountSum, 10));
      });
    }

    render() {
      if (this.props.type === 'state' && this.props.state !== this.props.reduxStateName) this.retrieveData();
      else if (this.props.type === 'county' && this.props.county !== this.props.reduxCountyID) this.retrieveData();
      const d = {
        labels: [],
        datasets: [
          {
            label: 'Cases',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
          },
          {
            label: 'Deaths',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,255,1)',
            borderWidth: 2,
            data: [],
          },
        ],
      };
      this.handleData(d);
      let titleToDisplay = 'US';
      if (this.props.type === 'state') {
        titleToDisplay = this.props.state;
      } else if (this.props.type === 'county') {
        titleToDisplay = `${this.props.countyName} County`;
      }
      return (
        <div id="countrygraph">
          <Line
            data={d}
            width="100"
            height="50"
            options={{
              title: {
                display: true,
                text: `${titleToDisplay} Cases and Deaths over time`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    countryData: state.counts.countryData,
    stateData: state.counts.stateData,
    countyData: state.counts.countyData,
    reduxStateName: state.counts.stateName,
    reduxCountyID: state.counts.countyID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountry: () => {
      dispatch(getCountry());
    },
    getState: (state) => {
      dispatch(getState(state));
    },
    getCounty: (countyID) => {
      dispatch(getCounty(countyID));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Graph);
