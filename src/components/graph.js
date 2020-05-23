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
    if ((nextProps.type === 'state' && nextProps.state !== nextProps.reduxStateName)
    || (nextProps.type === 'county' && nextProps.county !== nextProps.reduxCountyID)) {
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

    if (nextProps.type === 'country') {
      data = nextProps.countryData;
      changed = true;
    } else if (nextProps.type === 'state') {
      data = nextProps.stateData;
      changed = true;
    } else if (nextProps.type === 'county') {
      data = nextProps.countyData;
      changed = true;
    }
    data.forEach((d) => {
      if (d.CaseCountSum < 0) {
        d.CaseCountSum = 0;
      } else if (d.DeathCountSum < 0) {
        d.CaseCountSum = 0;
      }
    });

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
