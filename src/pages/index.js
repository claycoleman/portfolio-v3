import React from "react";
import { graphql } from "gatsby";
import { MAIN_MENU_LINKS } from "../utils/pages";
import SocialLinks from "../components/SocialLinks";
import MobileOnly from "../components/MobileOnly";
import DesktopOnly from "../components/DesktopOnly";
import MainMenu from "../components/MainMenu";
import { Grid, Row, Col } from "react-flexbox-grid";
import Page from "../components/Page";
import { Helmet } from "react-helmet";

const IndexPage = ({ data }) => {
  return (
    <div className="sheet">
      <Helmet>
        <title>Clay Coleman - Software Engineer</title>
      </Helmet>
      <Page id="home-page" isSubpage={false}>
        <Grid>
          <Row style={{ width: "100%", height: "100%" }}>
            <Col className="home-col" sm={6}>
              <div id="logo">
                <div style={{ paddingTop: 24, minHeight: 0 }} />
                <h1>{data.datoCmsHome.topName}</h1>
                <h2>{data.datoCmsHome.subtitle}</h2>

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
  }
`;
