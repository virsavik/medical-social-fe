import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/configs/store';
import { getDegreeDoctor } from './make-appointment.reducer';
import { Modal, Box, Typography, LinearProgress, Button } from '@mui/material';
import Zoom from 'react-img-zoom';

export default function ReviewDegreeDialog() {
  const { doctorId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [degreeUrl, setDegreeUrl] = useState('');

  useEffect(() => {
    dispatch(getDegreeDoctor(doctorId)).then(res => setDegreeUrl(res.payload.data));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Booking Modal"
      aria-describedby="doctor-booking-modal"
    >
      <Box
        sx={{
          top: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        {degreeUrl && degreeUrl !== '' ? (
          <Zoom
            img={'http://localhost:8080/files/' + degreeUrl}
            zoomScale={3}
            width={600}
            height={600}
            loading="lazy"
          />
        ) : (
          <LinearProgress />
        )}
        <Button type="button" fullWidth onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
