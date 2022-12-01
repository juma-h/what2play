import styled from 'styled-components/macro';
import landing from "../images/landing.png";
import "../styles/login.css";


const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  width:100%;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const StyledLandingDiv = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:50%;
`;

const Login = () => (
  <StyledLoginContainer>
    <StyledLandingDiv>
      <img classname="landing-img" src={landing} alt=""/>
      <h2>Choose | Prompt |Play </h2>

    </StyledLandingDiv>
    <StyledLoginButton href="http://localhost:8888/login">
      Log in to Spotify
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;