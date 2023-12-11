import axios from "axios";

//Products and Categories
export const getData = async (url) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/categories`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// const allProducts = "products";
// const limit = `products?limit=${5}`;
// const specificProduct = `products/${5}`;
// const categories = "products/categories";
// const specificCategory = `products/category/jewelery`;

// Adding, Deleting, Updating users

export const fetchUsers = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/users");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchSingleUser = async (num) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/users/${num}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//Users Log In

//REGEX
//Email
const validateEmail = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

//Password
const validatePassword = (p) => {
  return (
    /[A-Z]/.test(p) &&
    /[0-9]/.test(p) &&
    !/[aeiou]/.test(p) &&
    /^[@#][A-Za-z0-9]{7,13}$/.test(p)
  );
};

export const logInUser = async (username, password) => {
  if (username !== "" && password !== "") {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("userToken", token);
      localStorage.setItem("username", username);

      return Promise.resolve(token);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(new Error("Invalid username or password"));
  }
};

export const createUser = async (email, username, password) => {
  if (validateEmail(email) && validatePassword(password)) {
    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: "John",
          lastname: "Doe",
        },
        address: {
          city: "kilcoole",
          street: "7835 new road",
          number: 3,
          zipcode: "12926-3874",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: "1-570-236-7033",
      });
      console.log(response);
      // const userId = response.data.id;
      // const user = fetchSingleUser(userId);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  } else if (!validateEmail(email)) {
    return Promise.reject(new Error("Invalid Email"));
  } else if (!validatePassword(password)) {
    return Promise.reject(new Error("Password has to be "));
  }
};

export const getCurrentUserName = () => {
  const userName = localStorage.getItem("username");
  return userName;
};

export const removeUser = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("cart");
  localStorage.removeItem("userToken");
};

export const getToken = () => {
  return localStorage.getItem("userToken");
};

//Cart
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export const clearCart = () => {
  localStorage.setItem("cart", JSON.stringify([]));
};

export const addProductInsideCart = () => {};
