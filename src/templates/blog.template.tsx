import BlogRoll from "@components/BlogRoll";
import Layout from "@components/Layout";
import Pagination from "@components/Pagination";
import SEO from "@components/seo/SEO";
import { graphql, Link } from "gatsby";
import React from "react";
import normalize from "../../gatsby/data/data.normalize";

function BlogPage({ pageContext, data }) {
  const articles = data.articles.edges.map(normalize.local.articles);
  const { previousPagePath, nextPagePath, topics } = pageContext;

  return (
    <Layout>
      <SEO
        title="Blog"
        description="Abhith Rajan on Programming, The Web, Open Source, .NET, The Cloud and More"
        slug="\blog"
      />

      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen">
              <h4 className="title is-4 spanborder has-text-weight-bold">
                <span>All Stories</span>
              </h4>
              <BlogRoll posts={articles} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
              />
            </div>
            <div className="column is-3 is-2-widescreen is-hidden-mobile">
              <div className="tags-widget">
                <h4 className="title is-4 spanborder has-text-weight-bold">
                  <span>All Topics</span>
                </h4>
                <div className="tags">
                  {topics.map(topic => (
                    <Link to={`/topics/${topic.slug}/`} key={topic.slug}>
                      <span className="tag">{topic.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogPage;

export const pageQuery = graphql`
  query BlogRollQuery($skip: Int!, $limit: Int!) {
    articles: allArticle(
      filter: { draft: { eq: false } }
      sort: { order: DESC, fields: [date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          body
          slug
          timeToRead
          date
          dateString: date(formatString: "MMMM DD, YYYY")
          datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
          title
          excerpt
          tags
          lastModificationTime
          lastModificationTimeString: lastModificationTime(
            formatString: "MMMM DD, YYYY"
          )
          dateModifiedSeoFormat: lastModificationTime(
            formatString: "YYYY-MM-DD"
          )
          hero {
            full: childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          commentId
        }
      }
    }
  }
`;