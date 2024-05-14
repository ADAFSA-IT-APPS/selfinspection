import Config from "react-native-config";


const { APP_SERVICE_URL } = Config;

const makeRequest = (config) => {
    const url = `${APP_SERVICE_URL}${config.url}`;
    console.log("urlis: " + url)
    let requestConfig = {};
    requestConfig = {
        method: config.method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { params } = config;
    if (params) {
        if (
            config.method === "POST" ||
            config.method === "PUT" ||
            config.method === "PATCH" ||
            config.method === "DELETE"
        ) {
            requestConfig.body = JSON.stringify(params);
        }
    }

    return withTimeout(
        5000,
        fetch(url, requestConfig)
            .then((response) => {
                console.log("response");
                console.log(response)
                return { status: response.status, data: response.json() };
            })
            .catch((err) => {
                console.error(err);
            })
    );
};

function withTimeout(msecs, promise) {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("timeout"));
        }, msecs);
    });
    return Promise.race([timeout, promise]);
}

export const get = (url, params) => {
    return makeRequest({
        url,
        params,
        method: "GET",
    });
};

export const post = (url, params) => {
    return makeRequest({
        url,
        params,
        method: "POST",
    });
};

export const put = (url, params) => {
    return makeRequest({ url, params, method: "PUT" });
};

export const remove = (url, params) => {
    return makeRequest({ url, params, method: "DELETE" });
};

export const patch = (url, params) => {
    return makeRequest({ url, params, method: "PATCH" });
};