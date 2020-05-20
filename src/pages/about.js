import React from "react";
import {  graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import SocialLinks, {
  getNumberOfSocialLinksFromData,
} from "../components/SocialLinks";
import DesktopOnly from "../components/DesktopOnly";
import { Grid, Row, Col } from "react-flexbox-grid";
import MobileOnly from "../components/MobileOnly";
import Page from "../components/Page";
import { useTimeout } from "../utils/hooks";

const About = ({ data }) => {
  const about = data.about;
  const numSocialLinks = getNumberOfSocialLinksFromData(data);
  useTimeout(() => {
    const links = document.querySelectorAll("#bio a");
    links.forEach((link) => {
      if (link.hostname !== window.location.hostname) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  }, 250);
  const today = new Date();
  const msSinceMyBirthday = today - new Date("June 9, 1995");
  const yearsOld = Math.floor(
    parseFloat(msSinceMyBirthday / 1000 / 60 / 60 / 24 / 365.25),
  ).toFixed(0);
  return (
    <div className="sheet">
      <HelmetDatoCms seo={about.seoMetaTags} />
      <Page id="about-page" md subpageTitle="About">
        <Grid id="about-grid">
          <Row
            style={{
              height: "100%",
              width: "100%",
              margin: 0,
              alignContent: "flex-start",
            }}
          >
            <Col className="about-col" md={6} lg={4}>
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
                    color: "rgba(255,255,255,1.0)",
                    fontFamily: "OkLight",
                    fontSize: "42px",
                    fontWeight: "400",
                    lineHeight: "1.2em",
                    marginBottom: "4px",
                    transform: "translateY(10px) translateZ(0)",
                  }}
                >
                  Me
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
            <Col className="about-col" md={6} lg={8}>
              <div
                id="bio"
                className="sheet__body"
                dangerouslySetInnerHTML={{
                  __html: about.bioNode.childMarkdownRemark.html.replace(
                    "{{age}}",
                    yearsOld,
                  ),
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
