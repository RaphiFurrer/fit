import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Circle from './components/Circle.tsx';
import Bar from './components/Bar.tsx';
import Login from './components/Login.tsx';
import Footer from './components/Footer.tsx';
import sleep from './assets/sleep.svg';
import sport from './assets/sport.svg';
import footsteps from './assets/footsteps.svg';
import Modal from './components/Modal';
import { Link, useParams } from 'react-router-dom';

const [today] = new Date().toISOString().split('T');

const STEP_GOAL = 10000;
const ACTIVE_MINUTE_GOAL = 20;
const RELAX_GOAL = 100;

function App() {
  const params = useParams();

  const [activeZoneMinutes, setActiveZoneMinutes] = useState(0);
  const [steps, setSteps] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetch(
        `https://api.fitbit.com/1/user/-/activities/active-zone-minutes/date/${
          params.date || today
        }/1d.json`,
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
          if (data['activities-active-zone-minutes'][0])
            setActiveZoneMinutes(data['activities-active-zone-minutes'][0].value.activeZoneMinutes);
        })
        .catch(() => {
          setActiveZoneMinutes(16);
        });

      fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${params.date || today}.json`, {
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
          if (data.sleep)
            setSleepScore(
              data.sleep.find((sleep: { isMainSleep: boolean }) => sleep.isMainSleep).efficiency,
            );
        })
        .catch(() => {
          setSleepScore(90);
        });

      fetch(`https://api.fitbit.com/1/user/-/activities/date/${params.date || today}.json`, {
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
          if (data.summary) setSteps(data.summary.steps);
        })
        .catch(() => {
          setSteps(4578);
        });
    }
  }, [params.date]);

  const stepPercentage = useMemo(
    () => Math.min(Math.round(((steps ?? 0) / STEP_GOAL) * 100), 100),
    [steps],
  );
  const activeMinutePercentage = useMemo(
    () => Math.min(Math.round(((activeZoneMinutes ?? 0) / ACTIVE_MINUTE_GOAL) * 100), 100),
    [activeZoneMinutes],
  );
  const sleepPercentage = useMemo(() => sleepScore ?? 0, [sleepScore]);

  const todayPercentage = useMemo(() => {
    return Math.min(
      Math.round(((stepPercentage + activeMinutePercentage + sleepPercentage) / 250) * 100),
      100,
    );
  }, [activeMinutePercentage, sleepPercentage, stepPercentage]);

  const nextDay = useMemo(() => {
    const current = new Date(params.date || new Date());
    current.setDate(current.getDate() + 1);
    return current.toISOString().split('T')[0];
  }, [params.date]);
  const lastDay = useMemo(() => {
    const current = new Date(params.date || new Date());
    current.setDate(current.getDate() - 1);
    return current.toISOString().split('T')[0];
  }, [params.date]);

  return (
    <>
      <Login />
      <Link
        className="fixed right-1 top-1/3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to={nextDay}
      >
        {'>'}
      </Link>
      <Link
        className="fixed left-1 top-1/3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to={lastDay}
      >
        {'<'}
      </Link>
      <div className="flex items-center justify-center">
        <div className="card">
          <p className="text-3xl font-bold">
            {!params.date || params.date === today ? 'Heute' : params.date}
          </p>
          <Circle percentage={todayPercentage} />
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <p className="text-lg font-bold">Bewegung im Alltag</p>{' '}
              <img className="icon" src={footsteps} alt="" />
            </div>
            <div>
              {steps} / {STEP_GOAL}
            </div>
          </div>
          <Bar percentage={stepPercentage}></Bar>
          <div className="flex justify-between mb-2">
            <div className="flex gap-2 icon">
              <p className="text-lg font-bold">Sport</p> <img src={sport} alt="" />
            </div>
            <p>
              {activeZoneMinutes} / {ACTIVE_MINUTE_GOAL}
            </p>
          </div>
          <Bar percentage={activeMinutePercentage}></Bar>
          <div className="flex justify-between mb-2">
            <div className="flex gap-2 icon">
              <p className="text-lg font-bold">Erholung</p> <img src={sleep} alt="" />
            </div>
            <div>
              {sleepScore} / {RELAX_GOAL}
            </div>
          </div>
          <Bar percentage={sleepPercentage}></Bar>
        </div>
      </div>
      <p className="text-3xl font-bold mb-4">Rewards einlösen</p>
      <div className="grid grid-cols-3 gap-2 mb-8">
        <div className="bg-[#9fbeaf] rounded-lg shadow-lg p-4 text-lg font-bold text-center">
          3a
        </div>
        <div className="bg-[#9fbeaf] rounded-lg shadow-lg p-4 text-lg font-bold text-center">
          Swibeco
        </div>
        <div className="bg-[#9fbeaf] rounded-lg shadow-lg p-4 text-lg font-bold text-center ">
          Gutschein
        </div>
      </div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        levelup
      </button>
      <Modal isOpen={isOpen} />
      <Footer />
    </>
  );
}

export default App;
