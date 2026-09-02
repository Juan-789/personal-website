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
          href='/writing'
        >
          <CardMedia
            component="img"
            height="300"
            width={300}
            image={wok}
            alt="Writing"
          />
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div">
              Writing
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Short writeups about things I'm building and trying to understand.
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
              J*b 
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
        </div>
    </div>
    </div>
  );
}
