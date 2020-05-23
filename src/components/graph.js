/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { getCountry, getState, getCounty } from '../state/actions';

am4core.useTheme(am4themesAnimated);

class Graph extends React.Component {
  componentDidMount() {
    this.retrieveData();
    this.createChart();
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.type === 'state' && this.props.state !== this.props.reduxStateName)
    || (this.props.type === 'county' && this.props.county !== this.props.reduxCountyID)) {
      this.retrieveData();
    }

    // set title
    let titleToDisplay = 'US';

    if (nextProps.type === 'state') {
      titleToDisplay = nextProps.state;
    } else if (nextProps.type === 'county') {
      titleToDisplay = `${nextProps.countyName} County`;
    }

    if (this.chart.titles.values.length === 0 || this.chart.titles.values[0].currentText !== `${titleToDisplay} Cases and Deaths Over Time`) {
      this.chart.titles.clear();
      const title = this.chart.titles.create();
      title.text = `${titleToDisplay} Cases and Deaths Over Time`;
      title.fontSize = 25;
      title.marginBottom = 30;
      title.align = 'left';
    }

    let data = [];
    let changed = false;

    if (this.props.type === 'country' && this.props.countryData.length !== nextProps.countryData.length) {
      data = nextProps.countryData;
      changed = true;
    } else if (this.props.type === 'state' && this.props.stateData.length !== nextProps.stateData.length) {
      data = nextProps.stateData;
      changed = true;
    } else if (this.props.type === 'county' && this.props.countyData.length !== nextProps.countyData.length) {
      data = nextProps.countyData;
      changed = true;
    }

    if (changed) {
      // set date objects
      data.forEach((obj) => {
        obj.Date = new Date(obj.Date);
        obj.Date.setHours(0, 0, 0, 0);
      });

      // save data to chart
      this.chart.data = data;
    }
  }

  createChart = () => {
    const chart = am4core.create(this.props.chartID, am4charts.XYChart);
    chart.data = [];

    // create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    chart.yAxes.push(new am4charts.ValueAxis());

    // create case series
    const caseSeries = chart.series.push(new am4charts.LineSeries());
    caseSeries.dataFields.valueY = 'CaseCountSum';
    caseSeries.dataFields.dateX = 'Date';
    caseSeries.tooltipText = 'Cases: {CaseCountSum}';
    caseSeries.tooltip.pointerOrientation = 'vertical';

    // create death series
    const deathSeries = chart.series.push(new am4charts.LineSeries());
    deathSeries.dataFields.valueY = 'DeathCountSum';
    deathSeries.dataFields.dateX = 'Date';
    deathSeries.tooltipText = 'Deaths: {DeathCountSum}';
    deathSeries.tooltip.pointerOrientation = 'vertical';

    chart.cursor = new am4charts.XYCursor();
    // chart.cursor.snapToSeries = caseSeries;
    chart.cursor.xAxis = dateAxis;

    // chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

    this.chart = chart;
  }

  retrieveData = () => {
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

      if (parseInt(day.CaseCountSum, 10) < 0) {
        d.datasets[0].data.push(0);
      } else {
        d.datasets[0].data.push(parseInt(day.CaseCountSum, 10));
      }

      if (parseInt(day.DeathCountSum, 10) < 0) {
        d.datasets[1].data.push(0);
      } else {
        d.datasets[1].data.push(parseInt(day.DeathCountSum, 10));
      }
    });
  }

  render() {
    return (
      <div id={this.props.styleID}>
        <div id={this.props.chartID} />
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
