/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Fade } from 'react-reveal';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataUSLow from '@amcharts/amcharts4-geodata/usaTerritories2Low';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesDataVis from '@amcharts/amcharts4/themes/dataviz';

import '../styles/home.scss';

am4core.useTheme(am4themesDataVis);
am4core.useTheme(am4themesAnimated);

const stateAbbreviations = require('../data/state-abbreviations.json');

class Country extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mountedGraph: false,
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.stateData).length > 0 && !this.state.mountedGraph) {
      this.createMap(this.props.stateData);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.stateData).length > 0 && !this.state.mountedGraph) {
      this.createMap(nextProps.stateData);
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
    this.setState({
      mountedGraph: false,
    });
  }

  createMap = (propsStateData) => {
    const stateData = [];
    Object.keys(propsStateData).forEach((stateName) => {
      stateData.push({
        ...propsStateData[stateName],
        id: stateAbbreviations[stateName],
        value: propsStateData[stateName].caseCountSum,
      });
    });

    // create map of US states and territories
    const map = am4core.create('chartdiv', am4maps.MapChart);
    map.geodata = am4geodataUSLow;
    map.projection = new am4maps.projections.Miller();
    map.chartContainer.wheelable = false;

    // define state shape and data
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.data = stateData;

    // set heat map fill rules
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: map.colors.getIndex(1).brighten(1),
      max: map.colors.getIndex(1).brighten(-0.3),
    });

    // set up heat legend
    const heatLegend = map.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = 'right';
    heatLegend.valign = 'bottom';
    heatLegend.width = am4core.percent(20);
    heatLegend.marginRight = am4core.percent(6);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 30000;

    // configure series tooltip
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}\n{caseCountSum} Cases\n{deathCountSum} Deaths';
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#c2c2c2');

    map.tooltip.getFillFromObject = false;
    map.tooltip.background.fill = am4core.color('#c2c2c2');

    // set state click handler
    polygonTemplate.events.on('hit', this.handleStateClick);

    // save map
    map.zoomControl = new am4maps.ZoomControl();
    this.map = map;

    this.setState({
      mountedGraph: true,
    });
  }

  handleStateClick = (ev) => {
    // ev.target.series.chart.zoomToMapObject(ev.target, 5);
    console.log(`onClick: ${ev.target.dataItem.dataContext.name}`);
    this.props.history.push(`/state/${ev.target.dataItem.dataContext.name}`);
    this.scrollToState();
  }

  scrollToState = () => {
    window.scrollTo(0, this.props.stateRef.current.offsetTop);
  }

  render() {
    return (
      <Fade>
        <div id="chartdiv" />
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateData: state.counts.cumStateData,
  };
};

export default withRouter(connect(mapStateToProps, null)(Country));
