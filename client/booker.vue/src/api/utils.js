export default {

    toTimestampFormat(date) {
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

      digitTime(date){
        return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
      },

}