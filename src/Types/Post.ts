import { AudienceGroup } from "./AudienceGroup";

export type Post = {
  postID: number;
  title: string;
  date: string;
  contents: string;
  audienceGroup: AudienceGroup;
};
