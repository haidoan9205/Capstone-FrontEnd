import axios from "axios";
import state from "./state";
import Vue from "vue";


export const getImages = ({ commit }) => {
    axios
        .get("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/random")
        .then((response) => {
            commit("SET_IMAGES", response.data);
        });
};

export const getImagesAll = ({ commit }) => {
    axios
        .get("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/GetAllNormalPhoto")
        .then((response) => {
            commit("SET_IMAGES_ALL", response.data);
        });
};

export const getImagesAllExclusive = ({ commit }) => {
    axios
        .get("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/GetAllExclusivePhoto")
        .then((response) => {
            commit("SET_IMAGES_ALL_EXCLUSIVE", response.data);
        });
};

export const getUserNonExlusiveImages = ({commit}) =>{
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserNormalPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_USER_NON_EXCLUSIVE", response.data);
        });
}

export const getUserExlusiveImages = ({commit}) =>{
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserExclusivePhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_USER_EXCLUSIVE", response.data);
        });
}

export const getNotification =({commit}) =>{
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetNotification/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_NOTIFICATIONS", response.data);
        });
}

export const getUserExlusiveProperty = ({commit}) =>{
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserExclusivePropertyPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_EXCLUSIVE_PROPERTY", response.data);
        });
}

export const getImage = ({ commit },photoId) => {
  state.image = '';
  axios
    .get(`https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/${photoId}`)
    .then((response) => {
      commit("SET_IMAGE", response.data);
    });
};

export const getStrangeUser = ({ commit }, userId) => {
    state.stranger = null;
    axios
        .get(`https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetById/${userId}`)
        .then((response) => {
            commit("SET_STRANGER", response.data);
        });
};

export const downloadImage = ({ commit }, photoId) => {
    axios({
        url: `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/DownloadPhoto/${photoId}`,
        method: "GET",
        responseType: "blob",
    }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        var filename = response.headers["content-disposition"];
        filename = filename.split(";");
        filename = filename[1].substring(filename[1].lastIndexOf("="));
        filename = filename.substring(1);
        fileLink.href = fileURL;
        fileLink.setAttribute("download", filename);
        document.body.appendChild(fileLink);
        fileLink.click();
    });
};

// export const downloadImage = ({ commit }, photoId) => {
//   axios({
//     url: `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/DownloadPhoto/${photoId}`,
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
                url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Auth",
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
                Vue.$toast.error('Username or password is not correct.',{
                    position: "top",
                })
                window.localStorage.removeItem("token");
                reject(err);
            });
    });
};

export const getImagesOfFollowing = ({commit}) =>{
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/GetPhotoOfAllUserWeAreFollowing/${user_parsed.userId}?userId=${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_FOLLOWING", response.data);
        });
}

export const getTransactions = ({ commit }) => {
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetBoughtPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_TRANSACTIONS", response.data);
        });
};

export const getUnknownPeople = ({commit}) =>{
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/Get5UserOfUserThatWeAreFollowThatTheyAreFollowing/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_UNKNOWNPEOPLE", response.data);
        });
}

export const getFollowingUsers = ({ commit }) => {

    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/GetFollowingUser/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_FOLLOWINGUSERS", response.data);
        });
};

export const getFollowingStranger = ({ commit }, strangerId) => {
    state.followingStranger = [];
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/GetFollowingUser/${strangerId}`
        )
        .then((response) => {
            commit("SET_FOLLOWINGSTRANGERS", response.data);
        });
};

export const register = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
                url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Auth/Register",
                data: user,
                method: "POST",
            })
            .then((resp) => {
                const token = resp.data.token;
                const user = resp.data;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success", user);
                Vue.$toast.success('Welcome to imago, your account is created.')
                resolve(resp);
            })
            .catch((err) => {
                commit("auth_error", err);
                Vue.$toast.error('Something went wrong, please check your register information.')
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
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserApprovedPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("GET_APPROVED_IMAGE", response.data);
        });
};

export const getPendingImageByUser = ({ commit }) => {
  const user = localStorage.getItem("user");
  const user_parsed = JSON.parse(user);
  console.log("user parse");
  console.log(user_parsed);
  axios
    .get(
      `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserPendingPhoto/${user_parsed.userId}`
    )
    .then((response) => {
      commit("GET_PENDING_IMAGE", response.data);
    });
};

export const getApprovedImageByStranger = ({ commit }) => {
    const strangerId = window.localStorage.getItem('strangerId');
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserApprovedPhoto/${strangerId}`
        )
        .then((response) => {
            commit("GET_APPROVED_IMAGE_STRANGER", response.data);
        });
};

export const getTransactionDetail =({commit}, transactionId) =>{
  axios
  .get(
    `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Transaction/GetTransaction/${transactionId}`
  )
  .then((response) => {
    commit("GET_HISTORY_DETAIL", response.data);
  });
}

export const getHistory = ({ commit }) => {
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Transaction/GetAllTransactionByUserID/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_HISTORY", response.data);
        });
}


export const getDeniedImageByUser = ({ commit }) => {
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserDeniedPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("GET_DENIED_IMAGE", response.data);
        });
};