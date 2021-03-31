import axios from "axios";
import state from "./state";

export const getImages = ({ commit }) => {
  axios
    .get("https://imago.azurewebsites.net/api/v1/Photo/random")
    .then((response) => {
      commit("SET_IMAGES", response.data);
    });
};

export const getImage = ({ commit }, photoId) => {
  axios
    .get(`https://imago.azurewebsites.net/api/v1/Photo/${photoId}`)
    .then((response) => {
      commit("SET_IMAGE", response.data);
    });
};

export const getStrangeUser = ({ commit }, userId) => {
  axios
    .get(`https://imago.azurewebsites.net/api/v1/User/GetById/${userId}`)
    .then((response) => {
      commit("SET_STRANGER", response.data);
    });
};

export const downloadImage = ({ commit }, photoId) => {
  axios({
    url: `https://imago.azurewebsites.net/api/v1/Photo/DownloadPhoto/${photoId}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");
    console.log(response.data.image)
    console.log(response.data.filename)
    fileLink.href = fileURL;
    fileLink.setAttribute("download", "file.jpg");
    document.body.appendChild(fileLink);
    fileLink.click();
  });
};

// export const downloadImage = ({ commit }, photoId) => {
//   axios({
//     url: `https://imago.azurewebsites.net/api/v1/Photo/DownloadPhoto/${photoId}`,
//     method: "GET"
//   }).then((response) => {
//     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
//     var fileLink = document.createElement("a");
//     console.log(response.data.image)
//     console.log(response.data)
//     fileLink.href = fileURL;
//     fileLink.setAttribute("download", "file.jpg");
//     document.body.appendChild(fileLink);
//     fileLink.click();
//   });
// };

export const addPhotoToCart = ({ commit }, { image }) => {
  commit("ADD_TO_CART", { image });
};

export const removeItem = ({ commit }, { image }) => {
  commit("REMOVE_ITEM", { image });
};

export const login = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit("auth_request");
    axios({
      url: "https://imago.azurewebsites.net/api/v1/Auth",
      data: user,
      method: "POST",
    })
      .then((resp) => {
        const token = resp.data.token;
        const user = resp.data;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", user);
        resolve(resp);
      })
      .catch((err) => {
        commit("auth_error");
        window.localStorage.removeItem("token");
        reject(err);
      });
  });
};

export const getTransactions = ({ commit }) => {
  const user = localStorage.getItem("user");
  const user_parsed = JSON.parse(user);
  console.log("user parse");
  console.log(user_parsed);
  axios
    .get(
      `https://imago.azurewebsites.net/api/v1/User/GetBoughtPhoto/${user_parsed.userId}`
    )
    .then((response) => {
      commit("SET_TRANSACTIONS", response.data);
    });
};

export const getFollowingUsers = ({ commit }) => {
  const user = localStorage.getItem("user");
  const user_parsed = JSON.parse(user);
  console.log("user parse");
  console.log(user_parsed);
  axios
    .get(
      `https://imago.azurewebsites.net/api/v1/Follow/GetFollowingUser/${user_parsed.userId}`
    )
    .then((response) => {
      commit("SET_FOLLOWINGUSERS", response.data);
    });
};

export const register = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit("auth_request");
    axios({
      url: "https://imago.azurewebsites.net/api/v1/Auth/Register",
      data: user,
      method: "POST",
    })
      .then((resp) => {
        const token = resp.data.token;
        const user = resp.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", user);

        resolve(resp);
      })
      .catch((err) => {
        commit("auth_error", err);
        localStorage.removeItem("token");
        reject(err);
      });
  });
};

export const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
};

export const getApprovedImageByUser = ({ commit }) => {
  const user = localStorage.getItem("user");
  const user_parsed = JSON.parse(user);
  console.log("user parse");
  console.log(user_parsed);
  axios
    .get(
      `https://imago.azurewebsites.net/api/v1/User/GetUserApprovedPhoto/${user_parsed.userId}`
    )
    .then((response) => {
      commit("GET_APPROVED_IMAGE", response.data);
    });
};


export const getDeniedImageByUser = ({ commit }) => {
  const user = localStorage.getItem("user");
  const user_parsed = JSON.parse(user);
  console.log("user parse");
  console.log(user_parsed);
  axios
    .get(
      `https://imago.azurewebsites.net/api/v1/User/GetUserDeniedPhoto/${user_parsed.userId}`
    )
    .then((response) => {
      commit("GET_DENIED_IMAGE", response.data);
    });
};
