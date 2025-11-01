import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function Building() {
  return (
    <div className="building-container">
        <h2>Building</h2>
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
            // image={medRot} ///////
            alt="Med Rot"
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
            // image={medRot}
            alt="Med Rot"
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
            // image={medRot}
            alt="Med Rot"
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
  );
}