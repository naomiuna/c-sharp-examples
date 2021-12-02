var eo = eo || {};
eo.form = eo.form || {};
// import { timerCountdown } from '../js/timer'

$(function(){

	//OPEN NAVIGATION
    $('#navigation__trigger').on('click', function (e) {
		e.preventDefault();
        $("#sidenav").addClass('active');
        $("#navigation__trigger").addClass('active');
        $('body').addClass('active__navigation');
        $('main').addClass('active__navigation');
        if($(window).width() >= 1200) {
            $("#full__wrapper").addClass('active');  
        }
	});
    //CLOSE NAVIGATION
    $('.close, .links a').on('click', function (e) {
		e.preventDefault();
        $("#sidenav").removeClass('active');
        $("#navigation__trigger").removeClass('active');
        $('body').removeClass('active__navigation');
        $('main').removeClass('active__navigation');
        if($(window).width() >= 1200) {
            $("#full__wrapper").removeClass('active');  
        }
	});
    //CLOSE NAV ON CLICK OUTSIDE SIDENAV
    $(document).mouseup(function(e) 
    {
        var sideNav = $("#sidenav");
        if ($("#sidenav").hasClass('active') && !sideNav.is(e.target) && sideNav.has(e.target).length === 0) 
        {
            $("#sidenav").removeClass('active');
            $("#navigation__trigger").removeClass('active');
            $('body').removeClass('active__navigation');
            $('main').removeClass('active__navigation');
            if($(window).width() >= 900) {
                $("#full__wrapper").removeClass('active');  
            }
        }
    });
    //INPUT INTERACTIONS
    /*$('.fill__form input').on('change', function (){
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
    });*/
    //ACCORDION
    $(".view__assessment").on("click", function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass("active");
            $(this).closest('.list__item').find('.assessment__content').slideUp();
            $(this).closest(".down a").removeClass('btn__accordion__up').addClass('btn__accordion');
        } else {
            $(".down a").removeClass('btn__accordion__up').addClass('btn__accordion');
            $(this).closest(".down a").removeClass('btn__accordion').addClass('btn__accordion__up');
            $(".down a").removeClass("active");
            $(this).addClass("active");
            $('.assessment__content').slideUp(200);
            $(this).closest('.list__item').find('.assessment__content').slideDown();
        }
    });
    $(document).on("click", ".btn__print__pdf", function(e) {
        e.preventDefault();
        var pdfElement = document.getElementById("certificate");
        pdfElement.scrollIntoView();
        var screenID = $('#hdnScreenID').val();
        var imageName = screenID == 2 || screenID == '2' ? 'sections.png' : 'certificate.png';
        html2canvas(pdfElement).then(function (canvas) {
            canvas.toBlob(function (blob) {
                window.saveAs(blob, imageName);
            });
        });
    });

    //MODAL
    $(document).on("click", ".trigger__modal", function(e) {
        e.preventDefault();
        var modalType = $(this).attr('data-modaltype');
        $('.modal').removeClass('modal__active');
        $('.modal[data-modaltype="' + modalType + '"]').addClass('modal__active');
        $('body').addClass('no__scroll');
    });
    $(document).on("click", ".closeModal, .cancel", function(e) {
        e.preventDefault();
        eo.removeModal();
    });
    $("#myModal").mouseup(function(e) {
        var subject = $("#modal__content"); 
        if(e.target.id != subject.attr('id') && !subject.has(e.target).length)
        {
            eo.removeModal();
        }
    });
    //QUESTIONS ACTIVE
    $('.btn__question').click(function(e){
        var number = $(this).closest("#question__count").attr("data-id");
        var length = $('.button__active').length;
        if(length < number) {
            e.preventDefault();
            $(this).toggleClass('button__active');
            $('.error__message').css("display", "none");
        } else {
            $(this).removeClass('button__active');
            $('.error__message').css("display", "block");
        }
    });
    window.onresize = function () {
        eo.heightCheck(".btn__question");
        eo.heightCheck(".height__check");
	}
	eo.animate();
    eo.heightCheck(".btn__question");
    eo.heightCheck(".height__check");
    window.addEventListener('scroll', eo.animate);
});

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

//HEIGHT CHECK
eo.heightCheck = function (elem) {
    var maxOuterHeight = 0;
    if($(window).width() >= 768 - 16) {
        $(elem).each(function () {
            if ($(this).outerHeight() > maxOuterHeight) { maxOuterHeight = $(this).outerHeight(); }
        });
        $(elem).outerHeight(maxOuterHeight);
    } else {
        $(elem).css({"height": "auto"});
    }
}
//ANIMATIONS
eo.animate = function () {
	var animationItem = $('.anim__detect'), scrollPos = $(window).scrollTop();
	for (var i = 0; i < animationItem.length; i++) {
		var docBottom = $(window).scrollTop() + $(window).height(), itemPosTop = $(animationItem[i]).offset().top, itemPosBottom = itemPosTop + $(animationItem[i]).height();
		if ((itemPosTop <= docBottom - 100) && (itemPosTop >= scrollPos)) {
			$(animationItem[i]).addClass('animate');
		}
	}
}
//CLOSE MODAL
eo.removeModal = function () {
    var modalType = $(this).attr('data-modaltype');
    $('.modal').removeClass('modal__active');
    $('.modal[data-modaltype="' + modalType + '"]').addClass('modal');
    $('body').removeClass('no__scroll');
}
removeModal = function (modalType) {
    $('.modal').removeClass('modal__active');
    $('.modal[data-modaltype="' + modalType + '"]').addClass('modal');
    $('body').removeClass('no__scroll');
}

certificatePageLayout = function () {
    $('#pushtop').fadeOut();
    $('#header__top').fadeOut();
    $('#sidenav').fadeOut();
}

resetPageLayout = function () {
    $('#pushtop').fadeIn();
    $('#header__top').fadeIn();
    $('#sidenav').fadeIn();
}

fileBrowserCallBack = function(field_name, url, type, win) {
    console.log("fileBrowserCallBack called...");
    if (type === 'image') {
        tinymce.activeEditor.windowManager.open({
            title: "Choose your image",
            url: '/admin/tiny-images',
            width: 1200,
            height: 800
        }, {
            field_name: field_name,
            win: win
        });
    }
}

tinyImagesClose = function(value, alt) {
    console.log("tinyImagesClose called...");
    var args = top.tinymce.activeEditor.windowManager.getParams();
    var win = args.win;
    var field_name = args.field_name;
    win.document.getElementById(field_name).value = value;
    if (alt.length > 0) {
        win.document.getElementById("mceu_48").value = alt;
    }
    top.tinymce.activeEditor.windowManager.close();
}

tinyImagesPicker = function(cb, value, meta) {
    console.log("tinyImagesPicker called...");
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = function() {

        var file = this.files[0];
        var fileName = file.name,
            fileType = file.type,
            type,
            typeTrue = false;

        if (fileName.indexOf('png') > -1) {
            type = 'png';
            typeTrue = true;
        }
        if (fileName.indexOf('gif') > -1) {
            type = 'gif';
            typeTrue = true;
        }
        if (fileName.indexOf('jpg') > -1) {
            type = 'jpg';
            typeTrue = true;
        }
        if (fileName.indexOf('jpeg') > -1) {
            type = 'jpeg';
            typeTrue = true;
        }

        console.log("fileName: " + fileName);
        console.log("type: " + type);
        console.log("typeTrue: " + typeTrue);

        if (typeTrue) {

            var fileData = new FormData();
            fileData.append('file', file);
            fileData.append('fileType', fileType);

            var apiBaseUrl = $('#hdnApiBaseUrl').val();
            var authorityUrl = $('#hdnAuthorityUrl').val();
            console.log("apiBaseUrl: " + apiBaseUrl);
            console.log("authorityUrl: " + authorityUrl);

            var config = {
                authority: authorityUrl,
                client_id: "exams_office",
                redirect_uri: window.location.origin + "/auth-callback",
                post_logout_redirect_uri: window.location.origin,
                response_type: "id_token token",
                scope: "openid profile roles mavapi",
                loadUserInfo: true,
                silent_redirect_uri: window.location.origin + "/silent-refresh.html",
                automaticSilentRenew: true,
                filterProtocolClaims: false
            };
            
            var mgr = new Oidc.UserManager(config);
            var dataToSend = {};
            dataToSend.File = file;
            dataToSend.FileType = fileType;

            mgr.getUser().then(function (user) {
                $.ajax({
                    url: apiBaseUrl + "api/1.0/Files/TinyUpload",
                    type: "POST",
                    data: fileData,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    headers: {
                        "Authorization": "Bearer " + user.access_token
                    },
                    complete: function (r) {
                        console.log(r.responseJSON);             
                        cb(r.responseJSON.keyID, { title: file.name });
                    },
                    error: function (r) {
                        console.log('error');
                        console.log(r);
                    }
                });
            });

        }
        else {
            alert("Please select image files only (e.g. png, jpg or gif)");
        }
    };

    input.click();
}

  

