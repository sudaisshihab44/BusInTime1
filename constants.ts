
import { Child, NotificationItem, Stop, Driver, Parent, Bus, Route, TripStudent } from './types';

export const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    name: 'Adarsh Rao',
    grade: 'Class 5-A',
    school: 'St. Aloysius High School',
    busNumber: 'KA-19-B-101',
    routeNumber: 'RT-FALNIR',
    status: 'in-transit',
    nextPickupTime: '07:45 AM',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adarsh',
    pickupPoint: 'Falnir Road',
  },
  {
    id: '2',
    name: 'Diya Rao',
    grade: 'Class 2-B',
    school: 'St. Aloysius High School',
    busNumber: 'KA-19-B-101',
    routeNumber: 'RT-FALNIR',
    status: 'boarded',
    nextPickupTime: '07:45 AM',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diya',
    pickupPoint: 'Falnir Road',
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Bus Approaching',
    message: 'KA-19-B-101 is 5 minutes away from Falnir pickup point.',
    timestamp: 'Just now',
    type: 'pickup',
    read: false,
  },
  {
    id: '2',
    title: 'Adarsh Boarded',
    message: 'Adarsh has successfully boarded the bus at Kankanady.',
    timestamp: '2 hours ago',
    type: 'pickup',
    read: true,
  },
  {
    id: '3',
    title: 'Reached School',
    message: 'Bus has reached St. Aloysius High School, Kodialbail.',
    timestamp: '08:30 AM',
    type: 'alert',
    read: true,
  },
  {
    id: '4',
    title: 'Rain Alert',
    message: 'Heavy rains in Mangalore. Bus might be delayed by 10 mins.',
    timestamp: 'Yesterday',
    type: 'general',
    read: true,
  }
];

// Mangalore Locations
export const MOCK_STOPS: Stop[] = [
  { id: '101', name: 'Kankanady Bypass', time: '07:30 AM', status: 'passed', lat: 12.8680, lng: 74.8550, studentsCount: 3 },
  { id: '102', name: 'Valencia Circle', time: '07:35 AM', status: 'passed', lat: 12.8650, lng: 74.8500, studentsCount: 2 },
  { id: '103', name: 'Falnir Road', time: '07:45 AM', status: 'current', lat: 12.8710, lng: 74.8460, studentsCount: 4 },
  { id: '104', name: 'Hampankatta Signal', time: '07:55 AM', status: 'upcoming', lat: 12.8730, lng: 74.8420, studentsCount: 1 },
  { id: '105', name: 'St. Aloysius School', time: '08:10 AM', status: 'upcoming', lat: 12.8750, lng: 74.8400, studentsCount: 0 },
];

export const MOCK_ROUTES: Route[] = [
  {
    id: 'r1',
    name: 'Route 1 - Kankanady to Kodialbail',
    stops: MOCK_STOPS
  },
  {
    id: 'r2',
    name: 'Route 2 - Surathkal to Kodialbail',
    stops: [
       { id: '201', name: 'Surathkal NITK', time: '07:00 AM', status: 'upcoming', lat: 13.0108, lng: 74.7943 },
       { id: '202', name: 'Kulai', time: '07:15 AM', status: 'upcoming', lat: 12.9600, lng: 74.8100 },
       { id: '203', name: 'Kottara Chowki', time: '07:40 AM', status: 'upcoming', lat: 12.9000, lng: 74.8300 },
    ]
  }
];

// Admin Data
export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'd1',
    name: 'Manjunath Shetty',
    phone: '+91 98450 12345',
    licenseNumber: 'KA19201000123',
    status: 'active',
    assignedBusId: 'b1',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manju',
  },
  {
    id: 'd2',
    name: 'Rakesh Poojary',
    phone: '+91 99000 54321',
    licenseNumber: 'KA19201200456',
    status: 'active',
    assignedBusId: 'b2',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakesh',
  },
  {
    id: 'd3',
    name: 'Harish Kamath',
    phone: '+91 98800 11223',
    licenseNumber: 'KA19201500789',
    status: 'inactive',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harish',
  }
];

export const MOCK_PARENTS: Parent[] = [
  {
    id: 'p1',
    name: 'Ravi Kumar',
    email: 'ravi.k@example.com',
    phone: '+91 98455 99887',
    childrenIds: ['1', '2'],
    status: 'approved',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi',
  },
  {
    id: 'p2',
    name: 'Priya Shetty',
    email: 'priya.s@example.com',
    phone: '+91 98440 22334',
    childrenIds: [],
    status: 'pending',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: 'p3',
    name: 'Anil Rao',
    email: 'anil.rao@example.com',
    phone: '+91 99887 77665',
    childrenIds: [],
    status: 'approved',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil',
  }
];

export const MOCK_BUSES: Bus[] = [
  {
    id: 'b1',
    registrationNumber: 'KA-19-B-101',
    capacity: 40,
    routeId: 'r1',
    driverId: 'd1',
    status: 'active',
  },
  {
    id: 'b2',
    registrationNumber: 'KA-19-C-205',
    capacity: 35,
    routeId: 'r2',
    driverId: 'd2',
    status: 'active',
  },
  {
    id: 'b3',
    registrationNumber: 'KA-19-A-999',
    capacity: 20,
    routeId: '',
    status: 'maintenance',
  }
];

// Driver App Specific Data
export const MOCK_TRIP_STUDENTS: TripStudent[] = [
    { id: '1', name: 'Adarsh Rao', stopId: '103', stopName: 'Falnir Road', status: 'pending', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adarsh', grade: '5-A' },
    { id: '2', name: 'Diya Rao', stopId: '103', stopName: 'Falnir Road', status: 'pending', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diya', grade: '2-B' },
    { id: '3', name: 'Rohan Naik', stopId: '101', stopName: 'Kankanady Bypass', status: 'boarded', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan', grade: '4-C' },
    { id: '4', name: 'Sanvi Hegde', stopId: '102', stopName: 'Valencia Circle', status: 'boarded', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanvi', grade: '6-A' },
    { id: '5', name: 'Karthik Shenoy', stopId: '103', stopName: 'Falnir Road', status: 'absent', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik', grade: '5-B' },
];
