import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import zaratusthra from '/zarathustra.jpg'
import outsider from '/the outsider.jpg'
import white_nights from '/white_nights.jpg'
import './App.css'


function openTab(evt, tabName) {
  var i, tabContent, tablinks;
  tabContent = document.getElementsByClassName("tabcontent");
  for (i=0; i< tabContent.length; i++) {
    tabContent[i].computedStyleMap.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i< tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

}

function App() {

  return (
    <>
    {/* this div should be like the top Hello */}
      <div> 
        <About />
      </div>
      {/* <div class="tab">
        <button class="tablinks" onClick={openTab(event, "About")}>About</button>
        <button class="tablinks" onClick={openTab(event, "Projects")}>Projects</button>
        <button class="tablinks" onClick={openTab(event, "Experience")}>Experience</button>
        <button class="tablinks" onClick={openTab(event, "Blog")}>Blog</button>
      </div>


      <div id="About" class="tabContent">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div id="Projects" class="tabContent">

      </div>
      <div id="Experience" class="tabContent">

      </div>
      <div id="Blog" class="tabContent">
 */}
      {/* </div> */}
      <Blog />
      <Project />
    </>
  )
}


function Blog() {

  return (
    <div>
      <h3>This is supposed to be blog page where I post essays on books i read or stuff im into lately</h3>
      <div className="sample-essay">
        <img
        className="blog-image-title"
        src={outsider}
        alt="Photo of Zarathustra"
        />
        <div className='essay-text-clickbait'>
          <p className='essay-title'>
            I didn't like The Outsider
          </p>
          <p className='essay-description'>
            The outsider by Albert Camus is a novel that I have come accross so much in social meida,f but the novel wasn't even that good imo
          </p>
        </div>
      </div>

      <div className="sample-essay">
        <img
        className="blog-image-title"
        src={zaratusthra}
        alt="Photo of The Outsider (The Stranger)"
        />
        <div className='essay-text-clickbait'>
          <p className='essay-title'>
            Interesting, but dangerous book
          </p>
          <p className='essay-description'>
            Frederich Nietzche wrote thisbook back in 18xx, interesting but hard to understand
          </p>
        </div>
      </div>
      <div className="sample-essay">
        {/* maybe each logo a different shape would be interesting */}
        <img
        className="blog-image-title"
        src={white_nights}
        alt="Photo of White Nights"
        />
        <div className='essay-text-clickbait'>
          <p className='essay-title'>
            Interesting, but dangerous book
          </p>
          <p className='essay-description'>
            Frederich Nietzche wrote thisbook back in 18xx, interesting but hard to understand
          </p>
        </div>
      </div>
    </div>
  )
}


function About() {
  return (
    <div>
      <h1>Hello I'm Juan</h1> 
      <p>
        I like to learn how stuff works, and build indie, fun programs
      </p>
    </div>
  )
}

function Project() {
  return (
    <div>
      <h1>These are some of my projects</h1>
    </div>
  )
}

export default App
