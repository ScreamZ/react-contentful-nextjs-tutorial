// This is used to transform AST (Abstract Syntax Tree) to HTML that react can understand.
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

function Post(props) {
  // Access post fields map
  const post = props.post.fields;

  return (
    <div className="column">
      <div className="card" style={{ height: "100%" }}>
        <div className="card-image">
          <img src={post.image.fields.file.url} className="img-responsive img-fit-cover" style={{ height: 265 }} />
        </div>
        <div className="card-header">
          <div className="card-title h5">{post.title}</div>
          <div className="card-subtitle text-gray">{new Date(post.date).toDateString()}</div>
        </div>
        <div className="card-body" dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.body) }}></div>
        <div className="divider"></div>
        <div className="card-footer">
          <div className="tile">
            <div className="tile-content">
              <p className="tile-title">By {post.author.fields.firstname + " " + post.author.fields.lastname}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
