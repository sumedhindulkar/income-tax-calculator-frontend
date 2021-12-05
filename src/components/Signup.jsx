import React, { useState, useEffect } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Login() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    try {
      var { data } = await axios({
        url: "/api/users",
        method: "POST",
        data: userDetails,
      });
      console.log("data is " + data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login w-100 h-100">
      <div>
        <Card>
          <CardHeader color="purple" size="lg">
            <H5 color="white">Signup</H5>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <div className="mb-8 px-4">
                <InputIcon
                  type="text"
                  color="purple"
                  placeholder="Name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-8 px-4">
                <InputIcon
                  type="email"
                  color="purple"
                  placeholder="Email Address"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 px-4">
                <InputIcon
                  type="password"
                  color="purple"
                  placeholder="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center">
                <Button
                  color="purple"
                  buttonType="filled"
                  size="lg"
                  ripple="dark"
                >
                  Submit
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
