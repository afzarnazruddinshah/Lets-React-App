//API URL Constants
export const AUTH_API = "http://localhost:3001/api/auth";
export const FEED_API = "http://localhost:3001/api/bloodreqs";
export const NEW_REQUEST_API = "http://localhost:3001/api/newbloodreq";
export const MY_REQUESTS_API = "http://localhost:3001/api/myrequests";
export const MY_PROFILE_API = "http://localhost:3001/api/myprofile";
export const MY_PROFILE_UPDATE_API = "http://localhost:3001/api/myprofile/update";
export const bloodgroupsDDOptions = [
  { id: 1, label: "A+", value: "a+" },
  { id: 2, label: "B+", value: "b+" },
  { id: 3, label: "O+", value: "o+" },
  { id: 4, label: "AB+", value: "ab+" },
  { id: 5, label: "A-", value: "a-" },
  { id: 6, label: "B-", value: "b-" },
  { id: 7, label: "O-", value: "o-" },
  { id: 8, label: "AB-", value: "ab-" }
];
export const genderDDOptions = [
  { id: 1, label: "Male", value: "male" },
  { id: 2, label: "Female", value: "female" },
  { id: 3, label: "Other", value: "other" }
];
