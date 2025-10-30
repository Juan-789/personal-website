import { useState } from 'react'
import zaratusthra from '/zarathustra.jpg'
import outsider from '/the outsider.jpg'
import white_nights from '/white_nights.jpg'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
    {/* this div should be like the top Hello */}
      <div>
        {/* <button onClick={toggleSidebar}>
          {isSidebarOpen ? 'Close Sections' : 'Open Sections'}
        </button> */}

        <Sidebar isOpen={isSidebarOpen}>
          <h3>Page Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Reading</li>
            <ul>
              <li>Essays</li>
              <li>Books</li>
              <li>To be read</li>
              <li>Notes</li>
            </ul>
            <li>Building</li>
            <ul>
              <li>Projects</li>
              <li>Learning</li>
            </ul>
            <li>Exploring</li>
            <ul>
            <li>Community</li>
            <li>Food</li>
            <li>Movies</li>
            <li>Cool links</li>
            </ul>
          </ul>
        </Sidebar>
      </div>
      <div style={{marginLeft: isSidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease-in-out' }}>

      <div > 
        <About />
      </div>
        <Blog />
        <Project />
      </div>
    </div>
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
      <h1>Hi I'm Juan :)</h1> 
      <p>
        I like to learn how stuff works, and build indie, fun programs <i>Just for the sake of it</i>
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

function Food(){} //places i've gone, and or maybe recipes,

function ToBeRead(){} //books in my shelf i need to read

function Movies(){} //movies i've watched that I like

function CoolLinks(){}  // cool websites, inspiration, fun facts, etc...

function interestingThingsImLearningAbout(){} // how a cd works, how does it read, and write, the stars, etc...

function Notes(){}  // notes i've taken when learning something, handwritten or digital, notion or something

function Experience() {}
// 1. Define the component and accept props for content and state
function Sidebar({ isOpen, children }) {
  // 2. Add classes dynamically based on the 'isOpen' prop
  const sidebarClasses = `sidebar ${isOpen ? 'open' : 'closed'}`;

  return (
    <div className={sidebarClasses}>
      {/* 3. Render any passed content */}
      <div className="sidebar-content">
        {children}
      </div>
    </div>
  );
}

export default App
