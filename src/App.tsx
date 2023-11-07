import { useEffect, useState } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';

const authUrl =
  'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RKZM&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=kbbxXLV--bx-NKTtE0rBrwQoDG78mgQLTnGBGVpNRHQ&code_challenge_method=S256&state=4v6t690k0y491g102f5u3j365g0p5b11&redirect_uri=http%3A%2F%2Flocalhost%3A5173';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeZoneMinutes, setActiveZoneMinutes] = useState();
  const [activeZoneMinutesYear, setActiveZoneMinutesYear] = useState();

  useEffect(() => {
    if (searchParams.has('code') && !localStorage.getItem('access_token')) {
      fetch('https://api.fitbit.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: '23RKZM',
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:5173',
          code: searchParams.get('code') || '',
          code_verifier:
            '2i5s4r322o45433b2k3n303i2e1z6y2y130h1c275g2h46286a6b57434d602p3g4q5a276p4r6b321s5v6h3d1b2b2y2c1g2u2z4m2s3i520o3b0r3m0z6h3i0z0p4p',
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data here
          localStorage.setItem('access_token', data.access_token);
          setSearchParams({});
          window.location.reload();
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetch(
        'https://api.fitbit.com/1/user/-/activities/active-zone-minutes/date/2023-11-07/1d.json',
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
          // Handle the response data here
          setActiveZoneMinutes(data['activities-active-zone-minutes'][0].value.activeZoneMinutes);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });

      fetch(
        'https://api.fitbit.com/1/user/-/activities/active-zone-minutes/date/2023-01-10/2023-11-08.json',
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
          // Handle the response data here
          setActiveZoneMinutesYear(
            data['activities-active-zone-minutes'].reduce(
              (acc: number, value: { value: { activeZoneMinutes: number } }) =>
                acc + value.value.activeZoneMinutes,
              0,
            ),
          );
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });
      fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2023-11-07/2023-11-08.json', {
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
          // Handle the response data here
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });
    }
  }, []);

  return (
    <>
      <div>
        {localStorage.getItem('access_token') ? (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <a href={authUrl}>Login</a>
        )}
      </div>
      <div className="card">
        <pre id="json">{activeZoneMinutes}</pre>
        <pre id="json">{activeZoneMinutesYear}</pre>
      </div>
    </>
  );
}

export default App;
