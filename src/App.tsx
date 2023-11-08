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

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function App() {
  const params = useParams();

  const [activeZoneMinutes, setActiveZoneMinutes] = useState(0);
  const [steps, setSteps] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const isFutureDate = Date.parse(params.date || new Date().toISOString()) > new Date().getTime();
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
          setActiveZoneMinutes(isFutureDate ? 0 : getRandomInt(10, 20));
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
          setSleepScore(isFutureDate ? 0 : getRandomInt(80, 99));
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
          setSteps(isFutureDate ? 0 : getRandomInt(4000, 10000));
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
        className="absolute right-1 top-1/3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to={nextDay}
      >
        {'>'}
      </Link>
      <Link
        className="absolute left-1 top-1/3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to={lastDay}
      >
        {'<'}
      </Link>
        <button onClick={()=>{setIsOpen(true)}}>levelup</button>
      <div className="flex items-center justify-center">
        <div className="card">
          <p className="text-3xl font-bold">
            {!params.date || params.date === today ? 'Heute' : params.date}
          </p>
          <Circle percentage={todayPercentage} />
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <img className="icon" src={footsteps} alt="" />
              <p className="text-lg font-bold">Bewegung</p>
            </div>
            <div>
              {steps} / {STEP_GOAL}
            </div>
          </div>
          <Bar percentage={stepPercentage}></Bar>
          <div className="flex justify-between mb-2">
            <div className="flex gap-2 icon">
              <img src={sport} alt="" />
              <p className="text-lg font-bold">Sport</p>
            </div>
            <p>
              {activeZoneMinutes} / {ACTIVE_MINUTE_GOAL}
            </p>
          </div>
          <Bar percentage={activeMinutePercentage}></Bar>
          <div className="flex justify-between mb-2">
            <div className="flex gap-2 icon">
              <img src={sleep} alt="" />
              <p className="text-lg font-bold">Erholung</p>
            </div>
            <div>
              {sleepScore} / {RELAX_GOAL}
            </div>
          </div>
          <Bar percentage={sleepPercentage}></Bar>
        </div>
      </div>
      <p className="text-3xl font-bold mb-4">Rewards einlösen</p>
      <div className="flex flex-col mb-16">
        <div className="bg-[#9fbeaf] rounded-lg shadow-lg p-4 mb-4">
          <p className="pt-4 font-bold text-xl">Private Vorsorge</p>
          <p>Investiere in deine Säule 3a und deine Zukunft</p>
        </div>
        <div className="bg-[#9fbeaf] rounded-lg shadow-lg p-4 mb-4">
          <p className="pt-4 font-bold text-xl">Swibeco</p>
          <p>Profitiere von akktraktiven Vorteilen auf Swibeco </p>
        </div>
        <div className="bg-[#9fbeaf] rounded-lg shadow-lg p-4 mb-4">
          <p className="pt-4 font-bold text-xl">Partnerleistung</p>
          <p className="pb-4">Gutschein bei einem Leistungserbringer einlösen z.B. eine Massage</p>
        </div>
      </div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Footer />
    </>
  );
}

export default App;
