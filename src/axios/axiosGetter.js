import axios from 'axios';

axios.defaults.withCredentials = true;

let domain = 'http://localhost:4000';
/*
if (window.location.hostname !== 'localhost') {
    domain = 'https://dayz-backend.herokuapp.com';
} */

