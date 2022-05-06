import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { createObservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";
/**
 * The UI for the observerion creating page
 */
function ObservationCreate() {

    const history = useHistory()

    const [error, setError] = useState(null)

    const [observation, setObservation] = useState(
        {
            lattitude: "",
            longitude: "",
            sky_conditions: ""
        }
    ) // the form being made

    function cancelHandler() {
        history.push("/")
    }

    // this makes a call to the API so shouldn't need to worry too much about the submit handler
    function submitHandler(event) {
        event.preventDefault(); // don't forget this if you don't want to reload the whole page
        createObservation(observation).then(() => {
            history.push("/")
        })
            .catch(setError) // sets the error handler when getting 404 or other type of error; easy to catch outside-in
    }

    function changeHandler({ target: { name, value } }) {

        setObservation((previousObservation) => ({
            ...previousObservation,
            [name]: value,
        }))

    }

    return (
        <main>
            <h1 className="mb-3">Create Observation</h1>
            <ErrorAlert error={error} />
            <form onSubmit={submitHandler} className="mb-4">
                <div className="row mb-3">
                    <div className="col-6 form-group">
                        <label className="form-label" htmlFor="latitude">
                            Latitude
                        </label>
                        <input
                            className="form-control"
                            id="latitude"
                            name="latitude"
                            type="number"
                            max="90"
                            min="-90"
                            value={observation.latitude}
                            onChange={changeHandler}
                            required={true}
                        />
                        <small className="form-text text-muted">Enter a value between -90 and 90.</small>
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="longitude">
                            Longitude
                        </label>
                        <input
                            className="form-control"
                            id="longitude"
                            name="longitude"
                            type="number"
                            max="180"
                            min="-180"
                            value={observation.longitude}
                            onChange={changeHandler}
                            required={true}
                        />
                        <small className="form-text text-muted">Enter a value between -180 and 180.</small>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="cloudCover">
                        Sky conditions
                    </label>
                    <select
                        className="form-control"
                        id="sky_condition"
                        name="sky_condition"
                        value={observation.sky_condition}
                        onChange={changeHandler}
                        required={true}
                    >
                        <option value="">Select a sky condition option</option>
                        <option value="100">Cloudless</option>
                        <option value="101">Some clouds</option>
                        <option value="102">Cloud covered</option>
                        <option value="103">Foggy</option>
                        <option value="104">Raining</option>
                        <option value="106">Snowing</option>
                        <option value="108">Hailing</option>
                        <option value="109">Thunderstorms</option>
                    </select>
                </div>
                <div>
                    <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </main>
    )
}

export default ObservationCreate;