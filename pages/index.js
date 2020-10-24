import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Home({ articles }) {
  return (
    <>
      <section className={styles.postsContainer}>
        {articles.map((post, key) => {
          return (
            <>
              <Link href={`/articles/${post.id}`}>
                <a className={styles.posts} key={key}>
                  <h3>{post.title}</h3>
                  <h4>{post.description}</h4>
                </a>
              </Link>
            </>
          );
        })}
      </section>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
  const json = await data.json();
  const mappedData = json.map((article) => {
    return article;
  });

  return {
    props: {
      articles: mappedData,
    },
    revalidate: 3600,
  };
}
