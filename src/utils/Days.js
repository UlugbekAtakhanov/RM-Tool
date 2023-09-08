import { format, isWeekend, parse } from "date-fns";

// days with weekends
export const daysWithWeekends = (start, end) => {
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

// days without weekends
export const daysWithoutWeekends = (start, end) => {
    let arr = [];
    let current = new Date(start);
    let last = new Date(end);

    while (current <= last) {
        arr.push(current.toDateString());
        current.setDate(current.getDate() + 1);
    }

    const newArr = arr.reduce((acc, curr) => {
        const parsedDate = parse(curr, "EEE MMM dd yyyy", new Date());
        const isWeekends = isWeekend(parsedDate);
        if (!isWeekends) {
            return [...acc, { date: parsedDate, isWeekends }];
        }
        return acc;
    }, []);
    return newArr;
};

//  days in milliseconds
export const daysInMilliseconds = (n) => 1000 * 60 * 60 * 24 * n;

// milliseconds in days
export const millisecondsInDays = (ml) => ml / (1000 * 60 * 60 * 24);

// formatting date
export const formattingDate = (date) => format(new Date(date), "MMM dd, yyyy");
