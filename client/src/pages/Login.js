import styled from 'styled-components/macro';
import landingResized from "../images/landingResized.png";
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
  margin-top: 1em;;

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
  padding:3em;
`;

const Login = () => (
  <StyledLoginContainer>
    <StyledLandingDiv>
      <img classname="landing-img" src={landingResized} alt=""/>

    </StyledLandingDiv>
    <StyledLandingDiv>
    <h1>what2play</h1>
  
    <StyledLoginButton href="http://localhost:8888/login">
      Log in to Spotify
    </StyledLoginButton>

    <h3 style={{color:"grey", marginTop:"2em"}}>Choose | Prompt | Play </h3>
    </StyledLandingDiv>

  </StyledLoginContainer>
);

export default Login;