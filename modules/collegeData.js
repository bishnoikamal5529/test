const Sequelize = require('sequelize');

var sequelize = new Sequelize('d242i5a43v0ikf', 'axouvgjkppzzpd', 'c11806aebe77273a3d267469ac5492ca5dd83095f0d4b15b990da5c0fbf84ad0', {
    host :'ec2-54-152-28-9.compute-1.amazonaws.com',
    dialect:'postgres',
    port:5432,
    dialectOptions:{
        ssl:{rejectUnauthorized:false}
    },
    query: {raw :true}
});

var Student =  sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
});

var Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
});

Course.hasMany(Student, {foreignKey:'course'});


module.exports.initialize = function () {
    return new Promise(function(resolve,reject){
        sequelize.sync().then(function(){
                resolve("Sync to the database is successfull.");
        }).catch(function(){
            reject("unable to sync the database");
        });
    });
};
module.exports.getAllStudents = function(){
    return new Promise(function(resolve,reject){
        Student.findAll().then(function(data){
                resolve(data);
        }).catch(function(){
                reject("No results returned");
        });
    });
};

module.exports.getCourses = function(){
    return new Promise(function(resolve,reject){
        Course.findAll().then(function(data){
            resolve(data);
    }).catch(function(){
            reject("No results returned");
    });
});
};
module.exports.getStudentByNum = function (num) {
    return new Promise(function(resolve,reject){
        Student.findAll({
            attributes: [num]
           }).then(function(data){
                resolve(data[0]);
           }
           ).catch(function(){reject("no result returned");});
        });
    };



module.exports.getStudentsByCourse = function (course) {
    return new Promise(function(resolve,reject){
       Student.findAll({
        attributes: [course]
       }).then(function(data){
            resolve(data);
       }
       ).catch(function(){reject("no result returned");});
    });
};

module.exports.getCourseById = function (id) {
    return new Promise(function(resolve,reject){
        Course.findAll({
            attributes: [id]
           }).then(function(data){
                resolve(data[0]);
           }
           ).catch(function(){reject("no result returned");});
        });
    };
module.exports.addCourse = function(courseData){
    return new Promise(function(resolve,reject){
        for (const values in courseData)
        {
            if (!courseData[values]) 
            {
                courseData[values] = null; 
            }
        }
        Course.create().then(function(){
            resolve("Course creation was successfull.");
        }).catch(function(){
            reject("Unable to Create Course");
        });
    });
};

module.exports.addStudent = function (studentData) {
    return new Promise(function(resolve,reject){
        studentData.TA = (studentData.TA) ? true:false;
        for (const values in studentData)
        {
            if (!studentData[values]) 
            {
                studentData[values] = null; 
            }
        }
        Student.create().then(function(){
            resolve("Student creation was successfull.");
        }).catch(function(){
            reject("Unable to Create Student");
        });
    });
};

module.exports.updateStudent = function (studentData) {
    return new Promise(function(resolve,reject){
        studentData.TA = (studentData.TA) ? true:false;
        for (const values in studentData)
        {
            if (!studentData[values]) 
            {
                studentData[values] = null; 
            }
        }
        Student.update({
            where: {studentNum: studentData.studentNum}
        }).then(function(){
            resolve("Successfully updated.");
        }).catch(function(){
            reject("Unable to update student");
        });
    });
}

module.exports.updateCourse = function(courseData){
    return new Promise(function(resolve,reject){
        for (const values in courseData)
        {
            if (!courseData[values]) 
            {
                courseData[values] = null; 
            }
        }
        Course.update({
            where: {courseId: courseData.courseId}
        }).then(function(){
            resolve("Successfully updated.");
        }).catch(function(){
            reject("Unable to update Course");
        });
    });
};

module.exports.deleteCourseById = function(id){
    return new Promise(function(resolve,reject){
        Course.destroy({
            where: {courseId:id}
        }).then(function(){
            resolve("Deleted");
        }).catch(function(){
            reject("Error in Deletion");
        });
    });
};

module.exports.deleteStudentByNum = function(studentNum){
    return new Promise(function(resolve,reject){
        Student.destroy({
            where: {studentNum : studentNum}
        }).then(function(){
            resolve("destroyed");
        }).catch(function(){
            reject("Error in destroying");
        });
    });
};
