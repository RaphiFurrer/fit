import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Circle from './components/Circle.tsx';
import Bar from './components/Bar.tsx';
import Login from './components/Login.tsx';
import Footer from './footer.tsx';

const [today] = new Date().toISOString().split('T');

const STEP_GOAL = 10000;
const ACTIVE_MINUTE_GOAL = 20;

function App() {
  const [activeZoneMinutes, setActiveZoneMinutes] = useState();
  const [steps, setSteps] = useState();
  const [sleepScore, setSleepScore] = useState();

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

      fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${today}.json`, {
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
          setSleepScore(
            data.sleep.find((sleep: { isMainSleep: boolean }) => sleep.isMainSleep).efficiency,
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
          setSteps(data.summary.steps);
        });
    }
  }, []);

  const stepPercentage = useMemo(() => ((steps ?? 0) / STEP_GOAL) * 100, [steps]);
  const activeMinutePercentage = useMemo(
    () => ((activeZoneMinutes ?? 0) / ACTIVE_MINUTE_GOAL) * 100,
    [activeZoneMinutes],
  );
  const sleepPercentage = useMemo(() => sleepScore ?? 0, [sleepScore]);

  const todayPercentage = useMemo(() => {
    return Math.round(((stepPercentage + activeMinutePercentage + sleepPercentage) / 250) * 100);
  }, [activeMinutePercentage, sleepPercentage, stepPercentage]);

  return (
    <>
      <Login />
      <div className="flex items-center justify-center">
        <div className="card">
          <p className="text-3xl font-bold">Heute</p>
          <Circle percentage={todayPercentage} />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Bewegung im Alltag</p>
            <div>
              {steps} / {STEP_GOAL}
            </div>
          </div>
          <Bar percentage={stepPercentage}></Bar>
          <div className="flex justify-between">
            <p className="text-lg font-bold">Sport</p>
            <p>
              {activeZoneMinutes} / {ACTIVE_MINUTE_GOAL}
            </p>
          </div>
          <Bar percentage={activeMinutePercentage}></Bar>
          <div className="flex justify-between">
            <p className="text-lg font-bold">Erholung</p>
              <div>{sleepScore} / 100</div>
          </div>
          <Bar percentage={sleepPercentage}></Bar>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
