/* eslint-disable no-param-reassign */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Fade } from 'react-reveal';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataUSLow from '@amcharts/amcharts4-geodata/usaTerritories2Low';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesDataVis from '@amcharts/amcharts4/themes/dataviz';
import State from './state';
import CountryGraph from './countryGraph';

import '../styles/home.scss';

am4core.useTheme(am4themesDataVis);
am4core.useTheme(am4themesAnimated);

const stateData = require('../data/state-data.json');
const stateAbbreviations = require('../data/state-abbreviations.json');

stateData.forEach((state) => {
  state.id = stateAbbreviations[state.StateName];
  state.value = state.CaseCountSum;
});


class Home extends React.Component {
  componentDidMount() {
    // create map of US states and territories
    const map = am4core.create('chartdiv', am4maps.MapChart);
    map.geodata = am4geodataUSLow;
    map.projection = new am4maps.projections.Miller();

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
    polygonTemplate.tooltipText = '{name}\n{CaseCountSum} Cases\n{DeathCountSum} Deaths';
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
  }


  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  handleStateClick = (ev) => {
    // ev.target.series.chart.zoomToMapObject(ev.target, 5);
    console.log(ev.target.dataItem.dataContext);

    this.props.history.push(`/state/${ev.target.dataItem.dataContext.name}`);
  }


  render() {
    return (
      <Fade>
        <div id="home">
          <div id="chartdiv" />
          <CountryGraph />
          <State statename={this.props.match.params.statename} />
        </div>
      </Fade>
    );
  }
}

export default withRouter(Home);
