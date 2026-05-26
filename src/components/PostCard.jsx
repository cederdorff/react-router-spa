export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <img className="post-image" src={post.image} alt="" />
      <div className="post-card-content">
        <time className="post-time" dateTime={post.created_at}>
          {post.created_at}
        </time>
        <h2>{post.caption}</h2>
      </div>
    </article>
  );
}
