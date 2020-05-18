import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import BackButton from "../components/BackButton";
import Page from "../components/Page";
import { Grid } from "react-flexbox-grid";

const ProjectsPage = ({ data }) => {
  console.log("at projcts");
  return (
    <div className="sheet">
      <Page id="projects-page" subpageTitle="Projects">
        <div className="scroller">
          <Grid>
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
        </div>
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
