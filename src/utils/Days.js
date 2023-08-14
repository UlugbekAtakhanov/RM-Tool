import { isWeekend, parse } from "date-fns";

// list of dates
export const days = (start, end) => {
    let arr = [];
    let current = new Date(start);
    let last = new Date(end);

    while (current <= last) {
        arr.push(current.toDateString());
        current.setDate(current.getDate() + 1);
    }

    const newArr = arr.map((item) => {
        const parsedDate = parse(item, "EEE MMM dd yyyy", new Date());
        const isWeekends = isWeekend(parsedDate);
        return { date: parsedDate, isWeekends };
    });
    return newArr;
};

//  days in milliseconds
export const getAmountDay = (n) => 1000 * 60 * 60 * 24 * n;

// milliseconds in days
export const millisecondToDay = (ml) => ml / (1000 * 60 * 60 * 24);
