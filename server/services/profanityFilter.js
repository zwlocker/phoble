import { Filter } from "bad-words";

const filter = new Filter();

// Checks if username is profane
export default function hasProfanity(text) {
  return filter.isProfane(text);
}
