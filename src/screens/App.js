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
  daysAgo,
} from "../functions/general.functions";

const thumbsUp =
  "https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png";
const thumbsDown =
  "https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png";

function App() {
  const [game_id, setGame_id] = useState(1229490);
  const [gameData, setGameData] = useState(null);
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
          <Menu inverted fluid widths="3">
            <Menu.Item>
              {addCommasToNumber(gameData.number_of_reviews)} reviews searched
            </Menu.Item>
            <Menu.Item>
              {`${addCommasToNumber(
                Math.round(gameData.time_taken / 60)
              )} minutes spend searching`}
            </Menu.Item>
            <Menu.Item>
              {`last updated ${daysAgo(new Date(gameData.created))}`}
            </Menu.Item>
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
