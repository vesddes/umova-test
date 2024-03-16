$(document).ready(function() {
    $(".error-message").fadeOut();

    $('.select').on('click', '.select__head', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head').removeClass('open');
            $('.select__list').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.select').on('click', '.select__item', function () {
        $('.select__head').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text());
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select').length) {
            $('.select__head').removeClass('open');
            $('.select__list').fadeOut();
        }
    });



    const passwordInput = document.getElementById('password');
    const passwordImg = document.querySelector('.password-img');

    passwordImg.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordImg.style.backgroundImage = 'url("./assets/images/password-close.svg")';
        } else {
            passwordInput.type = 'password';
            passwordImg.style.backgroundImage = 'url("./assets/images/password-open.svg")';
        }
    });


    $('#userForm').submit(function(event) {
        event.preventDefault();


        if (!validateForm()) {
            return false;
        }


        let formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'form.php',
            data: formData,
            success: function(response) {
                $('#responseMessage').html('The form has been sent successfully!');
            },
            error: function(response) {
                $('#responseMessage').html('Error. Data not sent.');
            }
        });
    });
});

function validateForm() {
    let isValid = true;


    let name = $('#name');
    if (name.val().trim() === '') {
        isValid = false;
        name.addClass('error');
        name.closest(".form-group").find('.error-message').text('The field cannot be empty').fadeIn();
    } else {
        name.removeClass('error');
        name.closest(".form-group").find('.error-message').text('').fadeOut();
    }


    let email = $('#email');
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.val())) {
        isValid = false;
        email.addClass('error');
        email.closest(".form-group").find('.error-message').text('Please enter a valid email address').fadeIn();
    } else {
        email.removeClass('error');
        email.closest(".form-group").find('.error-message').text('').fadeOut();
    }


    let phone = $('#phone');
    let phoneRegex = /^\+?\d{13}$/;
    if (!phoneRegex.test(phone.val())) {
        isValid = false;
        phone.addClass('error');
        phone.closest(".form-group").find('.error-message').text('Please enter a valid phone number').fadeIn();
    } else {
        phone.removeClass('error');
        phone.closest(".form-group").find('.error-message').text('').fadeOut();
    }


    let password = $('#password');
    if (password.val().length < 6) {
        isValid = false;
        password.addClass('error');
        password.closest(".form-group").find('.error-message').text('Password must be at least 6 characters long').fadeIn();
    } else {
        password.removeClass('error');
        password.closest(".form-group").find('.error-message').text('').fadeOut();
    }


    let city = $('#city');
    if (city.val() === '') {
        isValid = false;
        city.addClass('error');
        city.closest(".form-group").find('.error-message').text('Please select a city').fadeIn();
    } else {
        city.removeClass('error');
        city.closest(".form-group").find('.error-message').text('').fadeOut();
    }


    let privacyPolicyChecked = $('#privacyPolicy');
    if (!privacyPolicyChecked.prop('checked')) {
        isValid = false;
        privacyPolicyChecked.addClass('error');
        privacyPolicyChecked.closest(".form-group").find('.error-message').text('Please accept the privacy policy').fadeIn();
    } else {
        privacyPolicyChecked.removeClass('error');
        privacyPolicyChecked.closest(".form-group").find('.error-message').text('').fadeOut();
    }

    return isValid;
}

