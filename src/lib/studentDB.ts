import { readFileSync } from 'fs';
import './types';
import type { Student } from './types';

const t = readFileSync('static/stud_directory.csv', 'utf-8');
let rows: string[][] = [];
    t.split("\n").forEach((item) => {
        let comma_sep = item
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x != "")
            .reduce(
                (acc, current) => {
                    if (current[0] == '"' && acc.state == "close") {
                        acc.state = "open";
                        acc.items.push(current.slice(1));
                    } else if (
                        current[current.length - 1] == '"' &&
                        acc.state == "open"
                    ) {
                        acc.state = "close";
                        acc.items[acc.items.length - 1] +=
                            ", " + current.slice(0, current.length - 1);
                    } else if (acc.state == "close") {
                        acc.items.push(current);
                    } else if (acc.state == "open") {
                        acc.items[acc.items.length - 1] += ", " + current;
                    }
                    return acc;
                },
                {
                    state: "close",
                    items: [],
                } as {
                    state: string;
                    items: string[];
                }
            );
        rows.push(comma_sep.items);
    });

let studentsObj = rows.slice(1).reduce((obj, row) => {
    obj[row[3]] = {
        name: row[0],
        year: row[1],
        address: row[2],
        mailbox: row[3],
        ho_city: row[4],
        ho_state: row[5],
        email: row[6]}
    return obj;
    }, {} as Record<string, Student>
);

let studentsList = rows.slice(1).reduce((arr, row) => {
    arr.push({
        name: row[0],
        year: row[1],
        address: row[2],
        mailbox: row[3],
        ho_city: row[4],
        ho_state: row[5],
        email: row[6]})
    return arr;
    }, [] as Student[]
);

export const asObj = () => {
    return studentsObj;
}

export const asList = () => {
    return studentsList;
}

export const getRoommates = (room: string) => {
    let result: Student[] = [];
    studentsList.forEach((student) => {
        if(student.address == room) {
            result.push(student);
        }
    });
    return result;
}