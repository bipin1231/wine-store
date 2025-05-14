import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OAuth2Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    
    const code = urlParams.get('code');
console.log(code);

    // if (code) {
    //   // Send the code to backend
    //   axios.post('http://localhost:8080/api/auth/google', { code })
    //     .then(response => {
    //       console.log('Login success!', response.data);
    //       // Save token / move to homepage
    //       navigate('/');
    //     })
    //     .catch(error => {
    //       console.error('Login failed', error);
    //       navigate('/login');
    //     });
    // }
  }, [navigate]);

  return <div>Logging you in...</div>;
}

export default OAuth2Callback;
