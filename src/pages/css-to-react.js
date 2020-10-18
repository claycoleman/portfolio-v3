import React, { useMemo, useState } from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Page from "../components/Page";
import { Grid } from "react-flexbox-grid";
import { Helmet } from "react-helmet";
import transformCss from "../utils/transformCss";
import JSON5 from "json5";

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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ color: "rgba(255,255,255,1.0)" }}>CSS</label>
                <textarea
                  style={{ height: 70, minWidth: 400 }}
                  onChange={(e) => {
                    setInputCSS(e.target.value);
                    setCopied(false);
                  }}
                  value={inputCSS}
                />
              </div>
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
                <label style={{ color: "rgba(255,255,255,1.0)" }}>React</label>
                <textarea
                  disabled
                  style={{
                    backgroundColor: error != null ? "lightcoral" : "white",
                    height: 70,
                    minWidth: 400,
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
                />
              </div>
            </div>
          </Grid>
        )}
      </Page>
    </div>
  );
};

export default CssToReactPage;
