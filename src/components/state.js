/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesDataVis from '@amcharts/amcharts4/themes/dataviz';
import getStateMapData from '../constants/state-map-objects';
import CountryGraph from './countryGraph';

am4core.useTheme(am4themesDataVis);
am4core.useTheme(am4themesAnimated);

class State extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldMountHeatMap: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statename && nextProps.countyData.length > 0) {
      const mapData = getStateMapData(nextProps.statename);

      if (mapData) {
        // Create map instance
        const chart = am4core.create('statechartdiv', am4maps.MapChart);

        // Set map definition
        chart.geodata = mapData;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        this.chart = chart;
        this.polygonSeries = polygonSeries;

        // Make map load polygon (like county names) data from GeoJSON
        polygonSeries.useGeodata = true;

        this.setState({
          shouldMountHeatMap: true,
        });
      } else {
        console.log('No state level map data available');
      }
    }
  }

  renderChloropleth = () => {
    const countyAbbreviations = {};

    this.polygonSeries.dataItems.values.forEach((dataItem) => {
      countyAbbreviations[dataItem.dataContext.name] = dataItem.dataContext.id;
    });

    const countyData = this.props.countyData.filter(entry => (entry.StateName === this.props.statename));

    countyData.forEach((county) => {
      const name = county.CountyName.replace('County', '').replace('Saint', 'St.');
      county.id = countyAbbreviations[name];
      county.value = county.CaseCountSum;
    });

    this.polygonSeries.data = countyData;

    // set heat map fill rules - fix rules
    this.polygonSeries.heatRules.push({
      property: 'fill',
      target: this.polygonSeries.mapPolygons.template,
      min: this.chart.colors.getIndex(1).brighten(1),
      max: this.chart.colors.getIndex(1).brighten(-0.3),
    });

    // set up heat legend
    const heatLegend = this.chart.createChild(am4maps.HeatLegend);
    heatLegend.series = this.polygonSeries;
    heatLegend.align = 'right';
    heatLegend.valign = 'bottom';
    heatLegend.width = am4core.percent(20);
    heatLegend.marginRight = am4core.percent(6);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 15000;

    // configure series tooltip
    const polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}\n{CaseCountSum} Cases\n{DeathCountSum} Deaths';
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#c2c2c2');

    this.chart.tooltip.getFillFromObject = false;
    this.chart.tooltip.background.fill = am4core.color('#c2c2c2');

    // set county click handler
    polygonTemplate.events.on('hit', this.handleCountyClick);

    this.setState({
      shouldMountHeatMap: false,
    });
  }

  handleCountyClick = (ev) => {
    ev.target.series.chart.zoomToMapObject(ev.target, 5);
    console.log(ev.target.dataItem.dataContext);
  }

  render() {
    if (this.props.statename) {
      if (this.state.shouldMountHeatMap) {
        setTimeout(() => {
          this.renderChloropleth();
        }, 500);
      }
    }

    return (
      <div id="state">
        {this.props.statename ? <h2>{this.props.statename}</h2> : null}
        <div id="statechartdiv" />
        {this.props.statename ? <CountryGraph type="state" state={this.props.statename} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countyData: state.counts.cumCountyData,
  };
};

export default connect(
  mapStateToProps,
  null,
)(State);
