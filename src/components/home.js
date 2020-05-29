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
import { getStates, getCounties } from '../state/actions';

import '../styles/home.scss';

am4core.useTheme(am4themesDataVis);
am4core.useTheme(am4themesAnimated);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: true,
    };

    this.stateRef = React.createRef();
  }

  componentDidMount() {
    this.props.getStates();
    this.props.getCounties();
  }

  handleShowMap = () => {
    this.setState({ showMap: true });
  }

  handleShowChart = () => {
    this.setState({ showMap: false });
  }

  handleStateClick = (ev) => {
    // ev.target.series.chart.zoomToMapObject(ev.target, 5);
    console.log(`onClick: ${ev.target.dataItem.dataContext.name}`);
    this.props.history.push(`/state/${ev.target.dataItem.dataContext.name}`);
  }

  render() {
    return (
      <Fade>
        <div id="home">
          <div id="toggle-row">
            <h3
              className={this.state.showMap ? 'toggle-button-selected' : 'toggle-button'}
              onClick={() => this.setState({ showMap: true })}
            >Show U.S. Map
            </h3>
            <h3
              className={this.state.showMap ? 'toggle-button' : 'toggle-button-selected'}
              onClick={() => this.setState({ showMap: false })}
            >Show Graph of U.S. Cases
            </h3>
          </div>
          {
            this.state.showMap
              ? <Country stateRef={this.stateRef} />
              : (
                <div id="graph-container">
                  <Graph type="country" styleID="countrygraph" chartID="linechartdiv" />
                </div>
              )
          }
          <div ref={this.stateRef}>
            <State statename={this.props.match.params.statename} ref={this.stateRef} />
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => {
      dispatch(getStates());
    },
    getCounties: () => {
      dispatch(getCounties());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
