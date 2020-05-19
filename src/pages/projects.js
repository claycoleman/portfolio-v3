import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Page from "../components/Page";
import { Grid } from "react-flexbox-grid";
import { Helmet } from "react-helmet";

const ProjectsPage = ({ data }) => {
  return (
    <div className="sheet">
      <Helmet>
        <title>Projects - Clay Coleman</title>
      </Helmet>
      <Page id="projects-page" subpageTitle="Projects">
        {(isMini) => (
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                color: "rgba(255,255,255,1.0)",
                fontFamily: "OkLight",
                fontSize: "42px",
                fontWeight: "400",
                lineHeight: "1.2em",
                marginBottom: "24px",
                transform: "translateY(10px) translateZ(0)",
                alignSelf: !isMini ? "flex-start" : "unset",
              }}
            >
              My Projects
            </h1>
            <Masonry className="showcase">
              {data.allDatoCmsWork.edges.map(({ node: project }) => (
                <div key={project.id} className="showcase__item">
                  <Link
                    to={"/projects/" + project.slug}
                    style={{ width: "100%" }}
                  >
                    <div className="project-item">
                      <h3>{project.title}</h3>
                      <p>{project.subtitle}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </Masonry>
          </Grid>
        )}
      </Page>
    </div>
  );
};

export default ProjectsPage;

export const query = graphql`
  query ProjectsQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          subtitle
          slug
        }
      }
    }
  }
`;
