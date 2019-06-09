import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/seo/SEO";
import StoriesRoll from "../components/StoriesRoll";
import VideosRoll from "../components/VideosRoll";
import ServicesRoll from "../components/ServicesRoll";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tagDetails = this.props.data.tagDetails;

    const tag =
      tagDetails === null ? this.props.pageContext.tag : tagDetails.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;

    const stories = this.props.data.recommendedStories.edges;
    const videos = this.props.data.recommendedVideos.edges;

    return (
      <Layout>
        <SEO
          title={tag}
          description={tagHeader}
          slug={`\\tags\\${this.props.pageContext.tag}`}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Tags</span>
              </h1>
              <h4 className="font-weight-bold spanborder text-capitalize">
                <span>{tag}</span>
              </h4>
              <BlogRoll posts={posts} />
              <h4 className="font-weight-bold spanborder">
                <span>Recommended Videos</span>
              </h4>
              <VideosRoll videos={videos} />
              <h4 className="font-weight-bold spanborder">
                <span>Recommended Stories</span>
              </h4>
              <StoriesRoll posts={stories} />
              <h4 className="font-weight-bold spanborder">
                <span>Recommended Services</span>
              </h4>
              <ServicesRoll
                services={this.props.data.recommendedServices.edges}
              />
            </div>
            <div className="col-md-4">
              {/* {% include sidebar-featured.html %}     */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    tagDetails: tagsJson(slug: { eq: $tag }) {
      title
      slug
      description
      id
      image
    }
    recommendedServices: allServicesJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      edges {
        node {
          title
          id
          tags
          url
          description
          image
        }
      }
    }
    recommendedStories: allStoriesJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      edges {
        node {
          title
          date(formatString: "MMM DD, YYYY")
          description
          id
          tags
          url
        }
      }
    }
    recommendedVideos: allVideosJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      edges {
        node {
          id
          url
          type
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 186)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
