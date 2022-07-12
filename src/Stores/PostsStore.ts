import { makeAutoObservable } from "mobx";
import agent from "../Agent";
import { Faculty } from "../Types/Faculty";
import { Post } from "../Types/Post";
import { Student } from "../Types/Student";
import { User } from "../Types/User";
import { arrayToMap } from "../utils";

export class PostsStore {
  posts: Map<number, Post> | undefined = undefined;
  currentPage: number = 1;
  user: User | undefined = undefined;
  faculty: Faculty | undefined = undefined;
  student: Student | undefined = undefined;

  constructor(user: User, faculty: Faculty, student?: Student) {
    this.user = user;
    this.faculty = faculty;
    this.student = student;
    makeAutoObservable(this);
    this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const { data, status } = await agent.Posts.GetAllPosts();
      if (status === 200) {
        this.posts = arrayToMap(data, "postID");
      }
    } catch (err) {
      console.log(err);
    }
  };

  getPosts = (): Post[] => {
    return Array.from(this.posts?.values()!);
  };

  setIndex = (newIndex: number) => {
    console.log("old index - " + this.currentPage);
    this.currentPage = newIndex;
    console.log("new index - " + this.currentPage);
  };

  getPostsFromIndex = () => {
    return this.getPosts().slice(
      (this.currentPage - 1) * 5,
      this.currentPage * 5
    );
  };
}
