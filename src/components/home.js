/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Fade } from 'react-reveal';
import * as am4core from '@amcharts/amcharts4/core';
// import * as am4maps from '@amcharts/amcharts4/maps';
// import am4geodataUSLow from '@amcharts/amcharts4-geodata/usaTerritories2Low';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesDataVis from '@amcharts/amcharts4/themes/dataviz';
import Country from './country';
import State from './state';
import Graph from './graph';

import '../styles/home.scss';

am4core.useTheme(am4themesDataVis);
am4core.useTheme(am4themesAnimated);

// const stateAbbreviations = require('../data/state-abbreviations.json');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: true,
    };
  }

  handleShowMap = () => {
    this.setState({ showMap: true });
  }

  handleShowChart = () => {
    this.setState({ showMap: false });
  }

  render() {
    return (
      <Fade>
        <div id="home">
          <button onClick={this.handleShowMap}>Show Map</button>
          <button onClick={this.handleShowChart}>Show Chart</button>
          {
            this.state.showMap
              ? <Country />
              : <Graph type="country" />
          }
          <State statename={this.props.match.params.statename} />
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateData: state.counts.cumStateData,
  };
};

export default withRouter(connect(mapStateToProps, null)(Home));
