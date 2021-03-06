import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import Page from "../components/Page";
import { Grid } from "react-flexbox-grid";

export default ({ data }) => {
  const externalURL = data.datoCmsWork.externalUrl ?? "";
  return (
    <div className="sheet">
      <Page
        id="single-project-page"
        subpageTitle="Projects"
        md
        parent="/projects"
      >
        <Grid>
          <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
          <div id="project-details">
            {externalURL.includes("https://claycoleman.us/") ? (
              <Link to={externalURL.replace("https://claycoleman.us/", "/")}>
                <h2 className="sheet__title">{data.datoCmsWork.title}</h2>
              </Link>
            ) : (
              <a
                href={data.datoCmsWork.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="sheet__title">{data.datoCmsWork.title}</h2>
              </a>
            )}
            <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
            <div className="sheet__gallery">
              <Img
                style={{
                  maxWidth: 1200,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                fluid={data.datoCmsWork.coverImage.fluid}
              />
            </div>
          </div>
        </Grid>
      </Page>
    </div>
  );
};

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      externalUrl
      coverImage {
        url
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
