import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import { SOCIAL_LINKS, MAIN_MENU_LINKS } from "../utils/pages";
import SocialLinks from "../components/SocialLinks";
import MobileOnly from "../components/MobileOnly";
import DesktopOnly from "../components/DesktopOnly";
import MainMenu from "../components/MainMenu";
import { Grid, Row, Col } from "react-flexbox-grid";

const IndexPage = ({ data }) => {
  return (
    <div className="sheet">
      <Grid>
        <Row>
          <Col className="home-col" sm={6}>
            <div id="logo">
              <div style={{ paddingTop: 24, minHeight: 0 }} />
              <h1>Clay Coleman</h1>
              <h2>Software Engineer</h2>

              <DesktopOnly style={{ paddingTop: 24 }}>
                <SocialLinks links={SOCIAL_LINKS} />
              </DesktopOnly>
            </div>
          </Col>
          <Col className="home-col" sm={6}>
            <MainMenu items={MAIN_MENU_LINKS} />
          </Col>
          <MobileOnly>
            <SocialLinks links={SOCIAL_LINKS} />
          </MobileOnly>
        </Row>
      </Grid>
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    datoCmsHome {
      topName
      subtitle
    }
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
