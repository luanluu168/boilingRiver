function getTimeStamp() {
    let today = new Date();

    let date = ("0" + today.getDate()).slice(-2);

    // current month
    let month = ("0" + (today.getMonth() + 1)).slice(-2);

    // current year
    let year = today.getFullYear();

    // current hours
    let hours = today.getHours();

    // current minutes
    let minutes = today.getMinutes();

    // current seconds
    let seconds = today.getSeconds();

    let timeStamp = year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;
    return timeStamp;
}

function getNextWeekTimeStamp() {
    var firstDay = new Date();
    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

    let date = ("0" + nextWeek.getDate()).slice(-2);

    // current month
    let month = ("0" + (nextWeek.getMonth() + 1)).slice(-2);

    // current year
    let year = nextWeek.getFullYear();

    // current hours
    let hours = nextWeek.getHours();

    // current minutes
    let minutes = nextWeek.getMinutes();

    // current seconds
    let seconds = nextWeek.getSeconds();

    let timeStamp = year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;
   
    return timeStamp;
}

module.exports = {getTimeStamp, getNextWeekTimeStamp};