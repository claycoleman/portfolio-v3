import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import { MAIN_MENU_LINKS } from "../utils/pages";
import SocialLinks from "../components/SocialLinks";
import MobileOnly from "../components/MobileOnly";
import DesktopOnly from "../components/DesktopOnly";
import MainMenu from "../components/MainMenu";
import { Grid, Row, Col } from "react-flexbox-grid";
import Page from "../components/Page";

const IndexPage = ({ data }) => {
  return (
    <div className="sheet">
      <Page id="home-page">
        <Grid>
          <Row style={{ width: "100%", height: "100%" }}>
            <Col className="home-col" sm={6}>
              <div id="logo">
                <div style={{ paddingTop: 24, minHeight: 0 }} />
                <h1>Clay Coleman</h1>
                <h2>Software Engineer</h2>

                <DesktopOnly style={{ paddingTop: 24 }}>
                  <SocialLinks />
                </DesktopOnly>
              </div>
            </Col>
            <Col className="home-col" sm={6}>
              <MainMenu items={MAIN_MENU_LINKS} />
            </Col>
            <MobileOnly>
              <SocialLinks />
            </MobileOnly>
          </Row>
        </Grid>
      </Page>
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
