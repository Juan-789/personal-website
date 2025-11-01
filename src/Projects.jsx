import './Projects.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
// import roomba from '/roomba.jpg'
import roomba from '/roomba_vid.mp4'

import petPrompt from '/pet_prompt.png'
import medRot from '/demoing_medrot.JPG'
import vsc_wrapped from '/vsc_wrapped.mp4'
import ford_ev from '/mapbox_ford.jpg'
import foodbank from '/yufeng_orange.jpg'



export default function Projects(){
    return (
    <div>
    <div className='projects-row'>
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
              component="video"
            //   height="200"
              width="200"
              src={roomba}
              alt="Roomba"
              autoPlay
              loop
              muted
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
    </div>
    <div className='projects-row'>
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
              component="video"
              height="185"
              src={vsc_wrapped}
              alt="Me demoing it"
              autoPlay
              loop
              muted
            />
            <CardContent className='glass-card-content'>
              <Typography gutterBottom variant="h5" component="div">
                VSC-Wrapped
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A VSCode wrapped that shows you statistics of how you performed.
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
          href='https://devpost.com/software/ford-ev-companion-app'
          target='_blank'
          rel="noopener noreferrer"
        >
          <CardMedia
            component="img"
            height="140"
            image={ford_ev}
            alt="Ford EV Companion App"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Ford EV Infotainment
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The route from current location to destination with charging stations along the way,
            search engine and suggestions for the driver's/car's needs along the way
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
          href='https://devpost.com/software/foodbank-ai'
          target='_blank'
          rel="noopener noreferrer"  
        >
          <CardMedia
            component="img"
            height="140"
            image={foodbank}
            alt="Med Rot"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              FoodBank AI
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                computer vision to recognize all sorts of foods that can be donated
                to a food bank and will give you a score based on how non-perishable
                and nutritious it is
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
      </div>
    </div>
</div>
    );
}