/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  getCounty, createCaseCount, updateCaseCount, deleteCaseCount,
} from '../../state/actions';

class CountyDataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      editing: false,
    };

    this.rowRefs = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countyID !== this.props.countyID) {
      this.props.getCounty(nextProps.countyID);
    }
  }

  saveObjects = () => {
    this.rowRefs.forEach((ref, i) => {
      const oldObj = this.props.countyData[i];
      const updatedObj = ref.current.getUpdatedObject();

      if (!isEqual(oldObj, updatedObj)) {
        this.props.updateCaseCount(this.props.countyID, updatedObj.Date, {
          CaseCount: updatedObj.CaseCountSum,
          DeathCount: updatedObj.DeathCountSum,
        });
      }
    });
  };

  saveNewObject = () => {
    const newObj = this.rowRefs[this.rowRefs.length - 1].current.getUpdatedObject();
    this.props.createCaseCount(this.props.countyID, newObj.Date, { ...newObj, StateName: this.props.stateName });
  };

  _renderCreateIcon = () => {
    if (this.state.editing) {
      return null;
    } else if (this.state.create) {
      return (
        <div id="icon-area" role="button" tabIndex={0} onClick={() => { this.setState({ create: false }); this.saveNewObject(); }}>
          <SaveIcon />
          <p>Save</p>
        </div>
      );
    } else {
      return (
        <div id="icon-area"
          role="button"
          tabIndex={0}
          onClick={() => { this.setState({ create: true }); this.rowRefs.push(React.createRef()); }}
        >
          <AddBoxIcon />
          <p>Create</p>
        </div>
      );
    }
  }

  render() {
    if (!(this.props.stateName && this.props.countyName && this.props.countyID)) {
      return null;
    }

    this.rowRefs = this.props.countyData.map(() => React.createRef());

    return (
      <div id="county-data-table-area">
        <div id="icon-button-container">
          {this._renderCreateIcon()}
          {this.state.create ? null : (
            <div id="icon-area"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (this.state.editing) this.saveObjects();
                else {
                  this.rowRefs.forEach((ref) => {
                    ref.current.updateStateForEdit();
                  });
                }

                this.setState({ editing: !this.state.editing });
              }}
            >
              {this.state.editing ? <SaveIcon /> : <EditIcon />}
              <p>{this.state.editing ? 'Save' : 'Edit'}</p>
            </div>
          )}
        </div>
        <table>
          <tr>
            {this.state.editing ? <th>Delete</th> : null}
            <th>Date</th>
            <th>Cases</th>
            <th>Deaths</th>
          </tr>
          {this.props.countyData.map((count, i) => {
            return (
              <CaseCountRow count={{ ...count, CountyID: this.props.countyID }}
                isEditing={this.state.editing}
                ref={this.rowRefs[i]}
                deleteCaseCount={this.props.deleteCaseCount}
                stopEditing={() => { this.setState({ editing: false, create: false }); }}
              />
            );
          })}
          {this.state.create ? (
            <CaseCountRow count={{
              Date: new Date(Date.now()).toISOString(),
              CaseCountSum: 0,
              DeathCountSum: 0,
            }}
              isEditing
              create
              ref={this.rowRefs[this.rowRefs.length - 1]}
            />
          ) : null}
        </table>
      </div>
    );
  }
}

class CaseCountRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.count.Date,
      cases: props.count.CaseCountSum,
      deaths: props.count.DeathCountSum,
    };
  }

    getUpdatedObject = () => {
      return {
        ...this.props.count,
        Date: this.state.date,
        CaseCountSum: this.state.cases,
        DeathCountSum: this.state.deaths,
      };
    }

    _deleteObject = () => {
      if (this.props.deleteCaseCount) {
        this.props.deleteCaseCount(this.props.count.CountyID, this.props.count.Date);
        this.props.stopEditing();
      }
    };

    updateStateForEdit = () => {
      this.setState({
        date: this.props.count.Date,
        cases: this.props.count.CaseCountSum,
        deaths: this.props.count.DeathCountSum,
      });
    }

    render() {
      if (this.props.isEditing) {
        return (
          <tr>
            {!this.props.create ? <td id="trash"><DeleteIcon onClick={this._deleteObject} /></td> : null}
            <td><input value={this.state.date} onChange={e => this.setState({ date: e.target.value })} /></td>
            <td><input value={this.state.cases} onChange={e => this.setState({ cases: e.target.value })} /></td>
            <td><input value={this.state.deaths} onChange={e => this.setState({ deaths: e.target.value })} /></td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>{this.props.count.Date}</td>
            <td>{this.props.count.CaseCountSum}</td>
            <td>{this.props.count.DeathCountSum}</td>
          </tr>
        );
      }
    }
}

const mapStateToProps = (state) => {
  return {
    countyData: state.counts.countyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCounty: (countyID) => {
      dispatch(getCounty(countyID));
    },
    createCaseCount: (countyID, date, fields) => {
      dispatch(createCaseCount(countyID, date, fields));
    },
    updateCaseCount: (countyID, date, fields) => {
      dispatch(updateCaseCount(countyID, date, fields));
    },
    deleteCaseCount: (countyID, date) => {
      dispatch(deleteCaseCount(countyID, date));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountyDataTable);
