import React, { useMemo, useState } from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Page from "../components/Page";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Helmet } from "react-helmet";
import transformCss from "../utils/transformCss";
import JSON5 from "json5";
import down from "../assets/images/down.png";
import forward from "../assets/images/forward.png";

const CssToReactPage = () => {
  const [inputCSS, setInputCSS] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedTimeout, setCopiedTimeout] = useState(null);
  const [outputText, error] = useMemo(() => {
    if (inputCSS === "") {
      return ["", null];
    }
    try {
      const transformed = transformCss(inputCSS);
      const result = JSON5.stringify(transformed, null, 2);
      const cleanedResult = result.substr(2, result.length - 3);

      return [cleanedResult, null];
    } catch (ex) {
      return ["Couldn't parse CSS. " + ex, ex];
    }
  }, [inputCSS]);
  return (
    <div className="sheet">
      <Helmet>
        <title>Projects - Clay Coleman</title>
      </Helmet>
      <Page id="css-to-react-page" subpageTitle="CSS to React">
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
              CSS to React
            </h1>
            <p style={{ color: "white", marginBottom: 16 }}>
              Enter CSS on the left to generated formatted JS styles on the
              right – perfect for an inline React component or other CSS-in-JS
              packages.
            </p>
            <Row style={{ width: "100%" }}>
              <Col sm={5}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ color: "rgba(255,255,255,1.0)" }}>CSS</label>
                  <textarea
                    style={{ height: 300, width: "100%" }}
                    onChange={(e) => {
                      setInputCSS(e.target.value);
                      setCopied(false);
                    }}
                    value={inputCSS}
                    placeholder="Enter CSS here"
                  />
                </div>
              </Col>
              <Col sm={2} className="desktopOnly">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: 'center' }}>
                    <p
                      style={{
                        color: "white",
                        marginRight: 8,
                        display: "flex",
                      }}
                    >
                      CSS
                    </p>
                    <img
                      alt="Forward arrow"
                      style={{
                        width: 16,
                        height: 16,
                        filter: "invert(100%)",
                      }}
                      src={forward}
                    />
                    <p
                      style={{
                        color: "white",
                        marginLeft: 8,
                        display: "flex",
                      }}
                    >
                      React
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={2} className="mobileOnly" style={{ marginTop: 24 }}>
                <img
                  alt="Down arrow"
                  style={{
                    width: "20px",
                    height: "auto",
                    filter: "invert(100%)",
                  }}
                  src={down}
                />
              </Col>
              <Col sm={5}>
                <div
                  className={`clipboardCopier ${copied ? "copied" : ""}`}
                  onClick={(e) => {
                    if (copiedTimeout != null) {
                      clearTimeout(copiedTimeout);
                    }
                    setCopied(true);
                    const timeout = setTimeout(() => {
                      setCopied(false);
                      setCopiedTimeout(null);
                    }, 1000);
                    setCopiedTimeout(timeout);
                    navigator.clipboard.writeText(outputText);
                  }}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label style={{ color: "rgba(255,255,255,1.0)" }}>
                    React
                  </label>
                  <textarea
                    disabled
                    style={{
                      backgroundColor: error != null ? "lightcoral" : "white",
                      height: 300,
                      width: "100%",
                      cursor: "pointer",
                      ":after": {
                        content: "Click to copy",
                        display: "none",
                      },
                      ":hover": {
                        ":after": {
                          display: "block",
                        },
                      },
                    }}
                    value={outputText}
                    placeholder="JS styles output here"
                  />
                </div>
              </Col>
            </Row>
          </Grid>
        )}
      </Page>
    </div>
  );
};

export default CssToReactPage;
