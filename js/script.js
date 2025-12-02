$(function () {
    // Year in footer
    $('#year').text(new Date().getFullYear());

    // Cart functionality
    var cart = [];
    var cartTotal = 0;

    // Open cart panel
    $('a[href="#cart"]').on('click', function(e) {
        e.preventDefault();
        openCart();
    });

    // Close cart panel
    $('#closeCart, #cartOverlay').on('click', function() {
        closeCart();
    });

    // Close cart with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#cartPanel').hasClass('open')) {
            closeCart();
        }
    });

    function openCart() {
        $('#cartPanel').addClass('open');
        $('#cartOverlay').addClass('active');
        $('body').addClass('cart-open');
    }

    function closeCart() {
        $('#cartPanel').removeClass('open');
        $('#cartOverlay').removeClass('active');
        $('body').removeClass('cart-open');
    }

    function openCheckout() {
        // reflect total
        $('#checkoutTotal').text($('#cartTotal').text());
        var user = getCurrentUser();
        if (user) {
            $('#coName').val(user.name);
        } else {
            $('#coName').val('');
        }
        $('#checkoutPanel').addClass('open');
        $('#cartPanel').removeClass('open');
        $('#cartOverlay').addClass('active');
        $('body').addClass('cart-open');
    }

    function closeCheckout() {
        $('#checkoutPanel').removeClass('open');
        $('#cartOverlay').removeClass('active');
        $('body').removeClass('cart-open');
    }

    // Add to cart functionality
    $('.add-to-cart').on('click', function () {
        var $btn = $(this);
        var itemName = $btn.data('item');
        var itemPrice = parseFloat($btn.data('price'));
        var itemImg = $btn.closest('.menu-card').find('.card-img-top').attr('src');
        
        addToCart(itemName, itemPrice, itemImg);
        
        // Visual feedback
        $btn.addClass('btn-success').text('Added');
        setTimeout(function () { 
            $btn.removeClass('btn-success').text('Add to Cart'); 
        }, 1200);
    });

    function addToCart(name, price, image) {
        var existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        updateCartCount();
    }

    function updateCartCount() {
        var totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('#cart-count').text(totalItems);
    }

    function updateCartDisplay() {
        var $cartItems = $('#cartItems');
        var $emptyCart = $('#emptyCart');
        
        if (cart.length === 0) {
            $cartItems.empty();
            $emptyCart.show();
            $('#cartTotal').text('Rs. 0.00');
            $('#checkoutBtn').prop('disabled', true);
            return;
        }
        
        $emptyCart.hide();
        $cartItems.empty();
        
        cartTotal = 0;
        
        cart.forEach(function(item, index) {
            cartTotal += item.price * item.quantity;
            
            var cartItemHtml = `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">Rs. ${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)"><i class="fa-solid fa-minus" style="color: black;"></i></button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)"><i class="fa-solid fa-plus" style="color: black;"></i></button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            $cartItems.append(cartItemHtml);
        });
        
        $('#cartTotal').text('Rs. ' + cartTotal.toFixed(2));
        $('#checkoutBtn').prop('disabled', false);
    }

    // Global functions for cart operations
    window.changeQuantity = function(index, change) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        updateCartDisplay();
        updateCartCount();
    };

    window.removeItem = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
        updateCartCount();
    };

    // Proceed to checkout opens checkout panel
    $('#checkoutBtn').on('click', function() {
        if (cart.length > 0) {
            openCheckout();
        }
    });

    // Back and close controls on checkout
    $('#backToCart').on('click', function(){
        $('#checkoutPanel').removeClass('open');
        openCart();
    });
    $('#closeCheckout').on('click', function(){
        closeCheckout();
    });

    // Close checkout with Escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#checkoutPanel').hasClass('open')) {
            closeCheckout();
        }
    });

    // Overlay click closes whichever is open
    $('#cartOverlay').on('click', function(){
        if ($('#checkoutPanel').hasClass('open')) closeCheckout();
        if ($('#cartPanel').hasClass('open')) closeCart();
    });

    // Toggle card fields visibility
    $('input[name="paymentMethod"]').on('change', function(){
        if ($('#payCard').is(':checked')) {
            $('#cardDetails').removeClass('d-none');
            $('#coCardNumber, #coCardExpiry, #coCardCvv').attr('required', true);
        } else {
            $('#cardDetails').addClass('d-none');
            $('#coCardNumber, #coCardExpiry, #coCardCvv').removeAttr('required');
        }
    });

    // Checkout submit
    $('#placeOrderBtn').on('click', function(){
        // Require login before placing order
        if (!getCurrentUser()) {
            alert('You must be logged in to place an order.');
            return;
        }
        var $form = $('#checkoutForm');
        var valid = true;
        $form.find('[required]').each(function(){
            if (!$(this).val()) { $(this).addClass('is-invalid'); valid = false; }
            else { $(this).removeClass('is-invalid'); }
        });
        if (!valid) return;

        // Popup confirmation
        alert('Your order has been placed');
        // Show order progress popup
        showConfirm();

        // Clear cart
        cart = [];
        updateCartDisplay();
        updateCartCount();

        // Reset checkout form and UI
        if ($form.length && $form[0]) { $form[0].reset(); }
        $form.find('.is-invalid').removeClass('is-invalid');
        $('#cardDetails').addClass('d-none');
        $('#coCardNumber, #coCardExpiry, #coCardCvv').removeAttr('required');
        $('#checkoutTotal').text('Rs. 0.00');

        // Close checkout panel
        closeCheckout();
    });

    // Close cart when navigating to the menu via "Browse Menu" or any #menu link
    $('a[href="#menu"]').on('click', function() {
        if ($('#cartPanel').hasClass('open')) {
            closeCart();
        }
    });

    // Smooth scroll for section links (avoid hijacking Bootstrap tabs, modals, carousels)
    $('a[href^="#"]')
        .not('[data-toggle], [data-target], [role="tab"], [data-slide], [data-ride], [href="#cart"]')
        .on('click', function (e) {
            var href = $(this).attr('href');
            if (href === '#' || href === '#!') return; // ignore empty anchors
            var targetId = href.slice(1);
            if (!targetId) return;
            var $target = $('#' + targetId);
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: $target.offset().top - 70 }, 500);
                // collapse navbar on mobile after click
                $('.navbar-collapse').collapse('hide');
            }
        });

    // Reveal on scroll
    var $reveal = $('[data-reveal]');
    function onScroll() {
        var trigger = $(window).height() * 0.9;
        $reveal.each(function () {
            var rectTop = this.getBoundingClientRect().top;
            if (rectTop < trigger) $(this).addClass('revealed');
        });
    }
    $(window).on('scroll load', onScroll);

    // Gallery lightbox
    $('.gallery-item').on('click', function (e) {
        e.preventDefault();
        var src = $(this).data('img');
        $('#lightboxImg').attr('src', src);
        $('#lightboxModal').modal('show');
    });

    // Ensure auth UI reflects current state once DOM is ready
    if (typeof updateAuthUI === 'function') {
        updateAuthUI();
    }
    // Prefill forms with user info if logged in
    if (typeof prefillUserForms === 'function') {
        prefillUserForms();
    }

    // Also refresh auth UI when auth modal closes (covers third-party auto-fill/login)
    $('#authModal').on('hidden.bs.modal', function(){
        if (typeof updateAuthUI === 'function') updateAuthUI();
        if (typeof prefillUserForms === 'function') prefillUserForms();
    });

    // Keep UI in sync if localStorage changes (other tabs/windows)
    window.addEventListener('storage', function(e){
        if (e.key === 'foodieCurrentUser' || e.key === 'foodieUsers') {
            if (typeof updateAuthUI === 'function') updateAuthUI();
            if (typeof prefillUserForms === 'function') prefillUserForms();
        }
    });

    // Hero "Order Now" button behavior: require login, then show progress popup
    $(document).on('click', '#heroOrderNowBtn', function(e){
        e.preventDefault();
        if (!getCurrentUser()) {
            $('#authModal').modal('show');
            return;
        }
        showConfirm();
    });

    // Reservation validation
    $('#reservationForm').on('submit', function (e) {
        e.preventDefault();
        // Require login before reservation
        if (!getCurrentUser()) {
            alert('You must be logged in to reserve a table.');
            return;
        }
        var valid = true;
        $(this).find('[required]').each(function () {
            if (!$(this).val()) { $(this).addClass('is-invalid'); valid = false; }
            else { $(this).removeClass('is-invalid'); }
        });
        if (valid) {
            $('#reserveMsg').removeClass('d-none');
            this.reset();
            setTimeout(function(){ $('#reserveMsg').addClass('d-none'); }, 5000);
        }
    });

    // 3D tilt for menu cards
    var $cards = $('.menu-card');
    $cards.on('mousemove', function(e){
        var $card = $(this);
        var rect = this.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;  // 0..1
        var py = (e.clientY - rect.top) / rect.height; // 0..1
        var rotateY = (px - 0.5) * 10; // -5..5 deg
        var rotateX = (0.5 - py) * 10; // -5..5 deg
        $card.css('transform', 'translateY(-6px) scale(1.02) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
    });
    $cards.on('mouseleave', function(){
        $(this).css('transform', '');
    });
});

// --- Auth Logic (Multi-user) ---
    function getUsers() {
        return JSON.parse(localStorage.getItem('foodieUsers')) || [];
    }
    function setUsers(users) {
        localStorage.setItem('foodieUsers', JSON.stringify(users));
    }
    function setCurrentUser(email) {
        localStorage.setItem('foodieCurrentUser', email);
    }
    function getCurrentUser() {
        var email = localStorage.getItem('foodieCurrentUser');
        if (!email) return null;
        var users = getUsers();
        return users.find(u => u.email === email) || null;
    }
    function clearCurrentUser() {
        localStorage.removeItem('foodieCurrentUser');
    }
    function updateAuthUI() {
    var user = getCurrentUser();
    var $authLink = $('#authLink');

    if (user) {
        $authLink.text('Logout (' + user.name + ')')
            .removeAttr('data-toggle')
            .removeAttr('data-target')
            .off('click')
            .on('click', function(e){
                e.preventDefault();
                if (confirm('Are you sure you want to Logout?')) {
                    clearCurrentUser();
                    updateAuthUI();
                }
            });

    } else {
        $authLink.text('Login/Register')
            .attr('data-toggle','modal')
            .attr('data-target','#authModal')
            .off('click');
    }
}

    // Prefill reservation and checkout forms with current user
    function prefillUserForms() {
        var user = getCurrentUser();
        if (!user) return;
        // Reservation form fields
        var $resName = $('#name');
        var $resEmail = $('#email');
        if ($resName.length) $resName.val(user.name);
        if ($resEmail.length) $resEmail.val(user.email);
        // Checkout name (also handled in openCheckout)
        var $coName = $('#coName');
        if ($coName.length) $coName.val(user.name);
    }

    // On page load
    updateAuthUI();
    prefillUserForms();
    // Register
    $('#registerForm').on('submit', function(e){
        e.preventDefault();
        var $btn = $(this).find('button[type="submit"]');
        $btn.prop('disabled', true);
        var name = $('#registerName').val().trim();
        var email = $('#registerEmail').val().trim();
        var password = $('#registerPassword').val();
        if (!name || !email || !password) {
            $('#registerMsg').removeClass('d-none').text('All fields required.');
            $btn.prop('disabled', false);
            return;
        }
        var users = getUsers();
        if (users.find(u => u.email === email)) {
            $('#registerMsg').removeClass('d-none text-success').addClass('text-danger').text('Email already registered. Please login.');
            $btn.prop('disabled', false);
            return;
        }
        users.push({name, email, password});
        setUsers(users);
        setCurrentUser(email);
        if (typeof updateAuthUI === 'function') updateAuthUI();
        if (typeof prefillUserForms === 'function') prefillUserForms();
        $('#registerMsg').removeClass('d-none text-danger').addClass('text-success').text('Registration successful! You are now logged in.');
        $('#authModal').modal('hide');
        $btn.prop('disabled', false);
    });
    // Login
    $('#loginForm').on('submit', function(e){
        e.preventDefault();
        var $btn = $(this).find('button[type="submit"]');
        $btn.prop('disabled', true);
        var email = $('#loginEmail').val().trim();
        var password = $('#loginPassword').val();
        var users = getUsers();
        var user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            $('#loginMsg').removeClass('d-none text-success').addClass('text-danger').text('Invalid email or password.');
            $btn.prop('disabled', false);
            return;
        }
        setCurrentUser(email);
        if (typeof updateAuthUI === 'function') updateAuthUI();
        if (typeof prefillUserForms === 'function') prefillUserForms();
        $('#loginMsg').removeClass('d-none text-danger').addClass('text-success').text('Login successful!');
        $('#authModal').modal('hide');
        $btn.prop('disabled', false);
    });
    // Hide messages on modal open
    $('#authModal').on('show.bs.modal', function(){
        $('#loginMsg, #registerMsg').addClass('d-none').removeClass('text-success').removeClass('text-danger').text('');
        $('#loginForm, #registerForm').trigger('reset');
    });

    // After modal fully hidden, refresh the auth UI and clean up messages
    $('#authModal').on('hidden.bs.modal', function(){
        if (typeof updateAuthUI === 'function') updateAuthUI();
        $('#loginMsg, #registerMsg').addClass('d-none').removeClass('text-success text-danger').text('');
        // Do not force-reset forms here; keep user's input if needed next time
    });

    function showConfirm() {
      // Block if not logged in
      if (!getCurrentUser()) {
        alert('You must be logged in to place an order.');
        return;
      }

      document.getElementById("confirmMsg").style.display = "block";

      let steps = document.querySelectorAll(".step");
      let progress = document.getElementById("progress");
      let statusEl = document.getElementById("status");
      let timerEl = document.getElementById("timer");
      let emojiEl = document.getElementById("emoji");

      // Step 1: Order Received (10s)
      steps[0].classList.add("active");
      progress.style.width = "0%";
      statusEl.textContent = "✅ Order Received";
      timerEl.textContent = "Waiting... 10s";
      emojiEl.innerHTML = "<i class='fa fa-envelope'></i>";
      emojiEl.className = "emoji bounce";

      setTimeout(() => {
        // Step 2: Cooking (20 min)
        steps[1].classList.add("active");
        progress.style.width = "33%";
        emojiEl.textContent = "👨‍🍳";
        emojiEl.className = "emoji shake";
        startCooking(15 * 60, statusEl, timerEl, steps, progress, emojiEl);
      }, 10000);
    }

    function startCooking(duration, statusEl, timerEl, steps, progress, emojiEl) {
      statusEl.textContent = "👨‍🍳 Cooking Your Order";
      let timer = duration;
      let cooking = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerEl.textContent = "Cooking Time: " + minutes + ":" + seconds;

        if (--timer < 0) {
          clearInterval(cooking);
          steps[2].classList.add("active");
          progress.style.width = "66%";
          emojiEl.innerHTML = "<span class='bike'><i class='fa-solid fa-motorcycle'></i></span>";
          emojiEl.className = "emoji";
          startDelivery(15 * 60, statusEl, timerEl, steps, progress, emojiEl);
        }
      }, 1000);
    }

    function startDelivery(duration, statusEl, timerEl, steps, progress, emojiEl) {
      let timer = duration;
      let delivery = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerEl.textContent = "Delivery ETA: " + minutes + ":" + seconds;

        if (--timer < 0) {
          clearInterval(delivery);
          steps[3].classList.add("active");
          progress.style.width = "100%";
          statusEl.textContent = "🎊 Order Delivered!";
          timerEl.textContent = "";
          emojiEl.textContent = "🎉";
          emojiEl.className = "emoji pop";
        }
      }, 1000);
      
    }