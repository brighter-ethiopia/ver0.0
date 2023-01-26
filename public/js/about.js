$(document).ready(function() {
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

$('.shelf1 .languagesCon .lan-en').on('click', function() {
    $('.en').css('display', 'flex')
    $('.amh').css('display', 'none')
    $('.shelf1 .languagesCon .lan-en').removeClass('idle').addClass('current')
    $('.shelf1 .languagesCon .lan-amh').removeClass('current').addClass('idle')
    localStorage.setItem('lang', 'en');
})

$('.shelf1 .languagesCon .lan-amh').on('click', function() {
    $('.amh').css('display', 'flex')
    $('.en').css('display', 'none')
    $('.shelf1 .languagesCon .lan-amh').removeClass('idle').addClass('current')
    $('.shelf1 .languagesCon .lan-en').removeClass('current').addClass('idle')
    localStorage.setItem('lang', 'amh');
})

$('.homeBtn').on('click', function() {
    window.location.href = '/home'
})

$('.projectsBtn').on('click', function() {
    window.location.href = '/projects'
})

$('.aboutUsBtn').on('click', function() {
    window.location.href = '/about'
})

$('.donateBtn').on('click', function() {
    window.location.href = '/donate'
})