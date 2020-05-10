import React from "react";
import { Link, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { SOCIAL_LINKS } from "../utils/pages";
import SocialLinks from "../components/SocialLinks";
import DesktopOnly from "../components/DesktopOnly";
import { Grid, Row, Col } from "react-flexbox-grid";
import MobileOnly from "../components/MobileOnly";
import BackButton from "../components/BackButton";

const About = ({ data: { about } }) => (
  <div className="sheet">
    <HelmetDatoCms seo={about.seoMetaTags} />
    <div id="bio-page" className="">
      <h2 className="subpageTitle">About</h2>
      <BackButton />
      <Grid>
        <Row>
          <Col className="home-col" sm={4}>
            <div id="about-logo">
              <div style={{ paddingTop: 24, minHeight: 0 }} />
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
                  maxWidth: "calc(100% - 24px)",
                  width: "340px",
                  height: "auto",
                  margin: "12px 0px 16px",
                }}
              />
              <DesktopOnly style={{ paddingTop: 24 }}>
                <SocialLinks links={SOCIAL_LINKS} />
              </DesktopOnly>
            </div>
          </Col>
          <Col className="home-col" sm={8}>
            <div
              id="bio"
              className="sheet__body"
              dangerouslySetInnerHTML={{
                __html: about.bioNode.childMarkdownRemark.html,
              }}
            />
          </Col>
          <MobileOnly>
            <SocialLinks links={SOCIAL_LINKS} />
          </MobileOnly>
        </Row>
      </Grid>
    </div>
  </div>
);

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
  }
`;
