import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import app from '../src/App';
import { Course } from '../src/core/Course';
import { Student } from '../src/core/Student';



chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

let courses = require('../src/data/courses.json');
let students = require('../src/data/students.json');

async function loginTeacher() {
    chai.request(app).get('/api/v1/login?email=teacher%2B3%40gmail.com&password=1234')
        .then(res => {
            expect(res.body.token).to.eq(md5('teacher+3@gmail.com'))
            expect('07e74791d927adb57bc6cd448aa7e34f').to.eq(md5('teacher+3@gmail.com'))
        });
}

async function loginStudent() {
    chai.request(app).get('/api/v1/login?email=student%2B3%40gmail.com&password=1234')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.token).to.equal(md5('student+3@gmail.com'))
        });
}

async function insertNote(course: number, type: string, type_id: number, note: number) {
    chai.request(app).get('/api/v1/student/note?course=' + course.toString() + '&type=' + type + '&type_id=' + type_id.toString() + '&note=' + note.toString())
        .set('token', md5('student+3@gmail.com'))
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
        });
}


describe('baseRoute', () => {

    it('should be json', async () => {
        const res = await chai.request(app).get('/');
        expect(res.type).to.eql('text/html');
    }, 10000);

});


describe('Login', () => {

    it('Login teacher', async () => {
        return loginTeacher()
    }, 10000)

    it('Login student ', async () => {
        return loginStudent()
    }, 10000);

    it('Login with invalid email', async () => {
        const res = await chai.request(app).get('/api/v1/login?email=invalid%2B3%40gmail.com&password=1234')
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.eq('Error: Email and password do not match a student or a teacher')
    }, 10000)

    it('Login teacher V2', async () => {
        // console.log("Login teacher V2")
        const res = await chai.request(app).get('/api/v2/login?email=teacher%2B3%40gmail.com&password=1234')
        expect(res.status).to.equal(200);
        // console.log(res.body);
        expect(res).to.be.json;
        expect(res.body.token).to.eq(md5('teacher+3@gmail.com'))
    }, 10000)

    it('Login student V2', async () => {
        const res = await chai.request(app).get('/api/v2/login?email=student%2B3%40gmail.com&password=1234')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.token).to.eq(md5('student+3@gmail.com'))
    }, 10000)

    it('LoginV2 with invalid email', async () => {
        const res = await chai.request(app).get('/api/v2/login?email=invalid%2B3%40gmail.com&password=1234')
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.eq('Error: Email and password do not match a student or a teacher')
    }, 10000)
});

describe('Teacher', () => {
    beforeEach(async () => {
        loginTeacher()
    })

    describe('Get Courses', () => {

        it('responds with successful call for courses with valid teacher token ', async () => {
            let result = [Course.fromId(3), Course.fromId(4)];
            const res = await chai.request(app).get('/api/v1/courses')
                .set('token', md5('teacher+3@gmail.com'))
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.data).to.deep.equal(result);
        }, 10000);

        it('responds with error if call for courses with invalid teacher token ', async () => {
            const res = await chai.request(app).get('/api/v1/courses')
            //.set('token',)
            expect(res.status).to.equal(500);
            expect(res).to.be.json;
            expect(res.body.error).to.equal("Error: Teacher token not found")
        }, 10000);
    });

    describe('get Students', () => {
        it('responds with successful call for students with valid teacher token ', async () => {
            let students_following_course_3_teached_by_teacher_3 = [Student.fromId(2), Student.fromId(6)];
            const res = await chai.request(app).get('/api/v1/course/3/students')
                .set('token', md5('teacher+3@gmail.com'))
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.data).to.deep.equal(students_following_course_3_teached_by_teacher_3);
        }, 10000);

        it('responds with error if call for students with invali teacher token ', async () => {
            const res = await chai.request(app).get('/api/v1/course/3/students')
                .set('token', 'invalid_token')
            expect(res.status).to.equal(500);
            expect(res).to.be.json;
            expect(res.body.error).to.equal('Error: Teacher token not found')
        }, 10000);

        it('responds with error if teacher do not teach course', async () => {
            const res = await chai.request(app).get('/api/v1/course/3/students')
                .set('token', md5('teacher+1@gmail.com'))
            expect(res.status).to.equal(500);
            expect(res).to.be.json;
            expect(res.body.error).to.equal('Error: This teacher do not give this course')
        }, 10000);
    });
});

describe('Student notes', () => {
    beforeEach(async () => {
        loginStudent()
    })

    it('should not crash if student have no notes', async () => {
        const res = await chai.request(app).get('/api/v1/student/notes/')
            .set('token', md5('student+3@gmail.com'))
        expect(res.status).to.equal(200);
    }, 10000);


    it('responds with error if call for note is done without authentification token', async () => {
        const res = await chai.request(app).get('/api/v1/student/note?course=12&type=devoir&type_id=13&note=65.02')
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.equal('Error: Student token not found')
    }, 10000);

    it('responds with successful call for notes', async () => {
        insertNote(1, "devoir", 2, 33.33);
        insertNote(4, "devoir", 5, 66.66);

        const res = await chai.request(app).get('/api/v1/student/notes/')
            .set('token', md5('student+3@gmail.com'))
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.data[0]).to.deep.equal({ course: 1, type: 'devoir', type_id: 2, note: 33.33 });
        expect(res.body.data[1]).to.deep.equal({ course: 4, type: 'devoir', type_id: 5, note: 66.66 });
    }, 10000);


    it('responds with error on call for notes with invalid authentification', async () => {
        insertNote(1, 'devoir', 2, 33.33)

        const res = await chai.request(app).get('/api/v1/student/notes/')
            .set('token', md5('invalid@gmail.com'))
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.data).to.equal(undefined)
    }, 10000);

});

describe('student courses', () => {

    beforeEach(async () => {
        loginStudent(), 6
    });

    it('responds with all courses of a student', async () => {
        let expected_results = [Course.fromId(5), Course.fromId(6)];

        const res = await chai.request(app).get('/api/v1/student/courses')
            .set('token', md5('student+3@gmail.com'))
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.data).to.deep.equal(expected_results);
    }, 10000);

    it('responds fail if token is teacher', async () => {
        const res = await chai.request(app).get('/api/v1/student/courses')
            .set('token', md5('teacher+3@gmail.com'))
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.equal('Error: Student token not found')
    }, 10000);
});

describe('course notes', () => {
    beforeEach(async () => {
        loginStudent()
        insertNote(1, 'devoir', 2, 33.33)
        insertNote(2, 'questionnaire', 5, 66.66)
        insertNote(2, 'questionnaire', 7, 88.88)
        loginTeacher()
    });

    it('responds with all notes for a course', async () => {
        const res = await chai.request(app).get('/api/v1/course/2/notes')
            .set('token', md5('teacher+3@gmail.com'))
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        let sortedData = res.body.data.sort((n1, n2) => n1.type_id - n2.type_id);
        expect(sortedData[0]).to.deep.equal({ "course": 2, "student": 3, "note": 66.66, "type": "questionnaire", "type_id": 5 })
        expect(sortedData[1]).to.deep.equal({ "course": 2, "student": 3, "note": 88.88, "type": "questionnaire", "type_id": 7 })
    }, 10000);

    it('responds with and error when trying to get notes for a course without authentification', async () => {
        const res = await chai.request(app).get('/api/v1/course/2/notes')
            .set('token', '')
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.equal('Error: Teacher token not found')
    }, 10000);
});

describe('test utility', () => {

    beforeEach(async () => {
        loginStudent()
        insertNote(1, 'devoir', 2, 33.33)
    }, 10000);

    it('respond successfuly when changing server latency', async () => {
        const res = await chai.request(app).get('/api/v1/latency?value=1.1')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.data).to.equal(1.1)
    }, 10000);

    it('respond with error if trying to clear notes without login', async () => {
        const res = await chai.request(app).get('/api/v1/notes/clear')
            .set('token', '')
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.equal('Error: Teacher token not found')
    }, 10000);

    it('clear all notes', async () => {
        loginTeacher()

        const res = await chai.request(app).get('/api/v1/notes/clear')
            .set('token', md5('teacher+3@gmail.com'))
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.data).to.equal(undefined)

        const res2 = await chai.request(app).get('/api/v1/course/1/notes')
            .set('token', md5('teacher+3@gmail.com'))
        expect(res2.status).to.equal(200);
        expect(res2).to.be.json;
        expect(res2.body.data).to.deep.equal([])
    }, 10000);

    it('fail to set student note when teacher do not give course', async () => {
        loginTeacher()

        const res = await chai.request(app).post('/api/v1/note?student_id=1&course_id=1&type=Question&type_id=1&note=99.99')
            .set('token', md5('teacher+3@gmail.com'))
        expect(res).to.be.json;
        expect(res.body.error).to.equal("Error: This teacher do not give this course")
        expect(res.status).to.equal(500);

    }, 10000);


    it('fail to set student note when student do not follow course', async () => {
        loginTeacher()

        const res = await chai.request(app).post('/api/v1/note?student_id=3&course_id=1&type=Question&type_id=1&note=99.99')
            .set('token', md5('teacher+1@gmail.com'))
        expect(res.status).to.equal(500);
        expect(res).to.be.json;
        expect(res.body.error).to.equal("Error: This student to not follow this course")
    }, 10000);

    it('set student note', async () => {
        loginTeacher()

        const res = await chai.request(app).post('/api/v1/note?student_id=1&course_id=1&type=Question&type_id=1&note=99.99')
            .set('token', md5('teacher+1@gmail.com'))
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
    }, 10000);
});

