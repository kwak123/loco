import { connect } from 'react-redux';
import { getRoutesAndService } from '../actions/api';

import Routes from '../components/routes/Routes.jsx';

const mapStateToProps = (state) => {
  return {
    routes: state.api.routes,
    organized: state.api.organized
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoutesAndService() {
      dispatch(getRoutesAndService());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);