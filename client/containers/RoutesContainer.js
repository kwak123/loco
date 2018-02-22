import { connect } from 'react-redux';
import { getRoutesAndService } from '../actions/api';

import Routes from '../components/routes/Routes.jsx';

const mapStateToProps = (state) => {
  return {
    service: state.api.service,
    organized: state.api.organized
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoutesAndService() {
      dispatch(getRoutesAndService());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);