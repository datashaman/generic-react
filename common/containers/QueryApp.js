import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Query from '../components/Query';
import * as QueryActions from '../actions/query';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(QueryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Query);
