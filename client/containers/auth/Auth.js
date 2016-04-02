/** client/containers/auth/Auth.js **/

import { connect } from 'react-redux';
import ViewAuth from '../../components/auth/ViewAuth';

const mapStateToProps = (state) => {
  return {
    page: state.auth.page,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAuth);
