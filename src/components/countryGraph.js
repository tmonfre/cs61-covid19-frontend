import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getCountries } from '../state/actions';


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
      this.props.getCountries();
    }

    handleData = () => {
      this.props.data.forEach((day) => {
        this.d.labels.push(JSON.stringify(new Date(day.Date).toDateString()));
        this.d.datasets[0].data.push(parseInt(day.CaseCountSum, 10));
        this.d.datasets[1].data.push(parseInt(day.DeathCountSum, 10));
      });
    }


    render() {
      this.handleData();
      console.log(this.d);
      return (
        <div id="chartdiv">

          <Line
            data={this.d}
            options={{
              title: {
                display: true,
                text: 'Total US Cases and Deaths over time',
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
    data: state.country.casesOverTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch(getCountries());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryGraph);
