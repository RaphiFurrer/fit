import { useEffect, useState } from 'react';
import './App.css';
import Circle from './components/Circle.tsx';
import Bar from './components/Bar.tsx';
import Login from './components/Login.tsx';
import Footer from './footer.tsx';

const [today] = new Date().toISOString().split('T');

function App() {
  const [activeZoneMinutes, setActiveZoneMinutes] = useState();
  const [activeZoneMinutesYear, setActiveZoneMinutesYear] = useState();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetch(
        `https://api.fitbit.com/1/user/-/activities/active-zone-minutes/date/${today}/1d.json`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setActiveZoneMinutes(data['activities-active-zone-minutes'][0].value.activeZoneMinutes);
        });

      fetch(
        `https://api.fitbit.com/1/user/-/activities/active-zone-minutes/date/2023-01-01/${today}.json`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setActiveZoneMinutesYear(
            data['activities-active-zone-minutes'].reduce(
              (acc: number, value: { value: { activeZoneMinutes: number } }) =>
                acc + value.value.activeZoneMinutes,
              0,
            ),
          );
        });

      fetch(`https://api.fitbit.com/1/user/-/activities/date/${today}.json`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  }, []);

  return (
    <>
      <Login />
      <div className="card">
        <span>Heute</span>
        <div>{activeZoneMinutes}</div>
        <div>{activeZoneMinutesYear}</div>

        <Circle percentage={50} />
        <Bar percentage={60}></Bar>
        <Bar percentage={60}></Bar>
        <Bar percentage={60}></Bar>
      </div>
      <Footer />
    </>
  );
}

export default App;
