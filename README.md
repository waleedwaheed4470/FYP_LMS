# LMS - Learning Management System

A professional Flask-based Learning Management System with user authentication, featuring a beautiful splash screen, sign-in, and sign-up pages.

## Features

- ✨ **Modern UI/UX Design** - Professional, responsive design with gradient backgrounds and smooth animations
- 🔐 **User Authentication** - Complete sign-up, sign-in, and logout functionality
- 🎓 **Splash Screen** - Engaging landing page with feature highlights
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Secure Password Hashing** - Uses Werkzeug for secure password storage
- 💾 **SQLite Database** - Easy-to-use database with SQLAlchemy ORM
- 🎨 **Beautiful Flash Messages** - Animated success, error, and info notifications
- 📊 **Dashboard** - User dashboard with stats and course displays

## Installation

1. **Navigate to the project directory:**
   ```powershell
   cd "c:\Users\Waleed Waheed\Desktop\flask_prokects\flask3_login"
   ```

2. **Create a virtual environment (recommended):**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask application:**
   ```powershell
   python app.py
   ```

2. **Open your browser and visit:**
   ```
   http://127.0.0.1:5000
   ```

## Application Flow

1. **Splash Screen** (`/`) - Landing page with features and call-to-action buttons
2. **Sign Up** (`/signup`) - New users can create an account
3. **Sign In** (`/signin`) - Existing users can log in (includes "Create Account" button for new users)
4. **Dashboard** (`/dashboard`) - User dashboard after successful login
5. **Logout** (`/logout`) - Secure logout functionality

## Project Structure

```
flask3_login/
│
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── lms.db                      # SQLite database (created automatically)
│
├── templates/
│   ├── base.html              # Base template with common elements
│   ├── splash.html            # Splash/landing page
│   ├── signin.html            # Sign-in page
│   ├── signup.html            # Sign-up page
│   └── dashboard.html         # User dashboard
│
└── static/
    ├── css/
    │   └── style.css          # Professional styling
    └── js/
        └── script.js          # JavaScript functionality
```

## Features Breakdown

### Splash Screen
- Eye-catching hero section with animated logo
- Feature highlights (Interactive Courses, Expert Instructors, Certifications)
- Quick access buttons to Sign In and Sign Up
- Animated floating shapes background

### Sign In Page
- Email and password authentication
- "Remember me" checkbox
- Forgot password link (placeholder)
- **"Create Account" button for users without an account**
- Link back to home page

### Sign Up Page
- Full name, username, email, and password fields
- Password confirmation
- Terms & conditions checkbox
- **"Sign In" button for existing users**
- Link back to home page

### Dashboard
- Welcome message with user's name
- Statistics cards (Enrolled Courses, Completed Courses, Certificates, Learning Time)
- Popular courses display
- Logout functionality

## Security Features

- Password hashing using Werkzeug
- Flask-Login for session management
- CSRF protection (can be enhanced with Flask-WTF)
- Login required decorator for protected routes

## Customization

### Change Secret Key
In `app.py`, update the SECRET_KEY:
```python
app.config['SECRET_KEY'] = 'your-strong-secret-key-here'
```

### Modify Colors
In `static/css/style.css`, update the CSS variables:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* Add your custom colors */
}
```

## Database Schema

### User Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `password_hash` - Hashed password
- `full_name` - User's full name
- `created_at` - Account creation timestamp

## Technologies Used

- **Flask** - Web framework
- **Flask-SQLAlchemy** - Database ORM
- **Flask-Login** - User session management
- **SQLite** - Database
- **HTML5/CSS3** - Frontend markup and styling
- **JavaScript** - Client-side interactivity
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font

## Future Enhancements

- [ ] Course management system
- [ ] Video upload and streaming
- [ ] Assignment submission
- [ ] Quiz and assessment system
- [ ] Student progress tracking
- [ ] Instructor dashboard
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media authentication
- [ ] Payment integration

## Troubleshooting

### Issue: Module not found
**Solution:** Make sure all dependencies are installed:
```powershell
pip install -r requirements.txt
```

### Issue: Database not created
**Solution:** The database is created automatically when you run the app. If issues persist, delete `lms.db` and restart the application.

### Issue: Port already in use
**Solution:** Change the port in `app.py`:
```python
app.run(debug=True, port=5001)
```

## License

This project is open-source and available for educational purposes.

## Author

Created with ❤️ for learning and development

---

**Note:** Remember to change the SECRET_KEY before deploying to production!
# FYP_LMS
