$('.placeAdBtnCon button').on('click', function() {
    location.href = '/post_an_ad'
})

$('.shelf1 .topShelf1Items .centerShelf1Items .centerShelf1ItemsSearchbarCon .mainSearchbarCon .input-group .input-group-append span').on('click', function() {
    const search_val = $('.shelf1 .topShelf1Items .centerShelf1Items .centerShelf1ItemsSearchbarCon .mainSearchbarCon .input-group input').val()
    if (search_val.length != 0) {
        location.href = `/search_results?${search_val}`
    }
})

$('.shelf1 .topShelf1Items .centerShelf1Items .centerShelf1ItemsSearchbarCon .mainSearchbarCon .input-group .form-control').on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        const search_val = $(this).val()
        if (search_val.length != 0) {
            location.href = `/search_results?${search_val}`
        }
    }
});

$('.shelf1 .bottomShelf1Items .bottomShelf1ItemsGroup2 p').on('click', function () {
    const clickedTab = $(this).html().toLowerCase()
    if (clickedTab == 'home') {
        location.href = '/home'
    }
})

$(document).on('click', '.shelf1 .bottomShelf1Items .bottomShelf1ItemsGroup3 .quickLinks .account ul li .myAccount', function() {
    location.href = '/my_account'
})

$(document).on('click', '.shelf1 .bottomShelf1Items .bottomShelf1ItemsGroup3 .quickLinks .account ul li .logout', function() {
    const currentUrl = location.href
    fetch('/api/server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            request: `{"requestType": "logout", "currentUrl": "${currentUrl}"}`
        })
    })
        .then((res) => res.json())
        .then(data => {
            if (data.status == 'success') {
                location.href = data.previousUrl
            }
        });
})

$('.shelf1 .bottomShelf1Items .bottomShelf1ItemsGroup3 .quickLinks .dropdown button .fa-heart').on('click', function() {
    location.href = '/myFavorites'
})

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction);
}

function successFunction(position) {
    var userLat = position.coords.latitude;
    var userLong = position.coords.longitude;

    var getCitySettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://us1.locationiq.com/v1/reverse?key=pk.55397e7aa188d68fc571ccc54f9eea44&lat=${userLat}&lon=${userLong}&format=json`,
        "method": "GET"
    }

    $.ajax(getCitySettings).done(function (response) {
        $('.shelf1 .topShelf1Items .rightShelf1Items .currentUserAddressStatusDisplayCon p ').html(`<i class="fa-solid fa-location-crosshairs"></i>&nbsp;${response.address.state}`)
    });
}