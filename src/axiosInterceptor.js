import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

export default axios;