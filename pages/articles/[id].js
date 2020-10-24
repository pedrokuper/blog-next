import ReactMarkdown from "react-markdown";

export default function Articles(props) {
  const { title, tags, cover_image, name, content } = props;
  console.log(tags);
  return (
    <section>
      <h1>WACHO</h1>
      <img src={cover_image} alt="" />
      <h1>{title}</h1>
      <ul>
        {tags.map((tag, key) => {
          return <li key={key}>{tag}</li>;
        })}
      </ul>
      <p>{name}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://dev.to/api/articles/${id}`);
  const data = await res.json();
  console.log(data.user.name);
  const { cover_image, tags, title, body_markdown } = data;
  const { name } = data.user;
  return {
    props: {
      id,
      name,
      cover_image,
      tags,
      title,
      content: body_markdown,
    },
  };
}
