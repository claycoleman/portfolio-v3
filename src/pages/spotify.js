import React, { useRef, useState, useMemo, useCallback } from "react";
import { graphql } from "gatsby";
import Page from "../components/Page";
import MobileOnly from "../components/MobileOnly";
import { Grid } from "react-flexbox-grid";
import loadingSpinner from "../assets/images/loading.svg";
import {
  SPOTIFY_DATA_SESSION_STORAGE_KEY,
  SPOTIFY_AUTH_TOKEN_LOCAL_STORAGE_KEY,
  SPOTIFY_API_PLAYLIST_URL,
  SERVER_ACCESS_TOKEN_URL,
} from "../utils/constants";
import { useEffectOnce } from "../utils/hooks";
import Axios from "axios";

import { isBrowser } from "react-device-detect";
import MusicBars from "../components/MusicBars";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";

function getLoadedPlaylistsCount(playlists) {
  return Object.keys(playlists).filter(
    (playlistID) => playlists[playlistID] != null,
  ).length;
}

const SpotifyPage = ({ data }) => {
  const playlistIDs = (data.allDatoCmsSpotifyPlaylist.edges ?? []).map(
    (edge) => edge.node.playlistId,
  );
  const [playlists, setPlaylists] = useState({});
  const loadedPlaylistsCount = useMemo(
    () => getLoadedPlaylistsCount(playlists),
    [playlists],
  );
  const [nowPlaying, setNowPlaying] = useState(null);
  const [playingEnabled, setPlayingEnabled] = useState(true);
  const audio = useRef(null);

  const getAndStoreAuth = (error) => {
    Axios.post(SERVER_ACCESS_TOKEN_URL).then((response) => {
      localStorage.setItem(
        SPOTIFY_AUTH_TOKEN_LOCAL_STORAGE_KEY,
        response.data.access_token,
      );
      getPlaylists();
    });
  };

  const getRemainingPlaylists = () => {
    for (let index = 1; index < playlistIDs.length; index++) {
      getPlaylist(playlistIDs[index]);
    }
  };

  const getPlaylists = () => {
    getInitialPlaylist();
  };

  const getPlaylist = (playlistID, initial = false) => {
    Axios.get(SPOTIFY_API_PLAYLIST_URL + playlistID, {
      data: {
        fields:
          "followers,tracks.items(added_by.id,track(name,href,preview_url,album(name,href,images.items())))",
      },
      headers: {
        Authorization:
          "Bearer " +
          localStorage.getItem(SPOTIFY_AUTH_TOKEN_LOCAL_STORAGE_KEY),
      },
    })
      .then((response) => {
        console.log(response.data.name);
        // update state with the playlists
        setPlaylists((previousPlaylists) => {
          const newPlaylists = {
            ...previousPlaylists,
            [response.data.id]: response.data,
          };
          if (getLoadedPlaylistsCount(newPlaylists) === playlistIDs.length) {
            sessionStorage.setItem(
              SPOTIFY_DATA_SESSION_STORAGE_KEY,
              JSON.stringify({
                ...newPlaylists,
                [response.data.id]: response.data,
              }),
            );
          }
          return newPlaylists;
        });
        if (initial) {
          getRemainingPlaylists();
        }
      })
      .catch(getAndStoreAuth);
  };

  const getInitialPlaylist = () => {
    getPlaylist(playlistIDs[0], true);
  };

  const playFirstPreview = useCallback(
    ({ playlistID, cancel = false }) => {
      if (cancel) {
        return;
      }
      if (isBrowser) {
        try {
          setNowPlaying(playlists[playlistID].tracks.items[0].track);
          if (playingEnabled) {
            audio.current && audio.current.pause();
            audio.current = new Audio(
              playlists[playlistID].tracks.items[0].track.preview_url,
            );
            audio.current.play();
          }
        } catch (error) {
          // fail gracefully
          console.log(error);
        }
      }
    },
    [playlists, setNowPlaying, playingEnabled],
  );
  const playFirstPreviewDebounced = useMemo(
    () => debounce(playFirstPreview, 200),
    [playFirstPreview],
  );

  const stopPlaying = () => {
    if (isBrowser) {
      try {
        setNowPlaying(null);
        playFirstPreviewDebounced({ cancel: true });
        audio.current && audio.current.pause();
      } catch (error) {
        // fail gracefully
      }
    }
  };

  useEffectOnce(() => {
    // to preserve order
    let playlists = {};
    playlistIDs.forEach((playlistID) => {
      playlists[playlistID] = null;
    });
    let cachedQueryResults = sessionStorage.getItem(
      SPOTIFY_DATA_SESSION_STORAGE_KEY,
    );
    if (cachedQueryResults && false) {
      setPlaylists(JSON.parse(cachedQueryResults));
    } else {
      sessionStorage.setItem(SPOTIFY_DATA_SESSION_STORAGE_KEY, "");
      setPlaylists(playlists);

      let authToken = localStorage.getItem(
        SPOTIFY_AUTH_TOKEN_LOCAL_STORAGE_KEY,
      );
      if (!authToken) {
        // get auth and playlists
        getAndStoreAuth();
      } else {
        // try getting playlists, if it fails, then reauth and get playlists
        getPlaylists();
      }
    }
    return () => {
      audio.current && audio.current.pause();
    };
  });

  let content;
  if (loadedPlaylistsCount < playlistIDs.length) {
    content = (
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
          background: "transparent",
        }}
      >
        <img
          alt="Loading spinner"
          style={{ width: "50px", height: "50px" }}
          src={loadingSpinner}
        />
      </div>
    );
  } else {
    content = (
      <div className="top-list">
        <div className="inner-list">
          <div className="list">
            <div className="bars-wrapper">
              <div className="bars-inner">
                <MusicBars animated={nowPlaying != null} />
              </div>
              <div className="bars-details">
                {nowPlaying ? (
                  <>
                    <h3>{nowPlaying.name}</h3>
                    <h4>{nowPlaying.artists[0].name}</h4>
                    <img
                      alt={"Album art for " + nowPlaying.name}
                      src={nowPlaying.album.images[0].url}
                    />
                  </>
                ) : (
                  <>
                    <h3>Hover to preview!</h3>
                    <h4>(Sound on)</h4>
                  </>
                )}
              </div>
            </div>
            <MobileOnly>
              <div className="mobile-title">
                <h1>My Playlists</h1>
                {isBrowser && <h3>(Hover to preview)</h3>}
              </div>
            </MobileOnly>
            {Object.keys(playlists).map((playlistID) => {
              if (!playlists[playlistID]) {
                return null;
              }
              return (
                <div
                  className="playlist"
                  key={playlistID}
                  onMouseEnter={() => {
                    // start loading
                    new Audio(
                      playlists[playlistID].tracks.items[0].track.preview_url,
                    );
                    audio.current && audio.current.pause();
                    playFirstPreviewDebounced({ playlistID });
                  }}
                  onMouseLeave={stopPlaying}
                >
                  <a
                    href={playlists[playlistID].external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <h3 className="title">{playlists[playlistID].name}</h3>
                  <p className="tracks">
                    {playlists[playlistID].tracks.total} tracks
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="sheet">
      <Helmet>
        <title>Spotify - Clay Coleman</title>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      <Page id="spotify-page" subpageTitle="Spotify">
        <Grid>{content}</Grid>
      </Page>
    </div>
  );
};

export default SpotifyPage;

export const query = graphql`
  query SpotifyQuery {
    allDatoCmsSpotifyPlaylist(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          name
          playlistId
        }
      }
    }
  }
`;
