const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return { ...state, user: action.payload };
  
      case "LOGOUT":
        localStorage.removeItem("user");
        return { ...state, user: null };

        case "UPDATE_USER":
          const updatedUser = { ...state.user, ...action.payload };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return { ...state, user: updatedUser };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  