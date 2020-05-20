import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Page from "../components/Page";
import { Grid } from "react-flexbox-grid";

export default ({ data }) => (
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
          <a
            href={data.datoCmsWork.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="sheet__title">{data.datoCmsWork.title}</h2>
          </a>
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
