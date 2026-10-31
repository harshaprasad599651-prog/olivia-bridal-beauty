# Olivia Bridal & Beauty

A full-stack bridal and beauty salon appointment management system. The
application provides a customer-facing website and booking experience,
together with an administrative area for managing salon services,
packages, customers, and appointments.

> **Project status:** Core customer, admin, and booking functionality
> has been developed. Before using the system in production, complete
> the testing and security checklist near the end of this document.

## Features

### Customer-facing features

-   Responsive interface designed for desktop and mobile devices.
-   Customer registration and login.
-   JWT-based customer authentication.
-   Browse salon services and packages.
-   Select services and submit appointment bookings.
-   View personal bookings through the **My Bookings** area.
-   Appointment availability API that returns available start times for
    a selected date and appointment duration.
-   Server-side validation to reject bookings that overlap existing
    non-cancelled appointments.

### Administration features

-   Admin login with password verification using bcrypt.
-   JWT-based admin authentication.
-   Admin dashboard with customer, service, package, booking, and
    pending-booking counts.
-   Create, view, update, and delete salon services.
-   Create, view, update, and delete packages.
-   View customer records.
-   View bookings with customer, service, and package details.
-   Update booking status and remove bookings.

### Appointment rules currently implemented

-   Salon operating hours: **9:00 AM--5:00 PM**.
-   Salon is open **every day**.
-   Availability slots are generated at **30-minute intervals**.
-   Appointment duration is used when checking whether a slot fits
    within operating hours and conflicts with existing bookings.
-   Cancelled bookings do not block availability.
-   The server checks for overlapping appointments when a booking is
    submitted.

**Important concurrency limitation:** The current overlap check is a
read-then-create operation. Two requests arriving at almost exactly the
same time could both pass the check. A database-level
reservation/locking mechanism is still required for a strong guarantee
against simultaneous double-booking.

## Technology stack

  Area                     Technology
  ------------------------ -----------------------
  Frontend                 React
  Development/build tool   Vite
  Styling                  Tailwind CSS
  Routing                  React Router
  Backend                  Node.js, Express
  Database                 MongoDB
  ODM                      Mongoose
  Authentication           JSON Web Tokens (JWT)
  Password hashing         bcrypt
  Cross-origin support     CORS

## Project structure

The project is organized into separate frontend and backend
applications:

``` text
olivia-bridal-beauty/
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Booking.js
│   │   ├── Customer.js
│   │   ├── Package.js
│   │   └── Service.js
│   ├── server.js
│   └── .env                 # Create locally; do not commit
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── vite.config.js
│   └── ...
│
├── .gitignore
└── README.md
```

Your actual repository may contain additional components, pages,
configuration files, and assets.

## Prerequisites

Install the following before running the project locally:

-   Node.js and npm.
-   MongoDB Atlas account or another accessible MongoDB deployment.
-   Git (optional, for cloning and version control).

Docker is **not required** for the local development workflow described
below.

## Local installation and setup

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd olivia-bridal-beauty
```

Replace the placeholder with the URL of your GitHub repository.

### 2. Configure the backend environment

Create a file named `.env` inside the `backend` directory:

``` env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

-   `MONGODB_URI`: MongoDB connection string for the project database.
-   `JWT_SECRET`: A long, random secret used to sign authentication
    tokens.

Do not commit `.env` files or share their contents. Make sure your
`.gitignore` excludes them.

### 3. Install and start the backend

Open a terminal:

``` bash
cd backend
npm install
node server.js
```

The backend listens on:

``` text
http://localhost:5000
```

Keep this terminal running.

### 4. Install and start the frontend

Open a second terminal from the project root:

``` bash
cd frontend
npm install
npm run dev
```

Vite normally serves the frontend at:

``` text
http://localhost:5173
```

Open the URL printed by Vite if it differs.

### 5. Verify the frontend proxy

The local Vite development proxy should forward API requests to the
local backend. The target should be:

``` text
http://localhost:5000
```

For example, the proxy configuration for `/api` should use that target.
Do not use the Docker service hostname `backend` when running both
applications directly on Windows.

## Authentication

The application has separate customer and administrator authentication
flows.

-   Customer login endpoint: `POST /api/login`
-   Admin login endpoint: `POST /api/admin/login`
-   Customer routes use the customer authentication middleware.
-   Admin routes use the admin authentication middleware.
-   The frontend uses separate browser storage keys: `customerToken` and
    `adminToken`.

Passwords are hashed with bcrypt before being stored. JWT secrets must
be kept private.

### Creating an administrator

The backend currently contains an admin setup endpoint:

``` http
POST /api/admin/setup
```

Use it only in a controlled initial setup process. Before production
deployment, protect or disable public admin registration so that an
unauthorised person cannot create an administrator account.

## API overview

The following routes are present in the backend implementation.

### Services

  Method   Endpoint              Purpose
  -------- --------------------- ------------------
  POST     `/api/services`       Create a service
  GET      `/api/services`       List services
  PUT      `/api/services/:id`   Update a service
  DELETE   `/api/services/:id`   Delete a service

### Packages

  Method   Endpoint              Purpose
  -------- --------------------- ------------------
  POST     `/api/packages`       Create a package
  GET      `/api/packages`       List packages
  PUT      `/api/packages/:id`   Update a package
  DELETE   `/api/packages/:id`   Delete a package

### Customer authentication and bookings

  ------------------------------------------------------------------------------
  Method                  Endpoint                       Purpose
  ----------------------- ------------------------------ -----------------------
  POST                    `/api/register`                Register a customer

  POST                    `/api/login`                   Customer login

  POST                    `/api/bookings`                Create an authenticated
                                                         customer booking

  GET                     `/api/bookings/availability`   Check available
                                                         appointment slots

  GET                     `/api/bookings/my`             Get the authenticated
                                                         customer's bookings
  ------------------------------------------------------------------------------

Availability query parameters:

``` text
GET /api/bookings/availability?date=YYYY-MM-DD&duration=60
```

-   `date`: Appointment date in `YYYY-MM-DD` format.
-   `duration`: Appointment duration in minutes.

The response contains the selected date, requested duration, and an
`availableSlots` array. Each slot contains a time in `HH:mm` format.

### Administrator

  Method   Endpoint                           Purpose
  -------- ---------------------------------- ------------------------------------
  POST     `/api/admin/setup`                 Initial admin account setup
  POST     `/api/admin/login`                 Admin login
  GET      `/api/admin/test`                  Test admin authentication
  GET      `/api/admin/dashboard`             Retrieve dashboard counts
  GET      `/api/admin/customers`             List customers
  GET      `/api/admin/bookings`              List bookings with related details
  PUT      `/api/admin/bookings/:id/status`   Update booking status
  DELETE   `/api/admin/bookings/:id`          Remove a booking

Protected routes require the appropriate authentication token. Do not
expose customer or administrator data through public endpoints.

## Booking status values

The booking model supports these statuses:

-   `Pending`
-   `Confirmed`
-   `Completed`
-   `Cancelled`

Cancelled bookings are excluded from the current availability conflict
check.

## Git and GitHub

Typical commands for saving project changes:

``` bash
git status
git add <files-to-commit>
git commit -m "Describe your changes"
git push origin main
```

Before committing, check that secrets, `.env` files, `node_modules`,
downloaded installers/extensions, and project ZIP archives are excluded.

## Testing checklist

Before considering a release, test the following:

### Customer workflow

-   [ ] Register a new customer.
-   [ ] Log in and log out.
-   [ ] Browse services and packages.
-   [ ] Submit a booking with valid details.
-   [ ] Confirm that a customer can see their own bookings.
-   [ ] Confirm that customers cannot access another customer's
    bookings.

### Appointment availability

-   [ ] Check availability for a future date.
-   [ ] Confirm that slots are within 9:00 AM--5:00 PM.
-   [ ] Confirm that a booking blocks overlapping time slots.
-   [ ] Confirm that a cancelled booking no longer blocks its slot.
-   [ ] Confirm that past dates and past times cannot be booked.
-   [ ] Test appointments with different durations.
-   [ ] Test two booking requests submitted at nearly the same time.

### Administrator workflow

-   [ ] Log in as an administrator.
-   [ ] View dashboard counts.
-   [ ] Create, update, and delete services.
-   [ ] Create, update, and delete packages.
-   [ ] View customer records.
-   [ ] View bookings and update their statuses.
-   [ ] Confirm that non-admin users cannot access admin endpoints.

### Responsive interface and deployment

-   [ ] Test on desktop and mobile screen sizes.
-   [ ] Verify all API requests work without Docker.
-   [ ] Verify production environment variables are configured securely.
-   [ ] Test database backup and restore procedures.

## Production readiness and security notes

The project should undergo a security and reliability review before
public deployment:

1.  Add database-level protection against simultaneous overlapping
    bookings.
2.  Protect or disable the public `/api/admin/setup` endpoint after
    initial administrator creation.
3.  Validate all booking fields on the server, including service/package
    IDs, prices, and durations. Do not rely on values supplied by the
    browser for billing.
4.  Restrict CORS to the deployed frontend origin.
5.  Use HTTPS in production.
6.  Keep MongoDB credentials and JWT secrets in the hosting provider's
    secret/environment-variable settings.
7.  Review public routes that return customer or booking information and
    ensure personal data is only available to authorised users.
8.  Configure backups, monitoring, and error logging.
9.  Test the deployed application end to end before accepting real
    customer bookings.

## Contributing

1.  Create a branch for your change.
2.  Make a focused update.
3.  Test the affected frontend and backend workflows.
4.  Commit with a descriptive message.
5.  Push the branch and open a pull request.

## License

No license has been specified for this project. Add a `LICENSE` file if
you intend to distribute or permit reuse of the source code.

------------------------------------------------------------------------

**Olivia Bridal & Beauty** --- Salon website and appointment management
system.
