import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Link, useLocation, useNavigate, replace} from 'react-router-dom'
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
import huffman from '/huffman.jpeg'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Building from './Building.jsx';
import Projects from './Projects.jsx';
import resume from '/resume_Juan.pdf';
import './App.css'

import { HowFileCompressionWorks } from './LearningPost.jsx'



function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect'); 
      if (redirect) {
        navigate(redirect, {replace: true});
      } 
    }, [navigate]);

    const activeRoute = location.pathname.substring(1) || 'Home';
  

    return (
    <div>
      <Sidebar
        toggleSidebar={toggleSidebar} // Pass the toggle function
        activeRoute={activeRoute}
      />
       {/** fuck ah classbro made shi ugly ah frfr **/}
      <div  
        className='fuck-ass-class' 
        style={{
          marginLeft: isSidebarOpen ? '250px' : '250px', 
          transition: 'margin-left 0.3s ease-in-out', 
          backgroundColor: 'transparent'
        }}>

        {/* 3. DEFINE THE ROUTES HERE */}
        <Routes>
          {/* The default path "/" shows the main About/Featured/Experience sections */}
          <Route path="/" element={<HomeContent />} /> 
          
          {/* Building Routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/building" element={<Building />} />
          <Route path="/employment" element={<Resume />} />
          {/* <Route path="/resume" element={<Resume />} /> */}
          <Route path="/learning" element={<InterestingThingsImLearningAbout />} />
          <Route path="/learning/how-compression-work" element={<HowFileCompressionWorks />} />
          <Route path="/k33na5" element={<Letter />}></Route>
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
    <BrowserRouter basename='/'>
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

// function Project() {
//   return (
//     <div>
//       <h1>These are some of my projects</h1>
//     </div>
//   )
// }

function Food(){} //places i've gone, and or maybe recipes,

function ToBeRead(){} //books in my shelf i need to read

function Movies(){} //movies i've watched that I like

function CoolLinks(){}  // cool websites, inspiration, fun facts, etc...

function LearningBlogCard({ title, excerpt, date, image, slug }) {
  return (
    <div>
    <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
      <CardActionArea href={`/learning/${slug}`}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        <CardContent className='glass-card-content'>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}


function InterestingThingsImLearningAbout(){ // how a cd works, how does it read, and write, the stars, etc...
  return (
    <div className='learning-container'>
      <div className='learning-header'>
        <h3>Currently learning</h3>
        <h4>  </h4>
        <div className='learning-cards'>
          {/* <LearningBlogCard
            title="Data Structures and Algorithms"
            excerpt="Binary trees, two-four trees, and abstract syntax trees"
            date="November 3rd, 2025"
            image="tr" //tree image
            slug="data-structures-trees"
          >
          </LearningBlogCard> */}
          <LearningBlogCard
            title="How File Compression works"
            excerpt=""
            date="November 3rd, 2025"
            image={huffman}
            slug="how-compression-work"
          ></LearningBlogCard>
          {/* <LearningBlogCard
            title="How CDs Actually Work"
            excerpt="How this mirror looking disk store data?"
            date="How this mirror looking disk store data?"
            image="How this mirror looking disk store data?"
            slug="how-cds-work"
          ></LearningBlogCard> */}
        </div>
      </div>
    </div>
  );
} 

function Letter(){ 

  return (
    <div style={{ 
      position: 'fixed',
      overflowY: 'auto',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #111827 0%, #1f2937 50%, #111827 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      padding: '2rem',
      zIndex: 9999
    }}>
      
      <div style={{ width: '100%', maxWidth: '56rem' }}>
        {/* Letter */}
        <div 
          style={{
            width: '100%',
            minHeight: '24rem',
            top: 40,
            borderRadius: '0.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '4px solid #92400e',
            background: '#fef3c7',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.1\" /%3E%3C/svg%3E')",
            bottom: 40
          }}
        >
          {/* Letter lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            padding: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            pointerEvents: 'none'
          }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{
                width: '100%',
                height: '1px',
                background: 'rgba(156, 163, 175, 0.2)'
              }} />
            ))}
          </div>
          
{/* Text content */}
          <div style={{ 
            position: 'relative', 
            padding: '4rem',
            fontFamily: 'serif',
            fontSize: '1.125rem',
            lineHeight: '2.5rem',
            color: '#78350f',
            textAlign: 'left',

          }}>
            <p>I love my Girlfriend,</p> 
            Hi silly, 
            am sorry i couldnt make it today, been really anxious about my uncertain future and lowkey i feel pressured to choose between AI or embeded for the rest of my life, when I love all aspects of programming
            I love CS but am not sure whether the niche I pick will be the one I like the most, anyways, thank you for being there for me  
            <br />
            <p>I love you,</p>
            <p>Juan :)</p>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: '56rem' }}>
        {/* Letter */}
        <div 
          style={{
            width: '100%',
            minHeight: '24rem',
            borderRadius: '0.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '4px solid #92400e',
            background: '#fef3c7',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.1\" /%3E%3C/svg%3E')",
            top: 60,
            bottom: 0,
          }}
        >
          {/* Letter lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            padding: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            pointerEvents: 'none'
          }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{
                width: '100%',
                height: '1px',
                background: 'rgba(156, 163, 175, 0.2)'
              }} />
            ))}
          </div>
          
{/* Text content */}
          <div style={{ 
            position: 'relative', 
            padding: '4rem',
            fontFamily: 'serif',
            fontSize: '1.125rem',
            lineHeight: '2.5rem',
            color: '#78350f',
            textAlign: 'left',

          }}>
            <p>Merry Christmas Keena,</p> 
            From strangers to intimate souls we have become, am very thankful to have met someone as amazing as you, and to be able to call them much more than a friend (foreshadowing).
            Sometimes you forget how amazing you are, so let me remind you of the great style you have, a big heart, and smart mind, that I enjoy bantering with about our major,
            we love CS, and 
            from the day I met you, I had a feeling there was something special about you, I guess today finally I found out
            <br />
            <p>With my whole heart's love,</p>
            <p>Juan :)</p>
          </div>
        </div>
      </div>
    </div>
  );
}


function Notes(){}  // notes i've taken when learning something, handwritten or digital, notion or something


function Resume() {
  return (
    <>
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        gap: '30px',
        background: 'transparent',
      }}
    >
      <embed src={resume} width="691" height="873">

      </embed>
    </div>
    </>
  )
}

function Experience() {
  const navi = useNavigate();
  const handleExperienceClick = () => {
    navi('/employment');  
  };

  return(
    <>
    <h2 className='feat-proj-text'>
      Employment:
    </h2>
    <div className='company-block'
      onClick={handleExperienceClick}
      style={{cursor: 'pointer'}}
    >
      <div className='company-header'>
        <img src={bedarraLogo} alt="Bedarra Corporation" className='company-logo' />
        <div>
          <h3>Bedarra Corporation</h3>
          <p className='company-tagline'>Ottawa, Ontario • May 2024 - Aug 2025</p>
        </div>
      </div>

      <div className='roles-timeline'>
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

        <div className='role'>
          <div className='role-header'>
            <h4>Part-Time Full-Stack Intern</h4>
            <span className='date'>Sep 2024 - Apr 2025</span>
          </div>
          <p className='role-summary'>
            Built a secure database architecture, and optimized 
            email downloads by 30% using a WASI-compiled Rust binary. Implemented a 
            search engine for email data.
          </p>
        </div>

        <div className='role'>
          <div className='role-header'>
            <h4>Full-Stack Intern</h4>
            <span className='date'>May 2024 - Aug 2024</span>
          </div>
          <p className='role-summary'>
            Researched Doug Engelbart's computer science papers (even consulted with The
            Stanford Reasearch Institute lab), then built apps with Rust and Flutter. Compiled Rust to WebAssembly 
            for high-performance web apps. Created a P2P file sync system that works 
            across iOS, Android, Windows, Linux, and macOS.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

function Sidebar({  toggleSidebar, activeRoute }) {
  const sidebarClasses = `sidebar  open`;
  const toPath = (name) => {
    if (name === 'Home') return '/';
    return `/${name.toLowerCase().replace(/\s/g, '-')}`;
  }

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
          <h3>Juan Marulanda</h3>
          <div className='social-links'>
            <a
              href="https://github.com/Juan-789" 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub"
              className='social-item'
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/juan-marulanda-delosrios/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Linkedin"
              className='social-item'
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:your.email@example.com" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Email"
              className='social-item email-display'
            >
              <EmailIcon />
            </a>
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
            {/* <NavLink name="Reading" />
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
            </ul> */}
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
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#e0e0e0'}}>
                Rambo Roomba
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
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
            <Typography gutterBottom variant="h5" component="div"  sx={{color: '#e0e0e0'}}>
              Pet Prompt
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
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
            <Typography gutterBottom variant="h5" component="div"  sx={{color: '#e0e0e0'}}>
              Med Rot
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
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
