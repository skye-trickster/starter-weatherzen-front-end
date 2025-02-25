/**n
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      return Promise.reject({ message: error.message });
    }
  }
}


export async function createObservation(observation, signal) {
  const url = `${API_BASE_URL}/observations`
  const options = {
    method: "POST", // posting to the backend observations
    headers, // this is a pre-flight request, so we need to send in the correct headers to the API
    body: JSON.stringify({ data: observation }), // this is the body of the request to post to
    signal
  };
  return await fetchJson(url, options) // will return a 404 error if backend doesn't handle this
}

// no longer have to get a fake set of observations. 
// now gets from the backend
export async function listObservations(signal) {
  const url = `${API_BASE_URL}/observations`;
  const options = { // these are the options to send to the fetchJson function
    headers,
    signal
  }
  return await fetchJson(url, options)
}