function getCurrentYear() {
    const today = new Date();
    const currentYear = today ? today.getFullYear() : 2020;
    return currentYear;
}

function assignYearForFooter() {
    const footer = document.querySelector('.footer');
    if(footer) {
        footer.innerHTML = '&copy; ' + getCurrentYear() + ' All right reserved';
    }
}
assignYearForFooter();