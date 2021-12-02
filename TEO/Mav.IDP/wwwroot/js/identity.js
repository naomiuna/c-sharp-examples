var eo = eo || {};
eo.form = eo.form || {};

$(function(){
	
    //INPUT INTERACTIONS
    $('.fill__form input').on('change', function (){
		var el = this;
		if (el.value.length > 1) {
			$(el).addClass('with-content');
		} else {
			$(el).removeClass('with-content');
		}
	});
    $('.fill__form select').on('change', function (){
        var el = this;
		$(el).addClass('with-content');
    });
    
    //OPEN NAVIGATION
    $('#navigation__trigger').on('click', function (e) {
        e.preventDefault();
        $("#sidenav").addClass('active');
        $("#navigation__trigger").addClass('active');
        $('body').addClass('active__navigation');
        $('main').addClass('active__navigation');
        if ($(window).width() >= 1200) {
            $("#full__wrapper").addClass('active');
        }
    });
    //CLOSE NAVIGATION
    $('.close').on('click', function (e) {
        e.preventDefault();
        $("#sidenav").removeClass('active');
        $("#navigation__trigger").removeClass('active');
        $('body').removeClass('active__navigation');
        $('main').removeClass('active__navigation');
        if ($(window).width() >= 1200) {
            $("#full__wrapper").removeClass('active');
        }
    });
    //CLOSE NAV ON CLICK OUTSIDE SIDENAV
    $(document).mouseup(function (e) {
        var sideNav = $("#sidenav");
        if ($("#sidenav").hasClass('active') && !sideNav.is(e.target) && sideNav.has(e.target).length === 0) {
            $("#sidenav").removeClass('active');
            $("#navigation__trigger").removeClass('active');
            $('body').removeClass('active__navigation');
            $('main').removeClass('active__navigation');
            if ($(window).width() >= 900) {
                $("#full__wrapper").removeClass('active');
            }
        }
    });
    // Toggle Terms and Conditions on registration form
    $('.register__terms__link').on('click', function (e) {
        e.preventDefault();
        $('#register__terms').fadeIn(100);
    });

    eo.form.validateForm = function (formType) {
        $('.validate-error-row').remove();
        var valItems = $('[data-type*="' + formType + '"] [data_required="true"]'),
            formValid = true;
        function insertValidation(el, msg) {
            var er = document.createElement('span');
            er.className = "validate-error-row";
            er.innerHTML = msg;
            $(er.outerHTML).insertAfter(el);
        }
        for (var i = 0, valItem; valItem = valItems[i++];) {
            var node = valItem.nodeName,
                valid = true,
                msg;
            if (node === "INPUT") {
                if (valItem.getAttribute('type') != "email") {
                    if (valItem.getAttribute('type') == "text") {
                        valid = valItem.value.length < 1 ? false : valid;
                        msg = "Please enter a value";
                    } else if (valItem.getAttribute('type') == "file") {
                        valid = valItem.value.length < 1 ? false : valid;
                        msg = "Please select a file";
                    } else if (valItem.getAttribute('type') == "checkbox") {
                        valid = !valItem.checked ? false : valid;
                        msg = "You must select this option";
                    } else if (valItem.getAttribute('type') == "radio") {
                        valid = !valItem.checked ? false : valid;
                        msg = "You must select this option";
                    } else if (valItem.getAttribute('type') == "password") {
                        valid = valItem.value.length < 1 ? false : valid;
                        msg = "Please enter a password";
                    }
                } else {
                    valid = valItem.value.length < 1 ? false : valid;
                    msg = "Please enter a value";
                    if (valid) {
                        var emReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        valid = !emReg.test(valItem.value) ? false : valid;
                        msg = "Please enter a valid email";
                    }
                }
            } else if (node === "SELECT") {
                valid = valItem.value == 0 ? false : valid;
                msg = "Please select from one of the options";
            } else if (node === "TEXTAREA") {
                valid = valItem.value.length < 1 ? false : valid;
                msg = "Please enter a value";
            }
            if (!valid) {
                insertValidation(valItem, msg);
                formValid = false;
            }
        }
        return formValid;
    }

});