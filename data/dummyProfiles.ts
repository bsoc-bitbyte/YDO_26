export type ProfileStruct = {
  id: string;
  name: string;
  rollNumber: string;
  interests: string[];
};

export const SELECTED_PROFILE_IDS_STORAGE_KEY = "ydo-selected-profile-ids";

export const dummyProfiles: ProfileStruct[] = [
  {
    id: "1",
    name: "Jaspreet Singh",
    rollNumber: "25bcs099",
    interests: ["Photography", "Music"],
  },
  {
    id: "2",
    name: "Rohan Kumar",
    rollNumber: "25bcs101",
    interests: ["Dance", "Drawing"],
  },
  {
    id: "3",
    name: "Aarav Sharma",
    rollNumber: "25bcs120",
    interests: ["Badminton", "Music"],
  },
  {
    id: "4",
    name: "Nisha Verma",
    rollNumber: "23bcs122",
    interests: ["Design", "Photography"],
  },
  {
    id: "5",
    name: "Karan Mehta",
    rollNumber: "23bcs130",
    interests: ["Drawing", "Design"],
  },
  {
    id: "6",
    name: "Priya Singh",
    rollNumber: "23bcs141",
    interests: ["Music", "Dance"],
  },
  {
    id: "7",
    name: "Ananya Rao",
    rollNumber: "25bcs150",
    interests: ["Photography", "Badminton"],
  },
  {
    id: "8",
    name: "Anshika Singh",
    rollNumber: "25bcs102",
    interests: ["Design", "Drawing"],
  },
  {
    id: "9",
    name: "Anamika Singh",
    rollNumber: "25bcs134",
    interests: ["Music", "Dance"],
  },
];

export const profileById = new Map(
  dummyProfiles.map((profile) => [profile.id, profile])
);