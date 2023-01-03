import moment from "moment";

export const formatDate = (date: Date) => moment(date).format("DD-MM-YYYY");
export const formatDBDate = (date: Date) => moment(date).format("YYYY-MM-DD");
export const currentDate = () => moment(new Date()).format("DD/MM/YYYY");
export const displayDateFormat = "dd/MM/yyyy";
export const displayDateFormat2 = "yyyy-MM-dd";
