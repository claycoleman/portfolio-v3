import React from "react";
import { Link, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import SocialLinks, {
  getNumberOfSocialLinksFromData,
} from "../components/SocialLinks";
import DesktopOnly from "../components/DesktopOnly";
import { Grid, Row, Col } from "react-flexbox-grid";
import MobileOnly from "../components/MobileOnly";
import BackButton from "../components/BackButton";
import SubpageTitleBar from "../components/SubpageTitleBar";
import Page from "../components/Page";

const About = ({ data }) => {
  const about = data.about;
  const numSocialLinks = getNumberOfSocialLinksFromData(data);
  return (
    <div className="sheet">
      <HelmetDatoCms seo={about.seoMetaTags} />
      <Page id="bio-page" md subpageTitle="About">
        <Grid id="about-grid">
          <Row
            className="scroller"
            style={{ height: "100%", width: "100%", margin: 0 }}
          >
            <Col className="home-col" md={6} lg={4}>
              <div id="about-logo">
                <DesktopOnly>
                  <div
                    style={{
                      paddingTop: 26 * numSocialLinks - 60,
                      minHeight: 0,
                    }}
                  />
                </DesktopOnly>
                <h1
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "OkLight",
                    fontSize: "42px",
                    fontWeight: "400",
                    lineHeight: "1.2em",
                    marginBottom: "4px",
                    transform: "translateY(10px) translateZ(0)",
                  }}
                >
                  Clay
                </h1>
                <Img
                  fluid={about.photo.fluid}
                  style={{
                    margin: "12px 0px 16px",
                  }}
                  className="me"
                />
                <DesktopOnly style={{ paddingTop: 24 }}>
                  <SocialLinks />
                </DesktopOnly>
              </div>
            </Col>
            <Col className="home-col" md={6} lg={8}>
              <div
                id="bio"
                className="sheet__body"
                dangerouslySetInnerHTML={{
                  __html: about.bioNode.childMarkdownRemark.html,
                }}
              />
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

export default About;

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
    ...SocialLinksFragment
  }
`;
