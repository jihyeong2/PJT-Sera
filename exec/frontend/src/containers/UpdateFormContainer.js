import { connect } from 'react-redux'
import {login, logout, update} from '../actions/index';
import UpdateForm from '../components/MyPage/UpdateForm/UpdateForm';

const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user)),
  logout: () => dispatch(logout()),
  update: user => dispatch(update(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateForm)