import { CREATE_RIDE_FAILURE, CREATE_RIDE_REQUEST, CREATE_RIDE_SUCCESS, FETCH_MATCHES_FAILURE, FETCH_MATCHES_REQUEST, FETCH_MATCHES_SUCCESS, FETCH_PROFILE_FAILURE, FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_RIDES_FAILURE, FETCH_RIDES_REQUEST, FETCH_RIDES_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    token: null,
    profile: null,
    rides: [],
    matches: [],
    loading: false,
    error: null,
};

export const allReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, loading: true };
        case REGISTER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // Login
        case LOGIN_REQUEST:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT:
            return { ...initialState };
        
        // Fetch Profile
        case FETCH_PROFILE_REQUEST:
            return { ...state, loading: true };
        case FETCH_PROFILE_SUCCESS:
            return { ...state, loading: false, user: action.payload.data, token: action.payload.token };
        case FETCH_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Update Profile
        case UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload, user: action.payload };
        case UPDATE_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Fetch Rides
        case FETCH_RIDES_REQUEST:
            return { ...state, loading: true };
        case FETCH_RIDES_SUCCESS:
            return { ...state, loading: false, rides: action.payload };
        case FETCH_RIDES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Create Ride
        case CREATE_RIDE_REQUEST:
            return { ...state, loading: true };
        case CREATE_RIDE_SUCCESS:
            return { ...state, loading: false, rides: [...state.rides, action.payload] };
        case CREATE_RIDE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Fetch Matches
        case FETCH_MATCHES_REQUEST:
            return { ...state, loading: true };
        case FETCH_MATCHES_SUCCESS:
            return { ...state, loading: false, matches: action.payload };
        case FETCH_MATCHES_FAILURE:
            return { ...state, loading: false, error: action.payload };


        default:
            return state;
    }
};