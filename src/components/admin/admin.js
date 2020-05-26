import React from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { getAllUsers } from '../../state/actions';
import UserTable from './user-table';
import CountyDataTable from './county-data-table';

import '../../styles/admin.scss';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: undefined,
      selectedCountyName: undefined,
      selectedCountyID: undefined,
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  setSelectedState = (stateName) => {
    this.setState({
      selectedState: stateName,
    });
  }

  setSelectedCounty = (countyName, countyID) => {
    this.setState({
      selectedCountyName: countyName,
      selectedCountyID: countyID,
    });
  }

  render() {
    const stateNames = Object.keys(this.props.cumStateData);
    const countyNames = this.state.selectedState ? this.props.cumCountyData.filter(obj => obj.StateName === this.state.selectedState) : [];

    return (
      <Fade>
        <div id="admin">
          <h3 id="users-header">Edit Users</h3>
          <UserTable />
          <h3 id="select-header">Select State and County</h3>
          <StateCountySelector stateNames={stateNames} countyNames={countyNames} setSelectedState={this.setSelectedState} setSelectedCounty={this.setSelectedCounty} />
          <CountyDataTable stateName={this.state.selectedState} countyName={this.state.selectedCountyName} countyID={this.state.selectedCountyID} />
        </div>
      </Fade>
    );
  }
}

const StateCountySelector = (props) => {
  return (
    <div id="state-county-selector">
      <select id="state-selector"
        onChange={(e) => {
          props.setSelectedState(e.target.value);
        }}
      >
        <option disabled selected>Select State</option>
        {props.stateNames.map((name) => {
          return (
            <option value={name}>{name}</option>
          );
        })}
      </select>
      {props.countyNames.length > 0 ? (
        <select id="county-selector"
          onChange={(e) => {
            props.setSelectedCounty(e.target.value, props.countyNames.find(county => county.CountyName === e.target.value).CountyID);
          }}
        >
          <option disabled selected>Select County</option>
          {props.countyNames.map((county) => {
            return (
              <option value={county.CountyName}>{county.CountyName}</option>
            );
          })}
        </select>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cumCountyData: state.counts.cumCountyData,
    cumStateData: state.counts.cumStateData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
