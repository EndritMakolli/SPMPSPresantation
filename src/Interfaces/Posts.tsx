import { Pagination } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { DatePicker } from "../Components/Common/DatePicker";
import { Loader } from "../Components/Loader";
import { useStore } from "../Stores/Store";
import "../Style/Posts.css";
import { Post } from "../Types/Post";
import { dateParser } from "../utils";

export default observer(function Posts() {
  const { posts, setIndex, getPostsFromIndex, currentPage, getPosts } =
    useStore().userStore.postsStore!;
  const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setIndex(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h1>Postimet</h1>
      <section className="contents" id="posts">
        {!posts && <Loader />}
        {posts && (
          <>
            <DatePicker info="Filtro sipas datës" />

            {getPostsFromIndex().map((post) => {
              return <PostView key={post.postID} post={post} />;
            })}
            <Pagination
              page={currentPage}
              className={"mg-lg"}
              onChange={onPageChange}
              count={Math.floor(getPosts().length / 5) + 1}
            />
          </>
        )}
      </section>
    </>
  );
});

interface PostProps {
  post: Post;
}

const PostView = ({ post }: PostProps) => {
  return (
    <article className="post">
      <div className="postHeader pad-sm">
        <h2 className="pad-sm">{post.title}</h2>
        <div className="row align-center pad-sm">
          <h3>{dateParser(post.date)}</h3>
          <p className="postGroup col-2 text-center">
            {post.audienceGroup.audienceGroupName}
          </p>
        </div>
      </div>
      <div className="postBody mg-sm">{post.contents}</div>
    </article>
  );
};
