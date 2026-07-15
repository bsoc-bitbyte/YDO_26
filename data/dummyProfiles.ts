export const SELECTED_PROFILE_IDS_STORAGE_KEY =
  "ydo-selected-profile-ids";

export type CurrentlyPlaying = {
  songName: string;
  artistName: string;
  image?: string;
};

export type ProfileStruct = {
  id: string;
  name: string;
  rollNumber: string;
  bio: string;
  interests: string[];

  profileImage?: string;
  currentlyPlaying?: CurrentlyPlaying;
};

export const dummyProfiles: ProfileStruct[] = [
  {
    id: "21bcs021",
    name: "Armaan Patel",
    rollNumber: "21bcs021",
    bio: "I like hanging out with my camera around to capture unforgettable moments.",
    interests: ["Photography", "Music", "Guitar", "Basketball"],
    currentlyPlaying: {
      songName: "Tum Se Hi",
      artistName: "Pritam, Mohit Chauhan",
    },
  },
  {
    id: "20bds059",
    name: "Armaan Verma",
    rollNumber: "20bds059",
    bio: "I enjoy dancing, sketching and meeting people who like trying new things.",
    interests: ["Dance", "Drawing", "Music", "Movies"],
    currentlyPlaying: {
      songName: "Ilahi",
      artistName: "Arijit Singh",
    },
  },
  {
    id: "23bme008",
    name: "Armaan Dey",
    rollNumber: "23bme008",
    bio: "Usually found playing badminton, reading books or exploring new music.",
    interests: ["Badminton", "Music", "Reading", "Fitness"],
    currentlyPlaying: {
      songName: "Safarnama",
      artistName: "Lucky Ali",
    },
  },
  {
    id: "22bcs014",
    name: "Aditi Sharma",
    rollNumber: "22bcs014",
    bio: "I love creating visual designs and capturing ordinary moments through photography.",
    interests: ["Design", "Drawing", "Photography", "Reading"],
    currentlyPlaying: {
      songName: "Iktara",
      artistName: "Kavita Seth",
    },
  },
  {
    id: "21bec031",
    name: "Rohan Mehta",
    rollNumber: "21bec031",
    bio: "A programmer who enjoys badminton, late-night debugging and discovering new songs.",
    interests: ["Coding", "Music", "Badminton", "Gaming"],
    currentlyPlaying: {
      songName: "The Nights",
      artistName: "Avicii",
    },
  },
  {
    id: "22bds017",
    name: "Sneha Iyer",
    rollNumber: "22bds017",
    bio: "I enjoy dancing, designing interfaces and taking pictures whenever I travel.",
    interests: ["Design", "Dance", "Photography", "Travel"],
    currentlyPlaying: {
      songName: "Kho Gaye Hum Kahan",
      artistName: "Jasleen Royal, Prateek Kuhad",
    },
  },
  {
    id: "23bcs042",
    name: "Kabir Singh",
    rollNumber: "23bcs042",
    bio: "Football, multiplayer games and good music are enough to make my day better.",
    interests: ["Football", "Music", "Gaming", "Coding"],
    currentlyPlaying: {
      songName: "Believer",
      artistName: "Imagine Dragons",
    },
  },
  {
    id: "21bme026",
    name: "Nisha Gupta",
    rollNumber: "21bme026",
    bio: "I like sketching people, reading fiction and photographing places around campus.",
    interests: ["Drawing", "Photography", "Reading", "Movies"],
    currentlyPlaying: {
      songName: "Kasoor",
      artistName: "Prateek Kuhad",
    },
  },
  {
    id: "22bec009",
    name: "Dev Malhotra",
    rollNumber: "22bec009",
    bio: "I spend most of my free time playing guitar, coding side projects and listening to music.",
    interests: ["Music", "Guitar", "Coding", "Photography"],
    currentlyPlaying: {
      songName: "Yellow",
      artistName: "Coldplay",
    },
  },
  {
    id: "23bds011",
    name: "Meera Joshi",
    rollNumber: "23bds011",
    bio: "I enjoy performing, designing creative things and participating in college events.",
    interests: ["Dance", "Design", "Music", "Drawing"],
    currentlyPlaying: {
      songName: "Love You Zindagi",
      artistName: "Jasleen Royal",
    },
  },
  {
    id: "21bcs048",
    name: "Aarav Kulkarni",
    rollNumber: "21bcs048",
    bio: "I like outdoor activities, competitive badminton and photographing nature.",
    interests: ["Badminton", "Photography", "Trekking", "Fitness"],
    currentlyPlaying: {
      songName: "Phir Se Ud Chala",
      artistName: "Mohit Chauhan",
    },
  },
  {
    id: "22bcs033",
    name: "Isha Nair",
    rollNumber: "22bcs033",
    bio: "I enjoy making illustrations, designing small projects and exploring different music genres.",
    interests: ["Design", "Drawing", "Music", "Coding"],
    currentlyPlaying: {
      songName: "Alag Aasmaan",
      artistName: "Anuv Jain",
    },
  },
];
export const profileById = new Map<string, ProfileStruct>(
  dummyProfiles.map((profile) =>[profile.id, profile] as const)
);