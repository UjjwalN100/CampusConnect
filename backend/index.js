
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Data Arrays
let applications = [
  { _id: "APP-CC-2026-00124", studentId: "DEMO-STU-001", applicationNumber: "CC-2026-00124", personal: { fullName: "Rahul Patil", dob: "2004-05-15", gender: "Male", phone: "9876543210", email: "rahul.patil@demo.com", address: "Mumbai, MH" }, academic: { previousInstitution: "Demo Junior College", qualification: "HSC", percentage: "85%", passingYear: "2024" }, course: { courseName: "B.Sc. Computer Science", department: "Science", preferredProgram: "Undergraduate" }, applicationStatus: "Under Review", progress: 75, submittedAt: new Date(), updatedAt: new Date() }
];
let notices = [
  { _id: "NOT-1", title: "Semester Examination Timetable Released", description: "The semester examination timetable has been published for eligible students.", fullContent: "The Semester V Examinations will commence on October 15, 2026. All students must carry their hall tickets and college ID cards. Please note that the timing for all exams is 10:00 AM to 01:00 PM.\\n\\nDate: Oct 15 - Data Structures\\nDate: Oct 17 - Operating Systems\\nDate: Oct 19 - Database Management\\nDate: Oct 21 - Computer Networks\\n\\nPractical exams will be held in the following week.", category: "Examinations", priority: "High", publishedDate: new Date() },
  { _id: "NOT-2", title: "Internal Assessment Schedule Updated", description: "The schedule for internal assessments has been updated.", fullContent: "Attention Science Department:\\n\\nThe internal assessment dates for the current semester have been revised due to the upcoming sports week.\\n\\nNew Schedule:\\n- Nov 02: Unit Test 1 (All subjects)\\n- Nov 10: Assignment Submission Deadline\\n- Nov 15: Lab Vivas\\n\\nStudents failing to submit assignments by the deadline will face a grade penalty. Contact your HOD for any discrepancies.", category: "Academic", priority: "Normal", publishedDate: new Date() }
];

app.get('/api/applications', (req, res) => res.json(applications));
app.get('/api/notices', (req, res) => res.json(notices));


let timetables = [
  { _id: "TT-1", type: "Exam", course: "B.Sc. Computer Science", subject: "Data Structures", date: "2026-10-15", day: "Thursday", startTime: "10:00 AM", endTime: "01:00 PM", room: "Hall A" },
  { _id: "TT-2", type: "Subject", course: "B.Sc. Computer Science", subject: "Operating Systems", date: "2026-10-16", day: "Friday", startTime: "09:00 AM", endTime: "10:00 AM", room: "Room 101" }
];
let opportunities = [
  { _id: "OPP-1", title: "Web Development Workshop", type: "Workshop", description: "Learn React and Node.js in this comprehensive 2-day workshop.", date: "2026-10-18", deadline: "2026-10-15", location: "Computer Lab 1" }
];
let documents = [
  { _id: "DOC-1", studentId: "DEMO-STU-001", applicationId: "APP-CC-2026-00124", documentType: "Passport Photo", verificationStatus: "Verified", uploadedAt: new Date() },
  { _id: "DOC-2", studentId: "DEMO-STU-001", applicationId: "APP-CC-2026-00124", documentType: "Identity Proof", verificationStatus: "Verified", uploadedAt: new Date() },
  { _id: "DOC-3", studentId: "DEMO-STU-001", applicationId: "APP-CC-2026-00124", documentType: "Previous Marksheet", verificationStatus: "Pending", uploadedAt: new Date() }
];

app.get('/api/timetable', (req, res) => res.json(timetables));
app.get('/api/opportunities', (req, res) => res.json(opportunities));
app.get('/api/documents/:studentId', (req, res) => res.json(documents.filter(d => d.studentId === req.params.studentId)));



app.listen(5000, () => console.log('Backend running on port 5000'));
