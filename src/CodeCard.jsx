import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './CodeCard.css'

/*
  Same shape as the image-backed project cards, but the media slot is a
  monospace panel instead of a photo. Used for the systems projects that
  don't have anything worth screenshotting.
*/
export default function CodeCard({ title, description, tags, href }) {
  return (
    <div className='featured-i'>
      <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
        <CardActionArea
          href={href}
          target='_blank'
          rel="noopener noreferrer"
        >
          <div className='code-media'>
            <div className='code-media-bar'>
              <i /><i /><i />
            </div>
            <div className='code-media-tags'>
              {tags.map((tag) => (
                <span className='code-media-tag' key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <CardContent className='glass-card-content'>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e0e0e0' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
