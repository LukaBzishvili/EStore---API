import { useEffect, useState } from "react";
import { useContext } from "react";
import { logInUser, createUser } from "../services/axios";
import { UsersDataContext } from "../App";
import { getCurrentUserName } from "../services/axios";
import OrangeButton from "../components/buttons/OrangeButton";
import Alert from "react-bootstrap/Alert";

const Authorisation = () => {
  //Context
  const usersArr = useContext(UsersDataContext);
  //useStates
  const [isRegistered, setIsRegistered] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const [forms, setForms] = useState({
    isCorrect: false,
    comment: "",
  });
  const [defaultValues, setdefaultValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  //ReloadingPage Function
  function reloadPage() {
    window.location.reload(false);
  }

  //Changing Forms
  function toggleRegistration() {
    setIsRegistered(!isRegistered);

    setdefaultValues({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  //Getting Input values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setdefaultValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //Log Out Function
  function logOut() {
    reloadPage();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setTimeout(() => {
      setIsLoggedin(false);
    }, 1000);
  }

  //Login Function
  function handleLogin() {
    event.preventDefault();
    logInUser(defaultValues.username, defaultValues.password)
      .then((token) => {
        console.log(token);
        setForms((prevAuth) => ({
          ...prevAuth,
          isCorrect: true,
          comment: "Success",
        }));
        reloadPage();
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setForms((prevAuth) => ({
          ...prevAuth,
          isCorrect: false,
          comment: "Error",
        }));
      });
  }

  //Registration Function
  function handleRegister() {
    event.preventDefault();
    createUser(
      defaultValues.username,
      defaultValues.email,
      defaultValues.password
    )
      .then((token) => {
        console.log(token);
        setForms((prevAuth) => ({
          ...prevAuth,
          isCorrect: true,
          comment: "Success",
        }));
        reloadPage();
      })
      .catch((error) => {
        console.error("Register Error:", error);
        setForms((prevAuth) => ({
          ...prevAuth,
          isCorrect: false,
          comment: "Error",
        }));
      });
  }

  //useEffect for username and password (for testing)
  useEffect(() => {
    if (usersArr.length > 0) {
      console.log(usersArr[0].username);
      console.log(usersArr[0].password);
    }
  }, [usersArr]);

  //useEffect for getting info if the user is logged in or not
  useEffect(() => {
    const user = getCurrentUserName();
    if (user !== null) {
      setIsLoggedin(true);
      setUserName(user);
    }
  }, []);

  //UseEffect for clearing alert after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setForms((prevAuth) => ({
        ...prevAuth,
        isCorrect: false,
        comment: "",
      }));
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [forms.comment]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      {forms.comment !== "" ? (
        forms.isCorrect ? (
          <Success />
        ) : (
          <Error />
        )
      ) : undefined}
      {!isLoggedIn ? (
        <div className="mt-[100px]">
          {/* <div
            className={`mt-[100px] w-[100px] h-[40px] flex items-center justify-center ${
              forms.isCorrect ? `bg-green-100` : `bg-red-100`
            } ${forms.comment !== "" ? `opacity-100` : `opacity-0`}`}
          >
            {forms.comment}
          </div> */}
          <form
            onSubmit={isRegistered ? handleLogin : handleRegister}
            className="flex flex-col items-center justify-center mt-[20px] p-[20px] border-2 w-max m-auto rounded-3xl"
          >
            <div className="flex flex-col gap-[10px] items-center justify-center mb-[10px]">
              <label htmlFor="username">Username</label>
              <input
                className="border-2 px-[10px]"
                type="text"
                id="username"
                name="username"
                value={defaultValues.username}
                onChange={handleInputChange}
                autoComplete="username"
              />
              {errors.username && <span>{errors.username}</span>}
            </div>

            {!isRegistered ? (
              <div>
                <div className="flex flex-col gap-[10px] items-center justify-center mb-[10px]">
                  <label htmlFor="email">Email</label>
                  <input
                    className="border-2 px-[10px]"
                    type="email"
                    id="email"
                    name="email"
                    value={defaultValues.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                  {errors.confirmPassword && (
                    <span>{errors.confirmPassword}</span>
                  )}
                </div>
                <div className="flex flex-col gap-[10px] items-center justify-center mb-[10px]">
                  <label htmlFor="password">Password</label>
                  <input
                    className="border-2 px-[10px]"
                    type="password"
                    id="password"
                    name="password"
                    value={defaultValues.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                  {errors.password && <span>{errors.password}</span>}
                </div>
                <div className="flex flex-col gap-[10px] items-center justify-center mb-[10px]">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="border-2 px-[10px]"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={defaultValues.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="confirm-password"
                  />
                  {errors.confirmPassword && (
                    <span>{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[10px] items-center justify-center mb-[10px]">
                <label htmlFor="password">Password</label>
                <input
                  className="border-2 px-[10px]"
                  type="password"
                  id="password"
                  name="password"
                  value={defaultValues.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                />
                {errors.password && <span>{errors.password}</span>}
              </div>
            )}

            <button
              type="submit"
              className="rounded-xl bg-blue-100 px-[20px] py-[8px] hover:bg-sky-100"
            >
              Submit
            </button>
          </form>
          <button
            className="w-full text-center mt-[30px] underline"
            onClick={toggleRegistration}
          >
            {!isRegistered ? "Registered? sign in" : "Not registred? Sign up"}
          </button>{" "}
        </div>
      ) : (
        <AccountPage username={userName} onclick={logOut}></AccountPage>
      )}
    </div>
  );
};

const AccountPage = ({ username, onclick }) => {
  return (
    <div className="h-[500px] max-w-4xl w-full p-[20px]">
      <div className="flex flex-row gap-[25px] mt-[100px]">
        <img
          className="w-[200px] h-[200px]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
        />
        <div className="flex flex-col justify-center gap-[15px] text-start">
          <h1 className="text-5xl">Account</h1>
          <span className="text-4xl">Username: {username}</span>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum nisi
            nulla culpa itaque veniam reprehenderit. Iste laborum provident
            ipsam libero harum veritatis, labore dignissimos illum aperiam
            laudantium, corrupti doloremque necessitatibus.
          </p>
          <OrangeButton onclick={onclick} text={"Log Out"}></OrangeButton>
        </div>
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <Alert variant="success" className="absolute w-[150px] text-center">
      <Alert.Heading>Success</Alert.Heading>
    </Alert>
  );
};

const Error = () => {
  return (
    <Alert variant="danger" className="absolute w-[150px] text-center">
      <Alert.Heading>Error</Alert.Heading>
    </Alert>
  );
};

// const Success = () => {
//   return (
//     <Alert variant="success">
//       <Alert.Heading>Hey, nice to see you</Alert.Heading>
//       <p>
//         Aww yeah, you successfully read this important alert message. This
//         example text is going to run a bit longer so that you can see how
//         spacing within an alert works with this kind of content.
//       </p>
//       <hr />
//       <p className="mb-0">
//         Whenever you need to, be sure to use margin utilities to keep things
//         nice and tidy.
//       </p>
//     </Alert>
//   );
// };

// const Error = () => {
//   return (
//     <Alert variant="danger" dismissible>
//       <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//       <p>
//         Change this and that and try again. Duis mollis, est non commodo luctus,
//         nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis
//         consectetur purus sit amet fermentum.
//       </p>
//     </Alert>
//   );
// };

export default Authorisation;
