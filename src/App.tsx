import React from "react";
import "./App.css";
import Home from "./components/Home/Home";

function App() {
  const aboutText = `Hi,<br />
my name is <span class="TextWhite">Filip Szulczewski</span>.<br />
I’m an <span class="TextGreen">autodidact programmer</span>, with <span class="TextWhite">more than a decade of experience</span>.<br /><br />  
I’ve <span class="TextGreen">architected</span>, <span class="TextGreen">built</span>, and <span class="TextGreen">delivered</span> an array of <span class="TextPurple">video applications</span> using <span class="TextPurple">web technologies</span>. 
I have a <span class="TextWhite">track record</span> of <span class="TextWhite">succesfully augmenting teams</span> in <span class="TextWhite">Professional Services</span> capacity.  
I've worked both on <span class="TextPurple">frontend</span> and <span class="TextPurple">backend</span> projects.  
I’m a <span class="TextPurple">FOSS</span> enthusiast with a <span class="TextPurple">DIY</span> spirit.`;

  return <Home aboutText={aboutText} />;
}

export default App;
