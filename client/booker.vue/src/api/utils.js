export default {

    toTimestampFormat(date) {
        // let date = new Date(dateStr + " " + timeStr);
        return (date.getTime() / 1000).toFixed();
      },
      formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : "" + month;
        let day = date.getDate();
        day = day < 10 ? "0" + day : "" + day;
        return "" + year + "-" + month + "-" + day;
      },

}