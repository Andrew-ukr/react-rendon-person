import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

import logo from "./loading.svg";

const url = "https://randomuser.me/api/";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentValue, setCurrentValue] = useState(null);
  const [currentName, setCurrentName] = useState("name");
  const [person, setPerson] = useState(null);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setLoading(false);

    const personData = {
      name: `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`,
      email: data.results[0].email,
      age: data.results[0].dob.age,
      location: `${data.results[0].location.postcode}, ${data.results[0].location.country}`,
      phone: data.results[0].phone,
      login: data.results[0].login.password,
      img: data.results[0].picture.medium,
    };

    setCurrentValue(personData.name);
    setPerson(personData);
  };

  useEffect(() => {
    getData();
  }, []);

  const getRandomPerson = () => {
    getData();
  };

  const handleEvent = (e) => {
    const name = e.target.dataset.value;
    if (name) {
      const value = person[name];
      setCurrentName(name);
      setCurrentValue(value);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={loading ? logo : person && person.img} alt="" />
          <p className="user-title">My {currentName} is</p>
          <p className="user-value">{loading ? "..." : person && currentValue}</p>
          <div className="values-list">
            <button
              className="icon"
              onMouseEnter={handleEvent}
              data-value="name"
            >
              <FaUser></FaUser>
            </button>
            <button
              className="icon"
              onMouseEnter={handleEvent}
              data-value="email"
            >
              <FaEnvelopeOpen></FaEnvelopeOpen>
            </button>
            <button
              className="icon"
              onMouseEnter={handleEvent}
              data-value="age"
            >
              <FaCalendarTimes></FaCalendarTimes>
            </button>
            <button
              className="icon"
              onMouseEnter={handleEvent}
              data-value="location"
            >
              <FaMap></FaMap>
            </button>
            <button
              className="icon"
              onMouseEnter={handleEvent}
              data-value="phone"
            >
              <FaPhone></FaPhone>
            </button>
            <button
              className="icon"
              onMouseEnter={handleEvent}
              data-value="login"
            >
              <FaLock></FaLock>
            </button>
          </div>
          <button type="button" className="btn" onClick={getRandomPerson}>
            random user
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
