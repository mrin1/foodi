import React from 'react';
import { 
  Box, Container, Grid, Typography, TextField, 
  Button, Stack, CardMedia, InputAdornment 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Reservation: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#0D0D0D", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mb: 2 }}>
            Online Reservation
          </Typography>
          <Typography variant="body2" sx={{ color: '#828282', maxWidth: '600px', mx: 'auto', lineHeight: 1.8 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, turpis aliquet at ac eu donec ut.
          </Typography>
        </Box>

        <Grid container spacing={8} alignItems="flex-start" justifyContent="center">
          <Grid   size={{xs:12, md:5}}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Grid  size={{xs:6}} key={i}>
                  <Box sx={{ borderRadius: '20px', overflow: 'hidden', height: '200px' }}>
                    <CardMedia 
                      component="img" 
                      image={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?sig=${i}`} 
                      sx={{ height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid  size={{xs:12, md:7}}>
            <Stack spacing={3}>
              {[
                { label: "Your Name", icon: <PersonIcon />, placeholder: "Enter your name" },
                { label: "Email", icon: <EmailIcon />, placeholder: "Enter your email" },
                { label: "Phone Number", icon: <PhoneIcon />, placeholder: "Enter phone number" },
                { label: "Person", icon: <GroupsIcon />, placeholder: "How many people?" }
              ].map((field, index) => (
                <Box key={index}>
                  <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>{field.label} :</Typography>
                  <TextField 
                    fullWidth 
                    placeholder={field.placeholder}
                    InputProps={{ 
                      startAdornment: (
                        <InputAdornment position="start">
                           {React.cloneElement(field.icon as React.ReactElement<any>, { sx: { color: '#828282', fontSize: 20 } })}
                        </InputAdornment>
                      ) 
                    }}
                    sx={{ 
                      bgcolor: '#1a242b', 
                      borderRadius: '8px', 
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      input: { color: 'white' }
                    }}
                  />
                </Box>
              ))}

              <Stack direction="row" spacing={2}>
                <Box flex={1}>
                  <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>Date :</Typography>
                  <TextField 
                    fullWidth 
                    placeholder="Select date"
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><CalendarMonthIcon sx={{ color: '#828282', fontSize: 20 }} /></InputAdornment> 
                    }}
                    sx={{ bgcolor: '#1a242b', borderRadius: '8px', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }}}
                  />
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>Time :</Typography>
                  <TextField 
                    fullWidth 
                    placeholder="Select time"
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><AccessTimeIcon sx={{ color: '#828282', fontSize: 20 }} /></InputAdornment> 
                    }}
                    sx={{ bgcolor: '#1a242b', borderRadius: '8px', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }}}
                  />
                </Box>
              </Stack>

              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#E48C46', width: 'fit-content', px: 5, py: 1.8, 
                  borderRadius: '12px', fontWeight: 'bold', mt: 2,
                  '&:hover': { bgcolor: '#d17b38' }
                }}
              >
                BOOK A TABLE
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Reservation;