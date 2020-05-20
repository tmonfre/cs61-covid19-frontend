import React, { useEffect } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesDataVis from '@amcharts/amcharts4/themes/dataviz';
import getStateMapData from '../constants/state-map-objects';
import CountryGraph from './countryGraph';

am4core.useTheme(am4themesDataVis);
am4core.useTheme(am4themesAnimated);

export default (props) => {
  useEffect(() => {
    if (props.statename) {
      const mapData = getStateMapData(props.statename);

      if (mapData) {
        // Create map instance
        const chart = am4core.create('statechartdiv', am4maps.MapChart);

        // Set map definition
        chart.geodata = mapData;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        const polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = '{name}';
        polygonTemplate.fill = am4core.color('#c2c2c2');

        // Create hover state and set alternative fill color
        const hs = polygonTemplate.states.create('hover');
        hs.properties.fill = am4core.color('#808080');
      } else {
        console.log('No state level map data available');
      }
    }
  });

  if (props.statename) {
    return (
      <div id="state">
        <h2>{props.statename}</h2>
        <div id="statechartdiv" />
        <CountryGraph type="state" state={props.statename} />
      </div>
    );
  } else return null;
};
