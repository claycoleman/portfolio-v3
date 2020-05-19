/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import loadingSpinner from "../assets/images/loading.svg";
import { useLocation } from "@reach/router";

import "../styles/index.sass";
import { getPageBackground } from "../utils/pages";
import { useTimeout } from "../utils/hooks";
import { Grid, Row } from "react-flexbox-grid";

function TransitionContainer({ currBackground, children, loading }) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={(data) => {
        if (data == null || data.loading || loading) {
          return (
            <div
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: currBackground,
              }}
            >
              <img
                alt="Loading spinner"
                style={{ width: "50px", height: "50px" }}
                src={loadingSpinner}
              />
            </div>
          );
        }
        return (
          <div
            style={{
              height: "100%",
              transition: "background  8s cubic-bezier(0.15, 0.9, 0.34, 0.95)",
            }}
          >
            <HelmetDatoCms
              favicon={data.datoCmsSite.faviconMetaTags}
              seo={data.datoCmsHome.seoMetaTags}
            />
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames={"fade"}
              >
                <div>{children}</div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        );
      }}
    />
  );
}

const TemplateWrapper = ({ children }) => {
  const location = useLocation();
  const backgroundForRoute = getPageBackground(location.pathname);
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    if (loading) {
      setLoading(false);
    }
  }, 650);

  return (
    <div
      className="transitionBackground"
      style={{ backgroundColor: backgroundForRoute, height: "100%" }}
    >
      <TransitionContainer
        loading={loading}
        currBackground={backgroundForRoute}
      >
        {children}
      </TransitionContainer>
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object,
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
