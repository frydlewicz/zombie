function getTimestampOfMidnight() {
    const date = new Date();

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    return Date.UTC(year, month, day);
}

module.exports = { getTimestampOfMidnight };
