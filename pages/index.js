import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import Post from "../components/post";
import config from "../config.json";

// Instantiate the app client
const client = createClient({
  space: config.space,
  accessToken: config.accessToken
});

// Our Homepage component, will receive props from contentful entries thanks to getInitialProps function below.
function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Welcome to NextJS + Contentful by ScreamZ</title>
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
      </Head>
      <div className="container grid-lg mt-2">
        <div className="columns">
          {props.allPosts && props.allPosts.map(post => <Post post={post} key={post.fields.title} />)}
        </div>
      </div>
    </React.Fragment>
  );
}

// This function will run during build time in case of static export.
// Or will run each time a new request is made to the browser in SSR.
// It's used to compute initial props for the component and pre-render.
HomePage.getInitialProps = async () => {
  // Get every entries in contentful from type Article, sorted by date.
  // article is the ID of the content model we created on the dashboard.
  const entries = await client.getEntries({
    content_type: "article",
    order: "-fields.date"
  });

  // Inject in props of our screen component
  return { allPosts: entries.items };
};

// That's the default export (the page)
export default HomePage;
