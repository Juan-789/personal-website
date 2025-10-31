import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom'
import zaratusthra from '/zarathustra.jpg'
import outsider from '/the outsider.jpg'
import white_nights from '/white_nights.jpg'
import me from '/juan_demo_day.jpg'
import roomba from '/roomba.jpg'
import petPrompt from '/pet_prompt.png'
import medRot from '/demoing_medrot.JPG'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import bedarraLogo from '/bedarra.jpeg'
// import bedarraLogo from '/bedarra_new.png'
import rabbit from '/waiting-rabbit.gif'


import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const Layout = () => {
    const location = useLocation();

    const activeRoute = location.pathname.substring(1) || 'Home';
  

  return (
    <div>
      <Sidebar
        toggleSidebar={toggleSidebar} // Pass the toggle function
        activeRoute={activeRoute}
      />
      <div style={{
            marginLeft: isSidebarOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease-in-out', 
            backgroundColor: 'transparent'
          }}>

        {/* 3. DEFINE THE ROUTES HERE */}
        <Routes>
          {/* The default path "/" shows the main About/Featured/Experience sections */}
          <Route path="/" element={<HomeContent />} /> 
          
          {/* Building Routes */}
          <Route path="/projects" element={<Project />} />
          <Route path="/experience" element={<Experience />} />
          {/* Add more routes here */}
          <Route path="/essays" element={<Blog />} />

          {/* A catch-all route for paths that don't match */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
    );
  };
  const HomeContent = () => (
    <>
      <About />
      <FeaturedSection />
      <Experience />
      {/* If you want Blog here, add it back: <Blog /> */}
    </>
  );

  return (
    // 2. WRAP THE ENTIRE APP IN BROWSER ROUTER
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
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
    <div className='about-container'>
    <div>
      <div className='profile-text'>
        <h1>Hi I'm Juan :)</h1> 
        <h3>
          I like to learn how stuff works, and build indie, fun programs 
        </h3>
          <h3><i>Just for the sake of it</i></h3>
        <p>Also a Computer Science major @ <a href="https://carleton.ca/">Carleton University</a>, community coordinator at <a href='https://www.uottahack.ca/'>uOttahack</a>, and an organizor at <a href='https://luma.com/synchronize'>Synchronize</a>, (Ottawa's <a href='https://www.socratica.info/'>Socratica</a> Node)</p>
      </div>
      <div className='profile-image'>
        <img src={me} alt="Me" width={'300px'} />
      </div>
    </div>
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

function Experience() {
  return(
    <>
    <h2 className='feat-proj-text'>
      Employment:
    </h2>
    <div className='company-block'>
      <div className='company-header'>
        <img src={bedarraLogo} alt="Bedarra Corporation" className='company-logo' />
        <div>
          <h3>Bedarra Corporation</h3>
          <p className='company-tagline'>Ottawa, Ontario • May 2024 - Aug 2025</p>
        </div>
      </div>

      <div className='roles-timeline'>
        
        {/* Latest role - most detail */}
        <div className='role'>
          <div className='role-header'>
            <h4>Full-Stack Intern</h4>
            <span className='date'>May 2025 - Aug 2025</span>
          </div>
          <p className='role-summary'>
            Building a <strong>local-first app</strong> that runs entirely on-device. 
            Transformed the Rust backend into an FFI library so the app works offline 
            on iOS, Android, and Chrome. Created custom data structures inspired by 
            Doug Engelbart's Augment System for rendering PDFs, images, and Markdown.
          </p>
          <p className='role-highlight'>
            Also mentored another intern—created their project roadmap and documented 
            technical challenges.
          </p>
        </div>

        {/* Middle role - medium detail */}
        <div className='role'>
          <div className='role-header'>
            <h4>Part-Time Full-Stack Intern</h4>
            <span className='date'>Sep 2024 - Apr 2025</span>
          </div>
          <p className='role-summary'>
            Built a secure database architecture (no SQL injection here), and optimized 
            email downloads by 30% using a WASI-compiled Rust binary. Implemented a 
            search engine for email data.
          </p>
        </div>

        {/* First role - brief */}
        <div className='role'>
          <div className='role-header'>
            <h4>Full-Stack Intern</h4>
            <span className='date'>May 2024 - Aug 2024</span>
          </div>
          <p className='role-summary'>
            Researched Doug Engelbart's computer science papers (even consulted with 
            SRI lab), then built apps with Rust and Flutter. Compiled Rust to WebAssembly 
            for high-performance web apps. Created a P2P file sync system that works 
            across iOS, Android, Windows, Linux, and macOS.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
// 1. Define the component and accept props for content and state
function Sidebar({  toggleSidebar, activeRoute }) {
  // 2. Add classes dynamically based on the 'isOpen' prop
  const sidebarClasses = `sidebar  open`;
// Helper function to convert a display name to a URL path
  const toPath = (name) => {
    if (name === 'Home') return '/';
    return `/${name.toLowerCase().replace(/\s/g, '-')}`;
  }

  // Helper component to render a clickable link using <Link>
  const NavLink = ({ name }) => {
    const path = toPath(name);
    const isActive = path === activeRoute || (name === 'Home' && activeRoute === '');

    return (
      <li className={isActive ? 'active-link' : ''}>
        <Link to={path} onClick={toggleSidebar}>
          {name}
        </Link>
      </li>
    );
  };
  return (
    <div className={sidebarClasses}>
      {/* 3. Render any passed content */}
      <div className="sidebar-content">
        <div className='sidebar-header'>
          <div className='sidebar-avatar'>
            <img
              className="sidebar-gif"
              src={rabbit}
              alt="Waiting rabbit"
              width={'150px'}
            > 
            </img> 
          </div>
        </div>
        <nav className='sidebar-nav'>
           <ul>
            <NavLink name="Home" />
            <NavLink name="Building" />

            <ul>
              <NavLink name="Projects" />
              <NavLink name="Learning" />
              <NavLink name="Employment" />
            </ul>
            <NavLink name="Reading" />
            <ul>
              <NavLink name="Essays" />
              <NavLink name="Books" />
              <NavLink name="To be read" />
              <NavLink name="Notes" />
            </ul>
            <NavLink name="Exploring" />
            <ul>
            <NavLink name="Community" />
            <NavLink name="Food" />
            <NavLink name="Movies" />
            <NavLink name="Cool links" />

            </ul>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function FeaturedSection(){
  return (
    <>
    <h2 className='feat-proj-text'>Featured Projects:</h2>
    <div className='featured-items'>
      <div className='featured-i'>
        <Card sx={{
          maxWidth: 345,
          backgroundColor: 'transparent'
        }}>
          <CardActionArea 
            href='https://github.com/bskdany/roomba1'
            target='_blank'
            rel="noopener noreferrer"  
          >
            <CardMedia
              component="img"
              height="140"
              image={roomba}
              alt="Roomba"
            />
            <CardContent className='glass-card-content'>
              <Typography gutterBottom variant="h5" component="div">
                Rambo Roomba
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A Raspberry Pi 4B running QNX controls a Roomba vacuum cleaner
                equipped with an Arduino and four photoresistors for light-based navigation.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className='featured-i'>
        <Card sx={{
        maxWidth: 345,
        backgroundColor: 'transparent'
        }}>
        <CardActionArea 
          href='https://github.com/Juan-789/prompt-pet'
          target='_blank'
          rel="noopener noreferrer"
        >
          <CardMedia
            component="img"
            height="140"
            image={petPrompt}
            alt="Prompt_Pet"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Pet Prompt
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Chrome Extension to help you write better prompts
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
      </div>
      <div className='featured-i'>
        <Card sx={{
        maxWidth: 345,
        backgroundColor: 'transparent'
        }}>
        <CardActionArea 
          href='https://github.com/Juan-789/med-rot'
          target='_blank'
          rel="noopener noreferrer"  
        >
          <CardMedia
            component="img"
            height="140"
            image={medRot}
            alt="Med Rot"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Med Rot
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Website that calls you to remind you of your meds, with Peter Griffin's voice, and saying brain rotted phrases 
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
      </div>
    </div>
    </>
  );
}

export default App
