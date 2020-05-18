import React from "react";
import SocialLink from "./SocialLink";
import { StaticQuery, graphql } from "gatsby";

export default (props) => {
  return (
    <StaticQuery
      query={graphql`
        query SocialLinksQuery {
          ...SocialLinksFragment
        }
      `}
      render={(data) => {
        if (data == null || data.loading) {
          return null;
        }
        const links = getSocialLinksFromData(data);
        return (
          <div id="social">
            {links.map((socialLink) => (
              <SocialLink
                href={socialLink.url}
                title={socialLink.profileType}
                key={socialLink.profileType}
              />
            ))}
          </div>
        );
      }}
    />
  );
};

export const query = graphql`
  fragment SocialLinksFragment on Query {
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
  }
`;

const getSocialLinksFromData = (data) => {
  return (data?.allDatoCmsSocialProfile?.edges || [])
    .map((socialLink) => socialLink?.node)
    .filter(Boolean);
};

export const getNumberOfSocialLinksFromData = (data) => {
  return getSocialLinksFromData(data).length;
};
