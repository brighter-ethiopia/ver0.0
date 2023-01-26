$(document).ready(function () {
    const lang = localStorage.getItem('lang');
    if (lang == 'en') {
        $('.en').css('display', 'flex')
        $('.amh').css('display', 'none')
        $('.shelf1 .languagesCon .lan-en').removeClass('idle').addClass('current')
        $('.shelf1 .languagesCon .lan-amh').removeClass('current').addClass('idle')
    } else if (lang == 'amh') {
        $('.amh').css('display', 'flex')
        $('.en').css('display', 'none')
        $('.shelf1 .languagesCon .lan-amh').removeClass('idle').addClass('current')
        $('.shelf1 .languagesCon .lan-en').removeClass('current').addClass('idle')
    } else {
        $('.en').css('display', 'flex')
        $('.amh').css('display', 'none')
        $('.shelf1 .languagesCon .lan-en').removeClass('idle').addClass('current')
        $('.shelf1 .languagesCon .lan-amh').removeClass('current').addClass('idle')
    }
})

$('.shelf1 .languagesCon .lan-en').on('click', function () {
    $('.en').css('display', 'flex')
    $('.amh').css('display', 'none')
    $('.shelf1 .languagesCon .lan-en').removeClass('idle').addClass('current')
    $('.shelf1 .languagesCon .lan-amh').removeClass('current').addClass('idle')
    localStorage.setItem('lang', 'en');
})

$('.shelf1 .languagesCon .lan-amh').on('click', function () {
    $('.amh').css('display', 'flex')
    $('.en').css('display', 'none')
    $('.shelf1 .languagesCon .lan-amh').removeClass('idle').addClass('current')
    $('.shelf1 .languagesCon .lan-en').removeClass('current').addClass('idle')
    localStorage.setItem('lang', 'amh');
})

$('.homeBtn').on('click', function () {
    window.location.href = '/home'
})

$('.projectsBtn').on('click', function () {
    window.location.href = '/projects'
})

$('.aboutUsBtn').on('click', function () {
    window.location.href = '/about'
})

$('.donateBtn').on('click', function () {
    window.location.href = '/donate'
})

$('.shelf3 .container .level3 .onetime').on('click', function () {
    $('.shelf3 .container .level3 .onetime').removeClass('selected').removeClass('idle')
    $(this).addClass('selected')
    $('.shelf3 .container .level3 .monthly').addClass('idle').removeClass('selected')
})

$('.shelf3 .container .level3 .monthly').on('click', function () {
    $('.shelf3 .container .level3 .monthly').removeClass('selected').removeClass('idle')
    $(this).addClass('selected')
    $('.shelf3 .container .level3 .onetime').addClass('idle').removeClass('selected')
})

$('.shelf3 .container .level4 .column .preset').on('click', function () {
    $('.shelf3 .container .level4 .column .preset').removeClass('selected')
    $(this).addClass('selected')
    $('.shelf3 .container .level4 .column .customAmount').val('')
})

$('.shelf3 .container .level4 .column .customAmount').keyup(function () {
    $('.shelf3 .container .level4 .column .preset').removeClass('selected')
})

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

var checkLuhn = function (cardNo) {
    var s = 0;
    var doubleDigit = false;
    for (var i = cardNo.length - 1; i >= 0; i--) {
        var digit = +cardNo[i];
        if (doubleDigit) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        s += digit;
        doubleDigit = !doubleDigit;
    }
    return s % 10 == 0;
}

var validateCardNo = function (no) {
    return (no && checkLuhn(no) &&
        no.length == 16 && (no[0] == 4 || no[0] == 5 && no[1] >= 1 && no[1] <= 5 ||
            (no.indexOf("6011") == 0 || no.indexOf("65") == 0)) ||
        no.length == 15 && (no.indexOf("34") == 0 || no.indexOf("37") == 0) ||
        no.length == 13 && no[0] == 4)
}

function validateExpDate(expDate) {
    var result = false;
    expDate = expDate.split('/');
    var pattern = /^\d{2}$/;

    if (expDate[0] < 1 || expDate[0] > 12)
        result = true;

    if (!pattern.test(expDate[0]) || !pattern.test(expDate[1]))
        result = true;

    if (expDate[2])
        result = true;

    if (result) {
        return false
    } else {
        return true
    }
}

function donatePhase2() {
    const customAmount = $('.shelf3 .container .level4 .column .customAmount').val()
    const selected = $(".shelf3 .container .level4 .column .selected")
    const paymentType = $(".shelf3 .container .level3 .selected").attr('id')

    if (customAmount.length == 0) {
        if (selected[0]) {
            const selectedAmount = selected.attr('id')

            $('.shelf3 .container .errorCon1').css('display', 'none')
            $('.shelf3 .container .errorCon2').css('display', 'none')
            $('.shelf3 .container .errorCon3').css('display', 'none')

            $('.shelf3 .container .level1').css('display', 'none')
            $('.shelf3 .container .level2').css('display', 'none')
            $('.shelf3 .container .level3').css('display', 'none')
            $('.shelf3 .container .level4').css('display', 'none')
            $('.shelf3 .container .level5').css('display', 'none')
            $('.shelf3 .container .level6').css('display', 'flex')
            $('.shelf3 .container .level7').css('display', 'flex')
            $('.shelf3 .container .level8').css('display', 'flex')
            $('.shelf3 .container .level9').css('display', 'none')
            $('.shelf3 .container .level10').css('display', 'none')
            $('.shelf3 .container .level11').css('display', 'none')
            $('.shelf3 .container .level12').css('display', 'none')

            $('.shelf3 .container .level6 .fa-arrow-right').on('click', function() {
                const firstName = $('.shelf3 .container .level7 .firstName').val()
                const lastName = $('.shelf3 .container .level7 .lastName').val()
                const email = $('.shelf3 .container .level7 .email').val()
    
                if (firstName.length != 0 && lastName.length != 0 && email != 0) {
                    if (validateEmail(email)) {
                        $('.shelf3 .container .errorCon1').css('display', 'none')
                        $('.shelf3 .container .errorCon2').css('display', 'none')
                        $('.shelf3 .container .errorCon3').css('display', 'none')
    
                        $('.shelf3 .container .level1').css('display', 'none')
                        $('.shelf3 .container .level2').css('display', 'none')
                        $('.shelf3 .container .level3').css('display', 'none')
                        $('.shelf3 .container .level4').css('display', 'none')
                        $('.shelf3 .container .level5').css('display', 'none')
                        $('.shelf3 .container .level6').css('display', 'none')
                        $('.shelf3 .container .level7').css('display', 'none')
                        $('.shelf3 .container .level8').css('display', 'none')
                        $('.shelf3 .container .level9').css('display', 'flex')
                        $('.shelf3 .container .level10').css('display', 'flex')
                        $('.shelf3 .container .level11').css('display', 'flex')
                        $('.shelf3 .container .level12').css('display', 'flex')
    
                        $('.shelf3 .container .level12 .donateOneTimeBtn').on('click', function () {
                            const cardNumber = $('.shelf3 .container .level10 .input-group .cardNumber').val()
                            const expirationDate = $('.shelf3 .container .level10 .input-group .expirationDate').val()
                            const cvc = $('.shelf3 .container .level10 .input-group .cvc').val()
                            const billingPostalCode = $('.shelf3 .container .level10 .input-group .billingPostalCode').val()
    
                            if (cardNumber.length != 0 && expirationDate.length != 0 && cvc.length != 0 && billingPostalCode.length != 0) {
                                if (validateCardNo(cardNumber) == true) {
                                    if (validateExpDate(expirationDate) == true) {
                                        if (cvc.length > 4) {
                                            $('.shelf3 .container .errorCon3').css('display', 'flex')
                                            $('.shelf3 .container .errorCon3 p').html('Enter a valid CVC')
                                        } else {
                                            $('.shelf3 .container .errorCon1').css('display', 'none')
                                            $('.shelf3 .container .errorCon2').css('display', 'none')
                                            $('.shelf3 .container .errorCon3').css('display', 'none')
    
                                            console.log({"first name": firstName, "last name": lastName, "email": email, "card number": cardNumber, 
                                        "expiration date": expirationDate, "cvc": cvc, "billing postal code": billingPostalCode, "payment type": paymentType, "payment amount": selectedAmount})
                                        }
                                    } else if (validateExpDate(expirationDate) == false) {
                                        $('.shelf3 .container .errorCon3').css('display', 'flex')
                                        $('.shelf3 .container .errorCon3 p').html('Enter a valid expiration date format')
                                    }
                                } else {
                                    $('.shelf3 .container .errorCon3').css('display', 'flex')
                                    $('.shelf3 .container .errorCon3 p').html('Enter a vaild card number')
                                }
                            } else {
                                $('.shelf3 .container .errorCon3').css('display', 'flex')
                                $('.shelf3 .container .errorCon3 p').html('Please fill all fields')
                            }
                        })
                    } else {
                        $('.shelf3 .container .errorCon2').css('display', 'flex')
                        $('.shelf3 .container .errorCon2 p').html('Enter a valid email address')
                    }
                } else {
                    $('.shelf3 .container .errorCon2').css('display', 'flex')
                    $('.shelf3 .container .errorCon2 p').html('Please fill all fields')
                }
            })

            $('.shelf3 .container .level8 .nextBtn').on('click', function () {
                const firstName = $('.shelf3 .container .level7 .firstName').val()
                const lastName = $('.shelf3 .container .level7 .lastName').val()
                const email = $('.shelf3 .container .level7 .email').val()

                if (firstName.length != 0 && lastName.length != 0 && email != 0) {
                    if (validateEmail(email)) {
                        $('.shelf3 .container .errorCon1').css('display', 'none')
                        $('.shelf3 .container .errorCon2').css('display', 'none')
                        $('.shelf3 .container .errorCon3').css('display', 'none')

                        $('.shelf3 .container .level1').css('display', 'none')
                        $('.shelf3 .container .level2').css('display', 'none')
                        $('.shelf3 .container .level3').css('display', 'none')
                        $('.shelf3 .container .level4').css('display', 'none')
                        $('.shelf3 .container .level5').css('display', 'none')
                        $('.shelf3 .container .level6').css('display', 'none')
                        $('.shelf3 .container .level7').css('display', 'none')
                        $('.shelf3 .container .level8').css('display', 'none')
                        $('.shelf3 .container .level9').css('display', 'flex')
                        $('.shelf3 .container .level10').css('display', 'flex')
                        $('.shelf3 .container .level11').css('display', 'flex')
                        $('.shelf3 .container .level12').css('display', 'flex')

                        $('.shelf3 .container .level12 .donateOneTimeBtn').on('click', function () {
                            const cardNumber = $('.shelf3 .container .level10 .input-group .cardNumber').val()
                            const expirationDate = $('.shelf3 .container .level10 .input-group .expirationDate').val()
                            const cvc = $('.shelf3 .container .level10 .input-group .cvc').val()
                            const billingPostalCode = $('.shelf3 .container .level10 .input-group .billingPostalCode').val()

                            if (cardNumber.length != 0 && expirationDate.length != 0 && cvc.length != 0 && billingPostalCode.length != 0) {
                                if (validateCardNo(cardNumber) == true) {
                                    if (validateExpDate(expirationDate) == true) {
                                        if (cvc.length > 4) {
                                            $('.shelf3 .container .errorCon3').css('display', 'flex')
                                            $('.shelf3 .container .errorCon3 p').html('Enter a valid CVC')
                                        } else {
                                            $('.shelf3 .container .errorCon1').css('display', 'none')
                                            $('.shelf3 .container .errorCon2').css('display', 'none')
                                            $('.shelf3 .container .errorCon3').css('display', 'none')

                                            console.log({"first name": firstName, "last name": lastName, "email": email, "card number": cardNumber, 
                                        "expiration date": expirationDate, "cvc": cvc, "billing postal code": billingPostalCode, "payment type": paymentType, "payment amount": selectedAmount})
                                        }
                                    } else if (validateExpDate(expirationDate) == false) {
                                        $('.shelf3 .container .errorCon3').css('display', 'flex')
                                        $('.shelf3 .container .errorCon3 p').html('Enter a valid expiration date format')
                                    }
                                } else {
                                    $('.shelf3 .container .errorCon3').css('display', 'flex')
                                    $('.shelf3 .container .errorCon3 p').html('Enter a vaild card number')
                                }
                            } else {
                                $('.shelf3 .container .errorCon3').css('display', 'flex')
                                $('.shelf3 .container .errorCon3 p').html('Please fill all fields')
                            }
                        })
                    } else {
                        $('.shelf3 .container .errorCon2').css('display', 'flex')
                        $('.shelf3 .container .errorCon2 p').html('Enter a valid email address')
                    }
                } else {
                    $('.shelf3 .container .errorCon2').css('display', 'flex')
                    $('.shelf3 .container .errorCon2 p').html('Please fill all fields')
                }
            })
        } else {
            $('.shelf3 .container .errorCon1').css('display', 'flex')
            $('.shelf3 .container .errorCon1 p').html('Please select or enter an amount')
        }
    } else {
        $('.shelf3 .container .errorCon1').css('display', 'none')
        $('.shelf3 .container .errorCon2').css('display', 'none')
        $('.shelf3 .container .errorCon3').css('display', 'none')

        $('.shelf3 .container .level1').css('display', 'none')
        $('.shelf3 .container .level2').css('display', 'none')
        $('.shelf3 .container .level3').css('display', 'none')
        $('.shelf3 .container .level4').css('display', 'none')
        $('.shelf3 .container .level5').css('display', 'none')
        $('.shelf3 .container .level6').css('display', 'flex')
        $('.shelf3 .container .level7').css('display', 'flex')
        $('.shelf3 .container .level8').css('display', 'flex')
        $('.shelf3 .container .level9').css('display', 'none')
        $('.shelf3 .container .level10').css('display', 'none')
        $('.shelf3 .container .level11').css('display', 'none')
        $('.shelf3 .container .level12').css('display', 'none')

        $('.shelf3 .container .level6 .fa-arrow-right').on('click', function() {
            const firstName = $('.shelf3 .container .level7 .firstName').val()
            const lastName = $('.shelf3 .container .level7 .lastName').val()
            const email = $('.shelf3 .container .level7 .email').val()

            if (firstName.length != 0 && lastName.length != 0 && email != 0) {
                if (validateEmail(email)) {
                    $('.shelf3 .container .errorCon1').css('display', 'none')
                    $('.shelf3 .container .errorCon2').css('display', 'none')
                    $('.shelf3 .container .errorCon3').css('display', 'none')

                    $('.shelf3 .container .level1').css('display', 'none')
                    $('.shelf3 .container .level2').css('display', 'none')
                    $('.shelf3 .container .level3').css('display', 'none')
                    $('.shelf3 .container .level4').css('display', 'none')
                    $('.shelf3 .container .level5').css('display', 'none')
                    $('.shelf3 .container .level6').css('display', 'none')
                    $('.shelf3 .container .level7').css('display', 'none')
                    $('.shelf3 .container .level8').css('display', 'none')
                    $('.shelf3 .container .level9').css('display', 'flex')
                    $('.shelf3 .container .level10').css('display', 'flex')
                    $('.shelf3 .container .level11').css('display', 'flex')
                    $('.shelf3 .container .level12').css('display', 'flex')

                    $('.shelf3 .container .level12 .donateOneTimeBtn').on('click', function () {
                        const cardNumber = $('.shelf3 .container .level10 .input-group .cardNumber').val()
                        const expirationDate = $('.shelf3 .container .level10 .input-group .expirationDate').val()
                        const cvc = $('.shelf3 .container .level10 .input-group .cvc').val()
                        const billingPostalCode = $('.shelf3 .container .level10 .input-group .billingPostalCode').val()

                        if (cardNumber.length != 0 && expirationDate.length != 0 && cvc.length != 0 && billingPostalCode.length != 0) {
                            if (validateCardNo(cardNumber) == true) {
                                if (validateExpDate(expirationDate) == true) {
                                    if (cvc.length > 4) {
                                        $('.shelf3 .container .errorCon3').css('display', 'flex')
                                        $('.shelf3 .container .errorCon3 p').html('Enter a valid CVC')
                                    } else {
                                        $('.shelf3 .container .errorCon1').css('display', 'none')
                                        $('.shelf3 .container .errorCon2').css('display', 'none')
                                        $('.shelf3 .container .errorCon3').css('display', 'none')

                                        console.log({"first name": firstName, "last name": lastName, "email": email, "card number": cardNumber, 
                                        "expiration date": expirationDate, "cvc": cvc, "billing postal code": billingPostalCode, "payment type": paymentType, "payment amount": customAmount})
                                    }
                                } else if (validateExpDate(expirationDate) == false) {
                                    $('.shelf3 .container .errorCon3').css('display', 'flex')
                                    $('.shelf3 .container .errorCon3 p').html('Enter a valid expiration date format')
                                }
                            } else {
                                $('.shelf3 .container .errorCon3').css('display', 'flex')
                                $('.shelf3 .container .errorCon3 p').html('Enter a vaild card number')
                            }
                        } else {
                            $('.shelf3 .container .errorCon3').css('display', 'flex')
                            $('.shelf3 .container .errorCon3 p').html('Please fill all fields')
                        }
                    })
                } else {
                    $('.shelf3 .container .errorCon2').css('display', 'flex')
                    $('.shelf3 .container .errorCon2 p').html('Enter a valid email address')
                }
            } else {
                $('.shelf3 .container .errorCon2').css('display', 'flex')
                $('.shelf3 .container .errorCon2 p').html('Please fill all fields')
            }
        })

        $('.shelf3 .container .level8 .nextBtn').on('click', function () {
            const firstName = $('.shelf3 .container .level7 .firstName').val()
            const lastName = $('.shelf3 .container .level7 .lastName').val()
            const email = $('.shelf3 .container .level7 .email').val()

            if (firstName.length != 0 && lastName.length != 0 && email != 0) {
                if (validateEmail(email)) {
                    $('.shelf3 .container .errorCon1').css('display', 'none')
                    $('.shelf3 .container .errorCon2').css('display', 'none')
                    $('.shelf3 .container .errorCon3').css('display', 'none')

                    $('.shelf3 .container .level1').css('display', 'none')
                    $('.shelf3 .container .level2').css('display', 'none')
                    $('.shelf3 .container .level3').css('display', 'none')
                    $('.shelf3 .container .level4').css('display', 'none')
                    $('.shelf3 .container .level5').css('display', 'none')
                    $('.shelf3 .container .level6').css('display', 'none')
                    $('.shelf3 .container .level7').css('display', 'none')
                    $('.shelf3 .container .level8').css('display', 'none')
                    $('.shelf3 .container .level9').css('display', 'flex')
                    $('.shelf3 .container .level10').css('display', 'flex')
                    $('.shelf3 .container .level11').css('display', 'flex')
                    $('.shelf3 .container .level12').css('display', 'flex')

                    $('.shelf3 .container .level12 .donateOneTimeBtn').on('click', function () {
                        const cardNumber = $('.shelf3 .container .level10 .input-group .cardNumber').val()
                        const expirationDate = $('.shelf3 .container .level10 .input-group .expirationDate').val()
                        const cvc = $('.shelf3 .container .level10 .input-group .cvc').val()
                        const billingPostalCode = $('.shelf3 .container .level10 .input-group .billingPostalCode').val()

                        if (cardNumber.length != 0 && expirationDate.length != 0 && cvc.length != 0 && billingPostalCode.length != 0) {
                            if (validateCardNo(cardNumber) == true) {
                                if (validateExpDate(expirationDate) == true) {
                                    if (cvc.length > 4) {
                                        $('.shelf3 .container .errorCon3').css('display', 'flex')
                                        $('.shelf3 .container .errorCon3 p').html('Enter a valid CVC')
                                    } else {
                                        $('.shelf3 .container .errorCon1').css('display', 'none')
                                        $('.shelf3 .container .errorCon2').css('display', 'none')
                                        $('.shelf3 .container .errorCon3').css('display', 'none')

                                        console.log({"first name": firstName, "last name": lastName, "email": email, "card number": cardNumber, 
                                        "expiration date": expirationDate, "cvc": cvc, "billing postal code": billingPostalCode, "payment type": paymentType, "payment amount": customAmount})
                                    }
                                } else if (validateExpDate(expirationDate) == false) {
                                    $('.shelf3 .container .errorCon3').css('display', 'flex')
                                    $('.shelf3 .container .errorCon3 p').html('Enter a valid expiration date format')
                                }
                            } else {
                                $('.shelf3 .container .errorCon3').css('display', 'flex')
                                $('.shelf3 .container .errorCon3 p').html('Enter a vaild card number')
                            }
                        } else {
                            $('.shelf3 .container .errorCon3').css('display', 'flex')
                            $('.shelf3 .container .errorCon3 p').html('Please fill all fields')
                        }
                    })
                } else {
                    $('.shelf3 .container .errorCon2').css('display', 'flex')
                    $('.shelf3 .container .errorCon2 p').html('Enter a valid email address')
                }
            } else {
                $('.shelf3 .container .errorCon2').css('display', 'flex')
                $('.shelf3 .container .errorCon2 p').html('Please fill all fields')
            }
        })
    }
}

$('.shelf3 .container .level5 .nextBtn').on('click', function () {
    donatePhase2()
})

$('.shelf3 .container .level1 .fa-arrow-right').on('click', function() {
    donatePhase2()
})

$('.shelf3 .container .level6 .fa-arrow-left').on('click', function() {
    $('.shelf3 .container .errorCon1').css('display', 'none')
    $('.shelf3 .container .errorCon2').css('display', 'none')
    $('.shelf3 .container .errorCon3').css('display', 'none')

    $('.shelf3 .container .level1').css('display', 'flex')
    $('.shelf3 .container .level2').css('display', 'flex')
    $('.shelf3 .container .level3').css('display', 'flex')
    $('.shelf3 .container .level4').css('display', 'flex')
    $('.shelf3 .container .level5').css('display', 'flex')
    $('.shelf3 .container .level6').css('display', 'none')
    $('.shelf3 .container .level7').css('display', 'none')
    $('.shelf3 .container .level8').css('display', 'none')
    $('.shelf3 .container .level9').css('display', 'none')
    $('.shelf3 .container .level10').css('display', 'none')
    $('.shelf3 .container .level11').css('display', 'none')
    $('.shelf3 .container .level12').css('display', 'none')
})

$('.shelf3 .container .level9 .fa-arrow-left').on('click', function() {
    $('.shelf3 .container .errorCon1').css('display', 'none')
    $('.shelf3 .container .errorCon2').css('display', 'none')
    $('.shelf3 .container .errorCon3').css('display', 'none')

    $('.shelf3 .container .level1').css('display', 'none')
    $('.shelf3 .container .level2').css('display', 'none')
    $('.shelf3 .container .level3').css('display', 'none')
    $('.shelf3 .container .level4').css('display', 'none')
    $('.shelf3 .container .level5').css('display', 'none')
    $('.shelf3 .container .level6').css('display', 'flex')
    $('.shelf3 .container .level7').css('display', 'flex')
    $('.shelf3 .container .level8').css('display', 'flex')
    $('.shelf3 .container .level9').css('display', 'none')
    $('.shelf3 .container .level10').css('display', 'none')
    $('.shelf3 .container .level11').css('display', 'none')
    $('.shelf3 .container .level12').css('display', 'none')
})
