# Frontend Documentation

## Getting Started

### Installation
```bash
cd frontend
npm install
npm start
```

The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Testing
```bash
npm test
npm run test:watch
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ProtectedRoute.tsx
│   ├── TenderList.tsx
│   ├── VendorForm.tsx
│   ├── DocumentUpload.tsx
│   └── ...
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── TenderDetail.tsx
│   ├── VendorProfile.tsx
│   └── ...
├── services/           # API service calls
│   └── api.ts
├── store/             # Redux store setup
│   └── index.ts
├── slices/            # Redux slices (state management)
│   ├── authSlice.ts
│   ├── tenderSlice.ts
│   ├── vendorSlice.ts
│   └── submissionSlice.ts
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── styles/            # Global styles

public/
└── index.html         # HTML template
```

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **Material-UI**: Component library
- **React Router**: Navigation
- **Axios**: HTTP client
- **Socket.io**: Real-time updates
- **Formik & Yup**: Form management
- **Recharts**: Data visualization

## Key Features

### Authentication
- User login/registration
- JWT token management
- Protected routes
- Role-based access control

### Tender Management
- List and search tenders
- View tender details
- Create and edit tenders (Admin)
- Publish/close tenders

### Vendor Management
- Vendor registration
- Profile management
- Vendor approval workflow
- Performance ratings

### Submissions
- Submit bids
- Track submission status
- View evaluation feedback
- Document requirements

### Document Management
- Upload required documents
- Automatic verification status
- Download documents
- Document validation feedback

### Analytics
- Dashboard with statistics
- Tender performance charts
- Vendor ratings
- Contract analytics

## Redux Store

### Auth Slice
```typescript
state = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}
```

### Tender Slice
```typescript
state = {
  tenders: [],
  currentTender: null,
  loading: false,
  error: null
}
```

### Vendor Slice
```typescript
state = {
  vendors: [],
  currentVendor: null,
  loading: false,
  error: null
}
```

## API Integration

All API calls are centralized in `services/api.ts`:

```typescript
// Example usage
import { tenderService } from './services/api';

const fetchTenders = async () => {
  try {
    const response = await tenderService.getAll();
    dispatch(setTenders(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
```

## Material-UI Theming

The application uses Material-UI with a custom theme:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});
```

Customize colors in `index.tsx`

## Component Examples

### Protected Route
```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### API Calls
```typescript
import { useDispatch } from 'react-redux';
import { tenderService } from '../services/api';

function TenderList() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    tenderService.getAll()
      .then(res => dispatch(setTenders(res.data)))
      .catch(err => dispatch(setError(err.message)));
  }, []);
}
```

## Real-time Updates

Socket.io is configured for real-time notifications:

```typescript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: { token: localStorage.getItem('token') }
});

socket.on('submission-received', (data) => {
  console.log('New submission:', data);
});
```

## Form Handling

Using Formik + Yup for forms:

```typescript
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={(values) => handleSubmit(values)}
>
  {/* Form fields */}
</Formik>
```

## Environment Variables

Create `.env` file in frontend directory:
```
REACT_APP_API_URL=http://localhost:3000/api
```

## Build Configuration

The application is configured with:
- TypeScript compilation
- ESLint for code quality
- Prettier for code formatting
- Jest for testing

## Performance Optimization

- Code splitting with React.lazy()
- Lazy loading images
- Memoization of components
- Redux selectors for efficient re-renders
- CDN for static assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Check if backend is running on port 3000
- Verify `REACT_APP_API_URL` in `.env`
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage
- Check token expiration in browser dev tools
- Verify JWT secret matches backend

### Build Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear cache: `npm cache clean --force`

## Deployment

### Build for Production
```bash
npm run build
```

Output will be in `build/` directory

### Docker
```bash
docker build -t tender-frontend .
docker run -p 3001:80 tender-frontend
```

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for more details.

## Resources

- [React Documentation](https://react.dev)
- [Material-UI Docs](https://mui.com)
- [Redux Documentation](https://redux.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
