export const INTEREST_TAGS = [
  "Photography",
  "Music",
  "Dance",
  "Art/Sketching",
  "Sports",
  "Fitness",
  "Instrument",
  "Gaming",
] as const;

export type InterestTag = (typeof INTEREST_TAGS)[number];

export const BIO_MAX_WORDS = 35;
export const MAX_HOBBIES = 5;