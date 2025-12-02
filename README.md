# FoodieHub - Restaurant Website

A modern, responsive restaurant website built with HTML, CSS, JavaScript, and Bootstrap. Features include user authentication, shopping cart, order tracking, and reservation system.

## 🍽️ Features

### Core Functionality
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication** - Login/Register system with local storage
- **Shopping Cart** - Add items, adjust quantities, and proceed to checkout
- **Order Tracking** - Real-time order progress with animated status updates
- **Table Reservations** - Book a table with form validation
- **Menu Categories** - Organized menu with tabs (Popular, Breakfast, Lunch, Dinner, Drinks, Desserts)

### Interactive Elements
- **Hero Carousel** - Video background with rotating food images
- **Gallery Lightbox** - Click to view high-resolution food images
- **3D Card Effects** - Hover animations on menu cards
- **Smooth Scrolling** - Navigation between sections
- **Scroll Animations** - Elements reveal as you scroll down

### User Experience
- **Auto-fill Forms** - User details automatically populate in reservation and checkout forms
- **Real-time Updates** - UI updates immediately after login/logout without page refresh
- **Order Progress** - Visual progress bar with cooking and delivery timers
- **Form Validation** - Client-side validation for all forms
- **Mobile-First** - Optimized for mobile devices with collapsible navigation

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. That's it! The website is ready to use

### File Structure
```
FoodieHub/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom CSS styles
├── js/
│   └── script.js       # JavaScript functionality
├── img/                # Images and media files
│   ├── Restaurant-logo.png
│   ├── FoodieHub.mp4
│   └── [various food images]
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Bootstrap 4.6.2** - Responsive framework and components
- **jQuery 3.5.1** - DOM manipulation and event handling
- **Font Awesome 6.5.2** - Icons and visual elements
- **Google Fonts** - Typography (Pacifico, Merriweather)

## 📱 Features Breakdown

### Authentication System
- **Registration** - Create new user accounts with name, email, and password
- **Login** - Secure login with email and password validation
- **Logout** - Secure logout with confirmation
- **Session Management** - Persistent login across browser sessions
- **Multi-user Support** - Multiple users can register and use the system

### Shopping Cart
- **Add Items** - Click "Add to Cart" on any menu item
- **Quantity Control** - Increase/decrease item quantities
- **Remove Items** - Delete items from cart
- **Real-time Total** - Dynamic price calculation
- **Cart Persistence** - Cart contents saved in browser storage

### Order System
- **Checkout Process** - Complete order form with delivery details
- **Payment Options** - Cash on Delivery or Credit/Debit Card
- **Order Confirmation** - Visual confirmation with progress tracking
- **Order Tracking** - Real-time status updates:
  - Order Received (10 seconds)
  - Cooking (15 minutes)
  - Delivery (15 minutes)
  - Delivered

### Reservation System
- **Table Booking** - Reserve tables with date, time, and guest count
- **Form Validation** - Required field validation
- **Auto-fill** - User details automatically populated
- **Confirmation** - Success message after booking

## 🎨 Design Features

### Visual Elements
- **Video Background** - Engaging hero section with food video
- **Image Carousels** - Rotating food images and offers
- **Hover Effects** - Interactive menu cards with 3D tilt
- **Smooth Animations** - CSS transitions and keyframe animations
- **Responsive Images** - Optimized for different screen sizes

### Color Scheme
- Primary: Bootstrap blue (#007bff)
- Success: Green (#28a745)
- Warning: Orange (#ffc107)
- Dark: Charcoal (#343a40)
- Light: Off-white (#f8f9fa)

## 📋 Usage Instructions

### For Customers
1. **Browse Menu** - Click on menu categories to explore different food options
2. **Add to Cart** - Click "Add to Cart" on desired items
3. **View Cart** - Click the cart icon to review your order
4. **Checkout** - Click "Proceed to Checkout" to place your order
5. **Register/Login** - Create an account or login to place orders
6. **Reserve Table** - Use the reservation form to book a table

### For Developers
1. **Customize Menu** - Edit menu items in the HTML file
2. **Modify Styles** - Update CSS in `styles.css`
3. **Add Features** - Extend functionality in `script.js`
4. **Update Images** - Replace images in the `img/` folder

## 🔧 Customization

### Adding New Menu Items
1. Open `index.html`
2. Find the menu section
3. Add new menu cards following the existing pattern:
```html
<div class="col-md-6 col-lg-4 mb-4" data-reveal>
    <div class="card menu-card h-100 shadow-sm menu-hover">
        <img class="card-img-top" src="img/your-image.jpg" alt="Item Name" />
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">Item Name</h5>
            <p class="card-text text-muted">Item description.</p>
            <div class="d-flex align-items-center justify-content-between mt-auto">
                <span class="price">Rs. 999</span>
                <button class="btn btn-primary add-to-cart" data-item="Item Name" data-price="999">Add to Cart</button>
            </div>
        </div>
    </div>
</div>
```

### Modifying Order Times
1. Open `js/script.js`
2. Find the `showConfirm()` function
3. Adjust the timeout values:
```javascript
setTimeout(() => {
    // Change 15 * 60 to desired cooking time in seconds
    startCooking(15 * 60, statusEl, timerEl, steps, progress, emojiEl);
}, 10000);
```

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Responsive navigation with collapsible menu
- Touch-friendly buttons and forms
- Optimized image sizes for mobile
- Swipe gestures for carousels
- Mobile-first CSS approach

## 🔒 Security Notes

- All user data is stored locally in browser storage
- No server-side validation (client-side only)
- Passwords are stored in plain text (not recommended for production)
- For production use, implement proper server-side authentication

## 🚀 Future Enhancements

- Server-side integration for real orders
- Payment gateway integration
- Email notifications
- Admin dashboard
- Database integration
- User profiles and order history
- Real-time chat support
- Multi-language support

## 📞 Support

For questions or support regarding this website:
- Email: info@foodiehub.com
- Phone: +92 332 3230869
- Address: Station Road, Larkana

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**FoodieHub** - Delicious food delivered fast! 🍕🍔🍰