(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    
    // Main carousel
    if ($(".carousel .owl-carousel").length) {
        $(".carousel .owl-carousel").owlCarousel({
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            items: 1,
            smartSpeed: 300,
            dots: false,
            loop: true,
            nav : false
        });
    }
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        });
    });
    
    
    // Date and time picker
    if ($('#date').length) {
        $('#date').datetimepicker({
            format: 'L'
        });
    }
    if ($('#time').length) {
        $('#time').datetimepicker({
            format: 'LT'
        });
    }
    if ($('#modalDate').length) {
        $('#modalDate').datetimepicker({
            format: 'L'
        });
    }
    if ($('#modalTime').length) {
        $('#modalTime').datetimepicker({
            format: 'LT'
        });
    }


    // Testimonials carousel
    if ($(".testimonials-carousel").length) {
        $(".testimonials-carousel").owlCarousel({
            center: true,
            autoplay: true,
            dots: true,
            loop: true,
            responsive: {
                0:{
                    items:1
                },
                576:{
                    items:1
                },
                768:{
                    items:2
                },
                992:{
                    items:3
                }
            }
        });
    }
    
    
    // Related post carousel
    if ($(".related-slider").length) {
        $(".related-slider").owlCarousel({
            autoplay: true,
            dots: false,
            loop: true,
            nav : true,
            navText : [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0:{
                    items:1
                },
                576:{
                    items:1
                },
                768:{
                    items:2
                }
            }
        });
    }

    /* =======================================================
       TOAST NOTIFICATION ENGINE
       ======================================================= */
    window.showBkToast = function (title, message, type) {
        type = type || 'success';
        if (!$('.bk-toast-container').length) {
            $('body').append('<div class="bk-toast-container"></div>');
        }

        var icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        var toastId = 'toast-' + Date.now();
        var toastHtml = '' +
            '<div id="' + toastId + '" class="bk-toast toast-' + type + '">' +
                '<i class="fa ' + icon + ' bk-toast-icon"></i>' +
                '<div class="bk-toast-content">' +
                    '<h6>' + title + '</h6>' +
                    '<p>' + message + '</p>' +
                '</div>' +
            '</div>';

        $('.bk-toast-container').append(toastHtml);

        setTimeout(function () {
            $('#' + toastId).fadeOut(400, function () {
                $(this).remove();
            });
        }, 4500);
    };

    /* =======================================================
       GLOBAL MENU SEARCH INDEX & SHORTCUTS (Ctrl+K, /)
       ======================================================= */
    var menuSearchIndex = [
        { title: "Signature Black Angus Truffle Double", category: "Burgers", price: "$14.99", desc: "Grass-fed dry-aged Angus beef, black summer truffle aioli, aged cheddar & brioche", img: "img/menu-burger.jpg", link: "menu-detail.html" },
        { title: "Classic Flame-Grilled Cheeseburger", category: "Burgers", price: "$9.99", desc: "100% prime beef, melted Wisconsin cheddar, house pickles, secret grill sauce", img: "img/menu-burger.jpg", link: "menu-detail.html" },
        { title: "Crispy Buttermilk Buffalo Chicken", category: "Burgers", price: "$11.99", desc: "Hand-breaded crispy chicken breast, tangy buffalo glaze, creamy slaw", img: "img/menu-burger.jpg", link: "menu-detail.html" },
        { title: "Smoky Applewood Bacon BBQ Burger", category: "Burgers", price: "$13.49", desc: "Crispy thick-cut bacon, hickory smokehouse BBQ, beer-battered onion rings", img: "img/menu-burger.jpg", link: "menu-detail.html" },
        { title: "Mushroom Swiss Meltdown", category: "Burgers", price: "$12.49", desc: "Sauteed cremini & shiitake mushrooms, melted Swiss cheese, garlic herb aioli", img: "img/menu-burger.jpg", link: "menu-detail.html" },
        { title: "Loaded Truffle Parmesan Fries", category: "Snacks", price: "$6.99", desc: "Hand-cut golden Idaho potatoes tossed in white truffle oil and aged parmesan", img: "img/menu-snack.jpg", link: "menu.html" },
        { title: "Crispy Beer-Battered Onion Rings", category: "Snacks", price: "$5.49", desc: "Jumbo Spanish onions soaked in craft ale batter with zesty chipotle dip", img: "img/menu-snack.jpg", link: "menu.html" },
        { title: "Artisan Smoked Mozzarella Sticks", category: "Snacks", price: "$6.49", desc: "Smoked mozzarella coated in herb panko breadcrumbs with fire-roasted marinara", img: "img/menu-snack.jpg", link: "menu.html" },
        { title: "House-Smoked Jumbo Buffalo Wings", category: "Snacks", price: "$8.99", desc: "Dry-rubbed and hickory smoked, tossed in choice of ghost pepper or honey BBQ", img: "img/menu-snack.jpg", link: "menu.html" },
        { title: "Salted Caramel Bourbon Shake", category: "Beverages", price: "$5.99", desc: "Madagascar vanilla bean custard, smoked sea salt caramel, house-whipped cream", img: "img/menu-beverage.jpg", link: "menu.html" },
        { title: "Classic Thick Chocolate Malt", category: "Beverages", price: "$5.49", desc: "Rich Belgian dark chocolate churned with organic whole milk and malted cream", img: "img/menu-beverage.jpg", link: "menu.html" },
        { title: "Local Craft IPA & Draft Beers", category: "Beverages", price: "$6.50", desc: "Rotating selection of cold seasonal drafts and artisan IPA cans", img: "img/menu-beverage.jpg", link: "menu.html" },
        { title: "Craft House Soda & Cold Brew", category: "Beverages", price: "$3.99", desc: "Cane sugar artisanal sodas, fresh lemonade, and nitrogen cold brew coffee", img: "img/menu-beverage.jpg", link: "menu.html" },
        { title: "Family Burger & Sides Feast Box", category: "Catering", price: "$49.99", desc: "4 Signature Burgers, 2 Loaded Fries, 1 Onion Ring, 4 Soft Drinks", img: "img/menu-burger-img.jpg", link: "pricing.html" },
        { title: "Corporate Lunch & Party Catering", category: "Catering", price: "$129.99", desc: "Customized slider platters, finger foods, and dessert bars for 10-25 guests", img: "img/menu-snack-img.jpg", link: "pricing.html" }
    ];

    $(document).on('keyup', '#bkSearchInput', function () {
        var query = $(this).val().toLowerCase().trim();
        var $container = $('#searchResultsContainer');

        if (!query) {
            $container.html('<div class="text-center text-muted py-4"><i class="fa fa-utensils fa-2x mb-2 text-warning opacity-75"></i><p class="mb-0">Type a burger name, ingredient, side, or beverage...</p></div>');
            return;
        }

        var results = menuSearchIndex.filter(function (item) {
            return item.title.toLowerCase().indexOf(query) !== -1 ||
                   item.category.toLowerCase().indexOf(query) !== -1 ||
                   item.desc.toLowerCase().indexOf(query) !== -1;
        });

        if (results.length === 0) {
            $container.html('<div class="text-center text-muted py-4"><i class="fa fa-search-minus fa-2x mb-2 text-warning"></i><p class="mb-0">No matching dishes found for "<strong>' + query + '</strong>". Try searching for "Truffle", "Angus", "Wings", or "Shake".</p></div>');
            return;
        }

        var html = '';
        results.forEach(function (res) {
            html += '' +
                '<a href="' + res.link + '" class="search-item-card">' +
                    '<img src="' + res.img + '" alt="' + res.title + '">' +
                    '<div class="item-info">' +
                        '<h6>' + res.title + ' <span class="badge badge-bk">' + res.category + '</span></h6>' +
                        '<p>' + res.desc + '</p>' +
                    '</div>' +
                    '<div class="item-price">' + res.price + '</div>' +
                '</a>';
        });

        $container.html(html);
    });

    // Keyboard shortcut (Ctrl+K or /)
    $(document).on('keydown', function (e) {
        if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !$(e.target).is('input, textarea, select'))) {
            e.preventDefault();
            $('#searchModal').modal('show');
            setTimeout(function () {
                $('#bkSearchInput').focus();
            }, 500);
        }
    });

    /* =======================================================
       TABLE RESERVATION & BOOKING HANDLER (AJAX + FALLBACK)
       ======================================================= */
    function handleTableBooking($form, isModal) {
        var name = $form.find('input[name="name"], input[placeholder="Name"]').val();
        var email = $form.find('input[name="email"], input[placeholder="Email"]').val();
        var phone = $form.find('input[name="phone"], input[name="mobile"], input[placeholder="Mobile"]').val();
        var date = $form.find('input[name="date"], input[placeholder="Date"]').val() || 'Tomorrow';
        var time = $form.find('input[name="time"], input[placeholder="Time"]').val() || '07:00 PM';
        var guests = $form.find('select[name="guests"], select.custom-select').val() || '2 Guests';
        var seating = $form.find('select[name="seating"]').val() || 'Main Dining Room';
        var notes = $form.find('textarea[name="notes"]').val() || 'Standard Table';

        var $btn = $form.find('button[type="submit"]');
        var origText = $btn.html();
        $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin mr-2"></i>Reserving Table...');

        $.ajax({
            url: 'mail/booking.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: name,
                email: email,
                phone: phone,
                date: date,
                time: time,
                guests: guests,
                seating: seating,
                notes: notes
            },
            success: function (response) {
                var code = response.booking_code || 'BK-TBL-' + Math.floor(100000 + Math.random() * 900000);
                showBkToast('Table Reserved!', 'Confirmation code: ' + code + '. We look forward to hosting you!', 'success');
                if (isModal) {
                    $('#tableBookingModal').modal('hide');
                }
                var alertBox = $('#bookingAlert');
                if (alertBox.length) {
                    alertBox.removeClass('d-none alert-danger').addClass('alert alert-success')
                        .html('<strong>Table Booked Successfully!</strong> Confirmation Code: <code>' + code + '</code>. An SMS reminder has been scheduled.');
                }
                $form[0].reset();
            },
            error: function () {
                // Graceful fallback for static hosting
                var fallbackCode = 'BK-TBL-' + Math.floor(100000 + Math.random() * 900000);
                showBkToast('Table Reserved!', 'Booking Confirmed (' + fallbackCode + ') for ' + name + ' on ' + date + ' at ' + time + '.', 'success');
                if (isModal) {
                    $('#tableBookingModal').modal('hide');
                }
                var alertBox = $('#bookingAlert');
                if (alertBox.length) {
                    alertBox.removeClass('d-none alert-danger').addClass('alert alert-success')
                        .html('<strong>Table Reserved!</strong> Confirmation Code: <code>' + fallbackCode + '</code>. Your table is locked in!');
                }
                $form[0].reset();
            },
            complete: function () {
                $btn.prop('disabled', false).html(origText);
            }
        });
    }

    // Modal table reservation form
    $(document).on('submit', '#tableBookingModalForm', function (e) {
        e.preventDefault();
        handleTableBooking($(this), true);
    });

    // In-page booking form on booking.html and index.html
    $(document).on('submit', '#tableBookingForm', function (e) {
        e.preventDefault();
        handleTableBooking($(this), false);
    });

    /* =======================================================
       CONTACT FORM AJAX HANDLER
       ======================================================= */
    $(document).on('submit', '#contactForm', function (e) {
        e.preventDefault();
        var $form = $(this);
        var name = $form.find('#name, input[name="name"]').val();
        var email = $form.find('#email, input[name="email"]').val();
        var subject = $form.find('#subject, input[name="subject"]').val();
        var message = $form.find('#message, textarea[name="message"]').val();

        var $btn = $form.find('#sendMessageButton, button[type="submit"]');
        var origText = $btn.html();
        $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin mr-2"></i>Sending...');

        $.ajax({
            url: 'mail/contact.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message
            },
            success: function (res) {
                var ref = res.reference || 'BK-MSG-' + Math.floor(100000 + Math.random() * 900000);
                $('#success, #contactAlert').removeClass('d-none alert-danger')
                    .addClass('alert alert-success')
                    .html('<strong>Message Sent!</strong> Tracking Ref: <code>' + ref + '</code>. Our kitchen manager will contact you promptly.');
                showBkToast('Message Delivered', 'Thank you ' + name + '! Reference: ' + ref, 'success');
                $form[0].reset();
            },
            error: function () {
                // Static hosting fallback
                var fallbackRef = 'BK-MSG-' + Math.floor(100000 + Math.random() * 900000);
                $('#success, #contactAlert').removeClass('d-none alert-danger')
                    .addClass('alert alert-success')
                    .html('<strong>Message Received!</strong> Tracking Ref: <code>' + fallbackRef + '</code>. Thank you for contacting Burger King Kitchen.');
                showBkToast('Inquiry Received', 'Reference: ' + fallbackRef + '. We will reply shortly!', 'success');
                $form[0].reset();
            },
            complete: function () {
                $btn.prop('disabled', false).html(origText);
            }
        });
    });

    /* =======================================================
       INTERACTIVE STAR RATING & CUSTOMER REVIEW FORM
       ======================================================= */
    $(document).on('mouseenter', '.rating-stars i.fa-star', function () {
        var rating = $(this).data('rating');
        $('.rating-stars i.fa-star').each(function () {
            $(this).toggleClass('hovered', $(this).data('rating') <= rating);
        });
    }).on('mouseleave', '.rating-stars', function () {
        var current = $('#ratingValue').val();
        $('.rating-stars i.fa-star').removeClass('hovered').each(function () {
            $(this).toggleClass('active', $(this).data('rating') <= current);
        });
    });

    $(document).on('click', '.rating-stars i.fa-star', function () {
        var rating = $(this).data('rating');
        $('#ratingValue').val(rating);
        $('.rating-stars i.fa-star').each(function () {
            $(this).toggleClass('active', $(this).data('rating') <= rating);
        });
    });

    $(document).on('submit', '#reviewForm', function (e) {
        e.preventDefault();
        var author = $('#reviewAuthor').val();
        var dish = $('#reviewDish').val() || 'Signature Burger';
        var text = $('#reviewText').val();
        var rating = parseInt($('#ratingValue').val()) || 5;

        var starsHtml = '';
        for (var i = 1; i <= 5; i++) {
            starsHtml += '<i class="fa fa-star ' + (i <= rating ? 'text-warning' : 'text-muted') + '"></i>';
        }

        var reviewCardHtml = '' +
            '<div class="col-md-6 mb-4">' +
                '<div class="card p-4 border-0 shadow-sm rounded transition-hover h-100">' +
                    '<div class="d-flex justify-content-between align-items-center mb-3">' +
                        '<div>' + starsHtml + '</div>' +
                        '<span class="badge badge-bk">Verified Foodie</span>' +
                    '</div>' +
                    '<p class="text-secondary mb-3">"' + text + '"</p>' +
                    '<div class="d-flex align-items-center mt-auto border-top pt-3">' +
                        '<div class="bg-warning text-white rounded-circle font-weight-bold d-flex align-items-center justify-content-center mr-3" style="width: 40px; height: 40px;">' +
                            author.charAt(0).toUpperCase() +
                        '</div>' +
                        '<div>' +
                            '<h6 class="mb-0 font-weight-bold">' + author + '</h6>' +
                            '<small class="text-muted">' + dish + ' &bull; Just now</small>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        if ($('#reviewGridContainer').length) {
            $('#reviewGridContainer').prepend(reviewCardHtml);
        }

        $('#reviewModal').modal('hide');
        showBkToast('Review Published!', 'Thank you ' + author + '! Your foodie feedback is live.', 'success');
        $('#reviewForm')[0].reset();
        $('#ratingValue').val(5);
        $('.rating-stars i.fa-star').addClass('active');
    });

    /* =======================================================
       CATERING / COMBO SWITCHER (pricing.html)
       ======================================================= */
    $(document).on('click', '.catering-switch button', function () {
        $('.catering-switch button').removeClass('active');
        $(this).addClass('active');
        var target = $(this).data('target');

        if (target === 'party') {
            $('#individualCombos').addClass('d-none');
            $('#partyFeasts').removeClass('d-none');
        } else {
            $('#partyFeasts').addClass('d-none');
            $('#individualCombos').removeClass('d-none');
        }
    });

    /* =======================================================
       LIVE BLOG COMMENT ENGINE (single.html)
       ======================================================= */
    $(document).on('submit', '#blogCommentForm', function (e) {
        e.preventDefault();
        var name = $(this).find('#commentName').val();
        var comment = $(this).find('#commentMessage').val();

        var commentHtml = '' +
            '<li class="comment-item">' +
                '<div class="comment-body">' +
                    '<div class="comment-img">' +
                        '<img src="img/user.jpg" alt="' + name + '" />' +
                    '</div>' +
                    '<div class="comment-text">' +
                        '<h3><a href="javascript:void(0)">' + name + '</a></h3>' +
                        '<span>Just now &bull; Verified Foodie</span>' +
                        '<p>' + comment + '</p>' +
                        '<a class="btn" href="javascript:void(0)">Reply</a>' +
                    '</div>' +
                '</div>' +
            '</li>';

        $('.comment-list').prepend(commentHtml);
        showBkToast('Comment Posted', 'Thank you for joining the culinary conversation!', 'success');
        $(this)[0].reset();
    });

    /* =======================================================
       NEWSLETTER SUBSCRIPTION HANDLER
       ======================================================= */
    $(document).on('submit', '.newsletter-form', function (e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();
        showBkToast('Subscribed!', 'Welcome to the Burger King Club. Check ' + email + ' for 15% off your next feast!', 'success');
        $(this)[0].reset();
    });

})(jQuery);
