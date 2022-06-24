import $ from 'jquery';

const baseUri = "https://api.huggg.me/";
const clientId = "kf3fBAQ4PmPMfFbe";
const clientSecret = "sDt8gPFJ2PAv5WBBmfcCnzQ4EZtq3KUT";

const loginBody = {
    "grant_type": "client_credentials",
    "client_id": clientId,
    "client_secret": clientSecret
};

export async function fetchSession() {
  return new Promise((resolve, reject) => {
    sessionStorage.removeItem("token");
    const url = baseUri + "oauth/token";
    httpWrapper("POST", url, loginBody)
    .then((response) => {
        sessionStorage.setItem("token", "Bearer " + response.access_token);
        resolve();
    })
    .catch((err) => {
        reject(err);
    });
  })
}

export async function getClientData(clientList) {
    return new Promise((resolve, reject) => {
        if (clientList.length > 0 && Array.isArray(clientList)) {
            let query = "";
            clientList.map((client, index) => {
                if (index !== 0) {
                    query += "&"
                }
                query += `id[]=${client}`;
            })
            const url = baseUri + "api/v2/brands?" + query;
            httpWrapper("GET", url)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        }
        else {
            reject("Invalid data input");
        }
    })
}

export async function getMapData(tiles) {
    return new Promise((resolve, reject) => {
        if (typeof tiles === "string") {
            const url = baseUri + "api/v2/tiles/" + tiles;
            httpWrapper("GET", url)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        }
        else {
            reject("Invalid data input");
        }
    })
}

async function checkHeaders(headers, url) {
    return new Promise((resolve, reject) => {
        headers = headers === undefined ? {} : headers;
        if (!url.includes("oauth/token")) {
            if (sessionStorage.getItem("token") === null) {
                fetchSession()
                .then(() => {
                    headers.Authorization = sessionStorage.getItem("token");
                    resolve(headers);
                })
                .catch((err) => {
                    reject(err);
                })
            }
            else {
                headers.Authorization = sessionStorage.getItem("token");
                resolve(headers);
            }
        }
        else {
            resolve(headers);
        }
    })
}

async function httpWrapper(method, url, data, initialHeaders) {
    return new Promise((resolve, reject) => {
        checkHeaders(initialHeaders, url)
        .then((headers) => {
            $.ajax({
                type: method,
                url: url,
                headers: headers,
                data: JSON.stringify(data),
                contentType: "application/json",
                Accept: "application/json",
                success: function (response) {
                    resolve(response);
                },
                error: function (response) {
                    console.error("Error: ", response);
                    reject(response);
                }
            })
        })
        .catch((err) => {
            reject(err);
        })
    })
  }