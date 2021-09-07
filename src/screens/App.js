import "../css/App.css";

import {
  Button,
  Container,
  Divider,
  Header,
  Image,
  Input,
  Segment,
  List,
  Menu,
} from "semantic-ui-react";

import { checkServer, getReview } from "../controllers/api.controller";

import { useEffect, useState } from "react";

import {
  timeConverter,
  addCommasToNumber,
} from "../functions/general.functions";

const thumbsUp =
  "https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png";
const thumbsDown =
  "https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png";

function App() {
  const [game_id, setGame_id] = useState(730);
  const [gameData, setGameData] = useState({
    time_taken: 533.793,
    created: "2021-09-07T13:29:57.503Z",
    updated: "2021-09-07T13:29:57.503Z",
    number_of_reviews: 53000,
    _id: "613769550cf6eba1a46877d7",
    gameId: 730,
    review: {
      recommendationid: "95720752",
      author: {
        steamid: "76561197994737486",
        num_games_owned: 8,
        num_reviews: 1,
        playtime_forever: 1168316,
        playtime_last_two_weeks: 12268,
        playtime_at_review: 1131318,
        last_played: 1630980540,
      },
      language: "english",
      review: "give me skin",
      timestamp_created: 1626265192,
      timestamp_updated: 1626265192,
      voted_up: true,
      votes_up: 1,
      votes_funny: 1,
      weighted_vote_score: "0.523809552192687988",
      comment_count: 0,
      steam_purchase: true,
      received_for_free: false,
      written_during_early_access: false,
    },
    __v: 0,
  });
  const [loading, setLoading] = useState(false);

  const searchForGame = async () => {
    setLoading(true);
    try {
      const data = await getReview(game_id);
      setGameData(data);
      console.log(data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    console.log(gameData);
  }, []);

  return (
    <Container text>
      <Divider hidden />
      <Header>Search for review</Header>
      <Input
        value={game_id}
        type="number"
        onChange={(e) => {
          setGame_id(e.target.value);
        }}
      />
      <Button loading={loading} onClick={searchForGame}>
        Search
      </Button>
      <Divider hidden />
      {gameData ? (
        <Container text>
          <Menu inverted>
            <Menu.Menu position="left">
              <Menu.Item>
                {addCommasToNumber(gameData.number_of_reviews)} reviews
                searched
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item>
                {`${addCommasToNumber(
                  Math.round(gameData.time_taken / 60)
                )} minutes spend searching`}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Segment inverted>
            <div>
              <List horizontal inverted>
                <List.Item>
                  <Image
                    src={gameData.review.voted_up ? thumbsUp : thumbsDown}
                  />
                  <List.Content>
                    <List.Header as="h3">
                      {gameData.review.voted_up ? "" : "Not"} Recommended
                    </List.Header>
                    <small className="greyed">
                      {addCommasToNumber(
                        Math.round(gameData.review.author.playtime_forever / 60)
                      )}{" "}
                      hrs on record.
                    </small>
                  </List.Content>
                </List.Item>
              </List>
            </div>
            <small className="greyed">
              POSTED: {timeConverter(gameData.review.timestamp_created)}
            </small>
            <p>{gameData.review.review}</p>
            <Divider fitted />
            <List>
              {[
                { arrayKey: "votes_up", text: "helpful" },
                { arrayKey: "votes_funny", text: "funny" },
              ].map(({ arrayKey, text }, index) => {
                return (
                  <List.Item>
                    {gameData.review[arrayKey] > 0
                      ? `${gameData.review[arrayKey]} people found this review ${text}`
                      : ""}
                  </List.Item>
                );
              })}
            </List>
          </Segment>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default App;
