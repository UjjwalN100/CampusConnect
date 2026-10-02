const API_URL = 'http://192.168.31.116:5000/api';
export const fetchApplications = () => fetch(API_URL + '/applications').then(res => res.json());
export const fetchDocuments = (id) => fetch(API_URL + '/documents/' + id).then(res => res.json());
export const fetchNotices = () => fetch(API_URL + '/notices').then(res => res.json());
export const fetchTimetables = () => fetch(API_URL + '/timetable').then(res => res.json());
export const fetchOpportunities = () => fetch(API_URL + '/opportunities').then(res => res.json());
