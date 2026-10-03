const API_URL = 'https://campusconnect-qpk0.onrender.com';

export const fetchApplications = () =>
  fetch(API_URL + '/api/applications').then(res => res.json());

export const fetchDocuments = (id) =>
  fetch(API_URL + '/api/documents/' + id).then(res => res.json());

export const fetchNotices = () =>
  fetch(API_URL + '/api/notices').then(res => res.json());

export const fetchTimetables = () =>
  fetch(API_URL + '/api/timetable').then(res => res.json());

export const fetchOpportunities = () =>
  fetch(API_URL + '/api/opportunities').then(res => res.json());