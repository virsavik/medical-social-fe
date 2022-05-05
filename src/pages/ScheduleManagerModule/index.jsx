import React from 'react';

const ScheduleManager = React.lazy(() => import('./ScheduleManager'));
const ConfirmDialog = React.lazy(() => import('./ConfirmDialog'));
const DeleteDialog = React.lazy(() => import('./DeleteDialog'));
const ReviewMedicalRecordDialog = React.lazy(() => import('./ReviewMedicalRecordDialog'));

export const router = [
  {
    path: '/schedule-manager',
    element: <ScheduleManager />,
  },
];

export const modalRouter = [
  {
    path: '/schedule-manager/confirm/:scheduleId',
    element: <ConfirmDialog />,
  },
  {
    path: '/schedule-manager/delete/:scheduleId',
    element: <DeleteDialog />,
  },
  {
    path: '/schedule-manager/review-medical-record/:patientId',
    element: <ReviewMedicalRecordDialog />,
  },
];
