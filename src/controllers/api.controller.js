import api from "../api/api";

export const getReview = async (id) => {
  // Get the review data
  try {
    const review_res = await api.request({
      url: "/review",
      data: {
        game_id: id,
      },
      method: "POST",
    });
    return review_res.data;
  } catch (error) {
    return null;
  }
};

export const checkServer = async () => {
  // Check if server is up
  try {
    const server_res = await api.get("/");
    console.log(server_res.data);
    return server_res.data;
  } catch (error) {
    return null;
  }
};

export const getGameInfo = async (id) => {
  // Get the game info using a id
  try {
    const game_res = await api.request({
      url: "/game",
      method: "GET",
      data: { game_id: id },
    });
    return game_res.data;
  } catch (error) {
      return null;
  }
};

export const getAllSteamGames = async () => {
  // this function returns a list for all the steam games, can be used to get the appid
  try {
    const req = await api.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    );
    return req.data;
  } catch (error) {
    return null;
  }
};