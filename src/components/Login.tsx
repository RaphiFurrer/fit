import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import fitbit from '../assets/fitbit.svg';

const authUrl =
  'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RKZM&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=kbbxXLV--bx-NKTtE0rBrwQoDG78mgQLTnGBGVpNRHQ&code_challenge_method=S256&state=4v6t690k0y491g102f5u3j365g0p5b11&redirect_uri=http%3A%2F%2Flocalhost%3A5173';

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div>
      {localStorage.getItem('access_token') ? (
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex gap-2 justify-center justify-items-center items-center">
          <img src={fitbit} alt="" className="w-12 h-12" />
          <a href={authUrl}>Mit Fitbit verbinden</a>
        </div>
      )}
    </div>
  );
};

export default Login;
