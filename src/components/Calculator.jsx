import React, { useState, useEffect } from "react";
import calculateTax from "../service/calculateTax";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import commaNumber from "comma-number";
import Radio from "@material-tailwind/react/radio";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
export default function Calculator() {
  const history = useHistory();
  const { id } = useParams();
  console.log("id is" + id);
  const [state, setState] = useState({
    bas: "",
    hra: "",
    lta: "",
    fa: "",
    rent: "",
    med: "",
    inv: "",
    city: "",
  });
  const [name, setName] = useState(null);
  const [tax, setTax] = useState(null);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      setName(userDetails.user.name);
    }
  }, [history]);
  const changeState = (event) => {
    const { name, value } = event.target;
    var newValue = parseFloat(value.replace(/,/g, ""));
    if (newValue !== newValue) {
      newValue = 0;
    }
    setState((prev) => {
      return { ...prev, [name]: newValue };
    });
  };
  const changeCity = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    setTax(calculateTax(state));
  };
  return (
    <div className="calculate w-100 h-100">
      <div>
        <Card>
          <CardHeader color="blue" size="lg">
            <H5 color="white">What is your Income Tax {name}?</H5>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody>
              {/* <div className="mb-4 px-4">
              <InputIcon
                type="text"
                color="blue"
                placeholder="House Rent Allowance"
              />
            </div> */}

              <div className="mb-4 d-flex px-4">
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="Basic Income"
                    name="bas"
                    value={commaNumber(state.bas)}
                    onChange={changeState}
                  />
                </div>
                <div className="mb-8 w-50 d-flex justify-evenly align-center">
                  <div>
                    <Radio
                      color="lightBlue"
                      text="Metro City"
                      id="option-1"
                      name="city"
                      value="metro"
                      onChange={changeCity}
                    />
                  </div>
                  <div>
                    <Radio
                      color="lightBlue"
                      text="Non metro City"
                      id="option-2"
                      name="city"
                      value="nonMetro"
                      onChange={changeCity}
                    />
                  </div>
                </div>
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="House Rent Allowance"
                    name="hra"
                    value={commaNumber(state.hra)}
                    onChange={changeState}
                  />
                </div>
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="LTA"
                    name="lta"
                    value={commaNumber(state.lta)}
                    onChange={changeState}
                  />
                </div>
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="Food Allowance"
                    name="fa"
                    value={commaNumber(state.fa)}
                    onChange={changeState}
                  />
                </div>
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="Rent Paid"
                    name="rent"
                    value={commaNumber(state.rent)}
                    onChange={changeState}
                  />
                </div>
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="Investment"
                    name="inv"
                    value={commaNumber(state.inv)}
                    onChange={changeState}
                  />
                </div>
                <div className="mb-8 w-50">
                  <InputIcon
                    type="text"
                    color="blue"
                    placeholder="Mediclaim"
                    name="med"
                    value={commaNumber(state.med)}
                    onChange={changeState}
                  />
                </div>
              </div>
              {tax && (
                <div className="px-4">
                  <H5>Your Total Tax is: {commaNumber(tax)}</H5>
                </div>
              )}
            </CardBody>

            <CardFooter>
              <div className="flex justify-center">
                <Button
                  color="blue"
                  type="submit"
                  buttonType="filled"
                  size="lg"
                  ripple="dark"
                >
                  Calculate
                </Button>
                <div
                  className="mx-5"
                  onClick={() => {
                    localStorage.removeItem("userDetails");
                    history.push("/login");
                  }}
                >
                  <Button
                    color="purple"
                    buttonType="filled"
                    size="lg"
                    ripple="dark"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
