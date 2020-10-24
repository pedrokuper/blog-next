import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home({ articles }) {
  console.log(articles);
  const options = {
    month: "short",
    day: "2-digit",
  };
  return (
    <div className={styles.wrapper}>
      <main className={styles.postsContainer}>
        {articles.map((post, key) => {
          const { name } = post.user;
          return (
            <>
              <Link href={`/articles/${post.id}`}>
                <article key={key} className={styles.card}>
                  <div className={styles.postWrapper}>
                    <img
                      className={styles.profileImage}
                      src={post.user.profile_image}
                      alt=""
                    />
                    <div className={styles.postInfo}>
                      <span>{name}</span>
                      <span>{post.readable_publish_date}</span>
                    </div>
                  </div>
                  <a>
                    <h3 className={styles.title}>{post.title}</h3>
                    {post.tag_list.map((tag) => {
                      return <span className={styles.tags}>#{tag}</span>;
                    })}
                    <h4>{post.description}</h4>

                    <div className={styles.socialContainer}>
                      <div className={styles.reactions}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                        </svg>
                        <span>{`${post.positive_reactions_count} reactions`}</span>
                      </div>
                      <div className={styles.comments}>
                        <svg
                          class="crayons-icon"
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                        </svg>
                        <span>{`${post.comments_count} comments`}</span>
                      </div>
                    </div>
                  </a>
                </article>
              </Link>
            </>
          );
        })}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
  const json = await data.json();

  return {
    props: {
      articles: json,
    },
  };
}
