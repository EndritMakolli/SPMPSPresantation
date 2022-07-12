import { makeAutoObservable } from "mobx";
import agent from "../../Agent";
import { User } from "../../Types/User";

export class SettingsStore {
  user: User | undefined = undefined;
  postsChecked: boolean | undefined = false;
  loading: boolean = true;

  constructor(user: User) {
    makeAutoObservable(this);
    this.user = user;
    this.fetchSettings();
  }

  fetchSettings = async () => {
    await Promise.all([this.fetchPostsChecked()]);
    this.loading = false;
  };

  fetchPostsChecked = async () => {
    try {
      const { data, status } = await agent.Posts.CheckIfSubscribed(
        this.user?.id!
      );
      if (status === 200) {
        this.postsChecked = data;
      }
    } catch (e) {
      console.log(e);
      console.log("Error - couldn't fetch posts subscription");
    }
  };

  changePostsEmailSubscription = async () => {
    try {
      const { status } = await agent.Posts.SubscribeToEmails(this.user?.id!);
      if (status === 200) {
        this.postsChecked = !this.postsChecked;
      }
    } catch (e) {
      console.log(e);
    }
  };
}
