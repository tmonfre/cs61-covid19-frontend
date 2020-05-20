import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getCountry, getState } from '../state/actions';


class CountryGraph extends React.Component {
    d = {
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

    componentDidMount() {
      if (this.props.type === 'country') {
        this.props.getCountry();
      } else if (this.props.type === 'state') {
        this.props.getState(this.props.state);
      }
    }

    handleData = () => {
      console.log(this.props.type);
      const data = this.props.type === 'country' ? this.props.countryData : this.props.stateData;
      console.log(data);
      data.forEach((day) => {
        this.d.labels.push(JSON.stringify(new Date(day.Date).toDateString()));
        this.d.datasets[0].data.push(parseInt(day.CaseCountSum, 10));
        this.d.datasets[1].data.push(parseInt(day.DeathCountSum, 10));
      });
    }


    render() {
      console.log(this.d);
      this.handleData();
      return (
        <div id="countrygraph">
          <Line
            data={this.d}
            options={{
              title: {
                display: true,
                text: `${this.props.state === undefined ? 'US' : this.props.state} Cases and Deaths over time`,
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
  console.log(state.counts);
  return {
    countryData: state.counts.countryData,
    stateData: state.counts.stateData,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryGraph);
