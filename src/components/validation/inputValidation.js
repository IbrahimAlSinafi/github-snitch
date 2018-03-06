import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

// check to see if a particular document was found
export default json => {
  if (json !== 'Not Found') {
    return true;
  }
  Alert.error('There is no such github user!', {
    offset: 150,
    timeout: 5000,
    onShow() {
      console.log('There is no such github user!');
    },
  });
  return false;
};
