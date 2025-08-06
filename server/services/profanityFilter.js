import { Filter } from "bad-words";

const filter = new Filter();

export default function hasProfanity(text) {
  return filter.isProfane(text);
}
