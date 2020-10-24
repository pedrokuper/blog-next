import ReactMarkdown from "react-markdown";
import styles from "../../styles/Articles.module.scss";

export default function Articles(props) {
  const { title, tags, cover_image, name, content, date, avatar } = props;
  console.log(props);

  return (
    <section className={styles.sectionWrapper}>
      <img className={styles.articleCover} src={cover_image} alt="" />
      <article className={styles.articleWrapper}>
        <h1 className={styles.articleTitle}>{title}</h1>
        <div>
          {tags.map((tag, key) => {
            return (
              <span className={styles.articleTags} key={key}>
                #{tag}
              </span>
            );
          })}
        </div>
        <div className={styles.articleInfo}>
          <img className={styles.userAvatar} src={avatar} alt="" />
          <span className={styles.userName}>{name}</span>
          <span className={styles.articleDate}>{date}</span>
        </div>

        <ReactMarkdown escapeHtml={false} renderers={{ image: BlogImage }}>
          {content}
        </ReactMarkdown>
      </article>
    </section>
  );
}

const BlogImage = (props) => {
  return <img {...props} style={{ maxWidth: "100%" }} />;
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://dev.to/api/articles/${id}`);
  const data = await res.json();
  const {
    cover_image,
    tags,
    title,
    body_markdown,
    readable_publish_date,
  } = data;
  const { name, profile_image } = data.user;
  return {
    props: {
      id,
      name,
      cover_image,
      tags,
      title,
      content: body_markdown,
      date: readable_publish_date,
      avatar: profile_image,
    },
  };
}
