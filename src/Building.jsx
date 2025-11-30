import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import job from '/j*b.jpg'
import wok from '/wok.gif'
import proj from '/projects.JPG'
import { Margin } from '@mui/icons-material';
import './Building.css'

export default function Building() {
  return (
    <div>
        <h2>Building</h2>
    <div className="building-container">
        <div style={{ margin: '10px'}}>
        <Card sx={{
        maxWidth: 345,
        backgroundColor: 'transparent'
        }}>
        <CardActionArea 
          href='/projects'
          target='_blank'
        >
          <CardMedia
            component="img"
            height="300"
            width="300"
            image={proj} 
            alt="Projects"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Projects
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                All the projects i've built throughout the years. 
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
        </div>
        <div style={{ margin: '10px'}}>
        <Card sx={{
        maxWidth: 345,
        backgroundColor: 'transparent'
        }}>
        <CardActionArea 
          href='/learning'
          target='_blank'
        >
          <CardMedia
            component="img"
            height="300"
            width={300}
            image={wok}
            alt="Learning"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Learning
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Website that calls you to remind you of your meds, with Peter Griffin's voice, and saying brain rotted phrases 
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
        </div>
        <div style={{ margin: '10px'}}>
        <Card sx={{
        maxWidth: 345,
        backgroundColor: 'transparent'
        }}>
        <CardActionArea 
          href='/employment'
          target='_blank'
        >
          <CardMedia
            component="img"
            height="300"
            image={job}
            alt="J*b"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Employment
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Website that calls you to remind you of your meds, with Peter Griffin's voice, and saying brain rotted phrases 
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
        </div>
    </div>
    </div>
  );
}