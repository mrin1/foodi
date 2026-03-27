import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  styled 
} from '@mui/material';
import AboutImg from '../../assets/images/home/about-img.png';
import { useNavigate } from 'react-router-dom';


const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#0a0d0f', 
  padding: theme.spacing(12, 0),
  color: '#ffffff',
  fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 2),
  },
}));

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
});

const SectionLabel = styled(Typography)({
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.1rem',
  marginBottom: '4px',
  color: '#ffffff',
});

const AccentLine = styled(Box)({
  width: '35px',
  height: '2px',
  backgroundColor: '#d98c52', 
  marginBottom: '32px',
});

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2.75rem',
  fontWeight: 800,
  lineHeight: 1.1,
  marginBottom: '24px',
  maxWidth: '450px',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

const DescriptionText = styled(Typography)({
  fontSize: '1rem',
  lineHeight: 1.6,
  color: '#a1a1a1', 
  marginBottom: '40px',
  maxWidth: '420px',
});

const ActionButton = styled(Button)({
  backgroundColor: '#d98c52',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  width: 'fit-content',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#c47b45',
    boxShadow: 'none',
  },
});

const ImageWrapper = styled(Box)({
  width: '100%',
  borderRadius: '20px', 
  overflow: 'hidden',
  display: 'flex',
  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
  },
});


const CoffeeAboutSection: React.FC = () => {
   const navigate = useNavigate()
  return (
    <SectionWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          
          <Grid size={{xs:12, md:5 }}>
            <ContentBox>
              <SectionLabel variant="overline">
                ABOUT US
              </SectionLabel>
              <AccentLine />
              
              <MainHeading variant="h2">
                We Invite You to Visit Our Coffee House
              </MainHeading>
              
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur. Dolor elit vitae 
                nunc varius. Facilisis eget cras sit semper sit enim. Turpis 
                aliquet at ac eu donec ut. Sagittis vestibulum at quis non 
                massa netus.
              </DescriptionText>
              
              <ActionButton variant="contained" onClick={()=> navigate("/about")}>
                Read More
              </ActionButton>
            </ContentBox>
          </Grid>

          <Grid size={{ xs:12, md:7  }}>
            <ImageWrapper>
              <img 
                src= {AboutImg}
                alt="Our Kitchen" 
              />
            </ImageWrapper>
          </Grid>

        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default CoffeeAboutSection;