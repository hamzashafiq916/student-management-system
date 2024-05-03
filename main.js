import inquirer from "inquirer";
class student {
    id;
    name;
    courseEnrolled;
    feesAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt([
        {
            name: "ans",
            type: "list",
            message: "Please select an option",
            choices: ["Enroll a student", "Show student status"],
        },
    ]);
    if (action.ans == "Enroll a student") {
        let studentName = await inquirer.prompt({
            name: "ans",
            type: "input",
            message: "Please enter your name:",
        });
        let trimmedStudentname = studentName.ans.trim().toLowerCase();
        let studentNameCheck = students.map((obj) => obj.name);
        if (studentNameCheck.includes(trimmedStudentname) === false) {
            if (trimmedStudentname !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour account has been created");
                console.log(`\n\tWelcome, ${trimmedStudentname}!`);
                let course = await inquirer.prompt({
                    name: "ans",
                    type: "list",
                    message: "Please select a course:",
                    choices: ["English", "Computer", "Math"],
                });
                let coursefees = 0;
                switch (course.ans) {
                    case "English":
                        coursefees = 5000;
                        break;
                    case "Computer":
                        coursefees = 7000;
                        break;
                    case "Math":
                        coursefees = 9000;
                        break;
                    default:
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course",
                });
                if (courseConfirm.ans === true) {
                    let Studentcon = new student(studentId, trimmedStudentname, [course.ans], coursefees);
                    students.push(Studentcon);
                    console.log(`You have enrolled in this course`);
                }
            }
            else {
                console.log(`Invalid name`);
            }
        }
        else {
            console.log(`This name is already available`);
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studenNameChecks = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select name",
                choices: studenNameChecks
            });
            let foundStudent = students.find(Studentcon => Studentcon.name === selectedStudent.ans);
            console.log(`Student information`);
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log(`Record is empty`);
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue",
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
