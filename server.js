const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const es6Renderer = require('express-es6-template-engine');
const path = require('path');
var d3 = require("d3");
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));



//User to store ans.
var User = null;
var CM_Ans;
var CI_Ans;
var IaaS_Ans;
var AMT_Ans;
var CD_Ans;
var CDel_Ans;
var CMonitor_Ans;
// Jade
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

//Comment according to score
var CM_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var CI_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var ATM_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var IaaS_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var CDel_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var CDep_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var CMon_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var Total_cmt = 'Agile practices might be in use, but DevOps practices are limited';
var CM_level = 'Base';
var CI_level = 'Base';
var ATM_level = 'Base';
var CDel_level = 'Base';
var CDep_level = 'Base';
var CMon_level = 'Base';
var IaaS_level = 'Base';
var Total_level = 'Base';

//*****************SQL Connection******************//
/*
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json 
app.use(bodyParser.json());


// to connect database
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'devops_maturity'
	
	
});

connection.connect(function(err){
	if(err) throw err;
	
	console.log('connected....');
});
*/
/////////////////////////// MongoDB Connection //////////////////////////
app.use(express.urlencoded({ extended: false }));

/*
// Connect to MongoDB
var dbo;
mongoose.connect('mongodb://mongo:27017/DevOpsDatabase', { useNewUrlParser: true },function(db))
.then(() => console.log('MongoDB Connected')
dbo = db.db("DevOpsDatabase")
)
.catch(err => console.log(err));

*/
var uri = "mongodb://127.0.0.1:27017/kennel";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
  
const Item = require('./models/Item');

//*****************Get Methods**************************//
app.get('/', function(req, res){
  res.render('home', {
  });
});

app.get('/Questionaire', function(req, res){
  res.render('Questionnair', {
    title: "Welcome to Home page"
  });
});
app.get('/signin_signup', function(req, res){
  res.render('signin_signup', {
	title: "Welcome to Home page"
  });
});

app.get('/signup', function(req, res){
  res.render('SignUp', {
    title: "Welcome to Home page"
  });
});

app.get('/Login', function(req, res){
  res.render('Login', {
    title: "Welcome to Home page"
  });
});

app.get('/Admin', function(req, res){
  res.render('Admin', {
    title: "Welcome to Home page"
  });
});
app.get('/ResetPass', function(req, res){
  res.render('ResetPass', {
  });
});
//results
app.get('/report', function(req, res){
	var aa;
	
	// Total
	if(Total > 32 &&  Total <=92){
		Total_cmt = 'Foundational use of DevOps practices ';
		Total_level = 'Beginer';
		
	}
	if(98< Total && Total<= 164){
		Total_cmt = 'Stabilized use of DevOps practices ';
		Total_level = 'Intermediate ';
	}
	if(164< Total && Total<= 230){
		Total_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		Total_level = 'Advanced  ';
	}
	if(230< Total){
		Total_cmt = 'No cultural barriers  Role model DevOps implementation';
		Total_level = 'Extreme   ';
	}
	//configuration management
	if(32< Conf_manage_Total && Conf_manage_Total<= 98){
		CM_cmt = 'Foundational use of DevOps practices ';
		CM_level = 'Beginer';
	}
	if(98< Conf_manage_Total && Conf_manage_Total<= 164){
		CM_cmt = 'Stabilized use of DevOps practices ';
		CM_level = 'Intermediate ';
	}
	if(164< Conf_manage_Total && Conf_manage_Total<= 230){
		CM_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		CM_level = 'Advanced  ';
	}
	if(230< Conf_manage_Total){
		CM_cmt = 'No cultural barriers  Role model DevOps implementation';
		CM_level = 'Extreme   ';
	}
	//CI_Comment
	if(32< CI_Exam_Total && CI_Exam_Total<= 98){
		CI_cmt = 'Foundational use of DevOps practices ';
		CI_level = 'Beginer';
	}
	if(98< CI_Exam_Total && CI_Exam_Total<= 164){
		CI_cmt = 'Stabilized use of DevOps practices ';
		CI_level = 'Intermediate ';
	}
	if(164< CI_Exam_Total && CI_Exam_Total<= 230){
		CI_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		CI_level = 'Advanced  ';
	}
	if(230< CI_Exam_Total){
		CI_cmt = 'No cultural barriers Role model DevOps implementation';
		CI_level = 'Extreme   ';
	}
	//IaaS comment
	if(32< IaaS_Exam_Total && IaaS_Exam_Total<= 98){
		IaaS_cmt = 'Foundational use of DevOps practices ';
		IaaS_level = 'Beginer';
	}
	if(98< IaaS_Exam_Total && IaaS_Exam_Total<= 164){
		IaaS_cmt = 'Stabilized use of DevOps practices ';
		IaaS_level = 'Intermediate ';
	}
	if(164< IaaS_Exam_Total && IaaS_Exam_Total <= 230){
		IaaS_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		IaaS_level = 'Advanced  ';
	}
	if(230< IaaS_Exam_Total){
		IaaS_cmt = 'No cultural barriers Role model DevOps implementation';
		IaaS_level = 'Extreme   ';
	}
	//ATM
	if(32< AMT_Exam_Total && AMT_Exam_Total <= 98){
		ATM_cmt = 'Foundational use of DevOps practices ';
		ATM_level = 'Beginer';
	}
	if(98< AMT_Exam_Total && AMT_Exam_Total<= 164){
		ATM_cmt = 'Stabilized use of DevOps practices ';
		ATM_level = 'Intermediate ';
	}
	if(164< AMT_Exam_Total && AMT_Exam_Total <= 230){
		ATM_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		ATM_level = 'Advanced  ';
	}
	if(230< AMT_Exam_Total){
		ATM_cmt = 'No cultural barriers Role model DevOps implementation';
		ATM_level = 'Extreme   ';
	}
	// continuous Development
	if(32< CD_Exam_Total && CD_Exam_Total <= 98){
		CDel_cmt = 'Foundational use of DevOps practices ';
		CDel_level = 'Beginer';
	}
	if(98< CD_Exam_Total && CD_Exam_Total <= 164){
		CDel_cmt = 'Stabilized use of DevOps practices ';
		CDel_level = 'Intermediate ';
	}
	if(164< CD_Exam_Total && CD_Exam_Total <= 230){
		CDel_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		CDel_level = 'Advanced  ';
	}
	if(230< CD_Exam_Total){
		CDel_cmt = 'No cultural barriers Role model DevOps implementation';
		CDel_level = 'Extreme   ';
	}
	//continuous deployment
	if(32< CDep_Exam_Total && CDep_Exam_Total <= 98){
		CDep_cmt = 'Foundational use of DevOps practices ';
		CDep_level = 'Beginer';
	}
	if(98< CDep_Exam_Total && CDep_Exam_Total <= 164){
		CDep_cmt = 'Stabilized use of DevOps practices ';
		CDep_level = 'Intermediate ';
	}
	if(164< CDep_Exam_Total && CDep_Exam_Total <= 230){
		CDep_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		CDep_level = 'Advanced  ';
	}
	if(230< CDep_Exam_Total){
		CDep_cmt = 'No cultural barriers Role model DevOps implementation';
		CDep_level = 'Extreme   ';
	}
	//continuous Monitor

	if(32< CMon_Exam_Total && CMon_Exam_Total <= 98){
		CMon_cmt = 'Foundational use of DevOps practices ';
		CMon_level = 'Beginer';
	}
	if(98< CMon_Exam_Total && CMon_Exam_Total <= 164){
		CMon_cmt = 'Stabilized use of DevOps practices ';
		CMon_level = 'Intermediate ';
		
	}

	if(164< CMon_Exam_Total && CMon_Exam_Total<= 230){
		CMon_cmt = 'Continuous improvement in place Team has the competence and confidence to use DevOps practicesCultural barriers have been overcome ';
		CMon_level = 'Advanced  ';
		console.log("CMon_Exam_Total: "+ CMon_Exam_Total);
	}
	if(230< CMon_Exam_Total){
		CMon_cmt = 'No cultural barriers Role model DevOps implementation';
		CMon_level = 'Extreme   ';
	}

  res.render('report', { p: aa, Total_cmt, Total_level, CM_cmt, CI_cmt, ATM_cmt, IaaS_cmt, CDel_cmt, CDep_cmt, CMon_cmt, CM_level,  CI_level, ATM_level, CDel_level, CDep_level, CMon_level, IaaS_level, CM_cmt, CMon_Exam_Total,AMT_Exam_Total, CDep_Exam_Total,IaaS_Exam_Total, CI_Exam_Total, Total, Conf_manage_Total, CD_Exam_Total, lable: aa, User
 
  });
});
//Exams
app.get('/Continuous_Integration',function(req, res, next){
	let sql = 'SELECT * FROM ci_questions ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('CI_Exam', {title: "EXAM ", items: row });
	});
	
});

app.get('/Configuration_Management',function(req, res, next){
	let sql = 'SELECT * FROM configuration_management ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('Configuration_Management_Exam', {title: "EXAM ", items: row });
	});

});

app.get('/IaaS_Exam',function(req, res, next){
	let sql = 'SELECT * FROM iaas ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('Iaas_Exam', {title: "EXAM ", items: row });
	});
	
});

app.get('/Automation_Testing',function(req, res, next){
	let sql = 'SELECT * FROM automation_testing ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('AMT_Exam', {title: "EXAM ", items: row });
	});
	
});
app.get('/Continuous_Delivery',function(req, res, next){
	let sql = 'SELECT * FROM continuous_delivery ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('CDelivery_Exam', {title: "EXAM ", items: row });
	});
	
});

app.get('/Continuous_Deployment',function(req, res, next){
	let sql = 'SELECT * FROM continuous_deployment ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('CDeploy_Exam', {title: "EXAM ", items: row });
	});
	
});

app.get('/Continuous_Monitoring',function(req, res, next){
	let sql = 'SELECT * FROM continuous_monitoring ORDER BY Rank';
	connection.query(sql,function(err, row,fields){
		if(err) throw err;
	res.render('CMonitoring_Exam', {title: "EXAM ", items: row });
	});
	
});
// For Admin Rights



////////////////////////////////////////////////////////////Post Method
app.post('/SignUp', function(req, res, next) {
    var uname = req.body.uname; 
	var lname = req.body.lname;
	var fname = req.body.fname;
	var Ename = req.body.email;
	var contact = req.body.contact;
	var Oname = req.body.Oname;
	/*
	let sqlQuery = "SELECT * FROM user WHERE Email = ? LIMIT 1"; 
	connection.query(sqlQuery, [Ename], function(error, results){ 
		// There was an issue with the query 
		if(error){ 
			callback(error); 
			return; 
		} 
	 
		if(results.length){ 
			// The username already exists 
			console.log(results.length);
			var exist = 'username is present in database';
			res.render('SignUp',{input: uname, lname, fname, contact, Oname, p: exist});
		}else{ 
			// The username wasn't found in the database 
			console.log('Not exists');
			var sql = "INSERT INTO  user(First_Name, Last_Name, Organization_Name, Email, Contact_Number, username, pass) VALUES('"+ req.body.fname +"', '"+ req.body.lname +"', '"+ req.body.Oname +"','"+ req.body.email +"','"+ req.body.contact +"','"+ req.body.uname +"','"+ req.body.password +"')";
				
			connection.query(sql,function (err, data) {
				if (err) throw err;
					console.log("record inserted....");
				});
			res.redirect('/Login');
		} 
	});*/


});

//User Login Page
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/Login', function(req, res, next) {
	
	var username = req.body.uname;
	var password = req.body.password;
	
	if (username && password) {
		connection.query('SELECT * FROM  user WHERE username = ? AND pass = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				User = username; // Globle variable
				res.redirect('/Configuration_Management');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

//Admin login
//Login Page
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/ADLogin', function(req, res, next) {
	
	var username = req.body.uname;
	var password = req.body.password;
	
	if (username && password) {
		connection.query('SELECT * FROM  admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				if(req.session.loggedin == true && req.session.username == username){
					app.get('/AdminRights', function(req, res){
					  res.render('AdminRights', {
						title: "Welcome to Home page"
					  });
					});
					//insert
					app.get('/CI_insert_questions', function(req, res){
					  res.render('CI_insert_Quetionnaire', {
						title: "Welcome to Home page"
					  });
					});
					app.get('/CM_insert_questions', function(req, res){
					  res.render('Configuration_insert_management', {
						title: "Welcome to Home page"
					  });
					});
					app.get('/IaaS_insert_questions', function(req, res){
					  res.render('IaaS_insert_Question', {
						title: "Welcome to Home page"
					  });
					});
					app.get('/AutoM_testing', function(req, res){
					  res.render('AutoM_testing_insert_Question', {
						title: "Welcome to Home page"
					  });
					});
					app.get('/CDelivery_insert_questions', function(req, res){
					  res.render('CDelivery_insert_Question', {
						title: "Welcome to Home page"
					  });
					});
					app.get('/CDeploy_insert_questions', function(req, res){
					  res.render('CDeploy_insert_Question', {
						title: "Welcome to Home page"
					  });
					});
					app.get('/CMonitor_insert_questions', function(req, res){
					  res.render('CMonitor_insert_Question', {
						title: "Welcome to Home page"
					  });
					});
					//Delete Questions
					app.get('/Conf_Manage_Delete_questions', function(req, res){
					  let sql = 'SELECT * FROM configuration_management';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('Conf_Manage_delete', {title: "EXAM ", items: row });
						});
					});
					app.get('/ATM_delete_questions', function(req, res){
					  let sql = 'SELECT * FROM automation_testing';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('ATM_delete', {title: "EXAM ", items: row });
						});
					});
					app.get('/CI_delete_questions', function(req, res){
					  let sql = 'SELECT * FROM ci_questions';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CI_delete', {title: "EXAM ", items: row });
						});
					});
					app.get('/CDel_delete_questions', function(req, res){
					  let sql = 'SELECT * FROM continuous_delivery';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CDel_delete', {title: "EXAM ", items: row });
						});
					});
					app.get('/CDep_delete_questions', function(req, res){
					  let sql = 'SELECT * FROM continuous_deployment';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CDep_delete', {title: "EXAM ", items: row });
						});
					});
					app.get('/IaaS_delete_questions', function(req, res){
					  let sql = 'SELECT * FROM iaas';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('IaaS_delete', {title: "EXAM ", items: row });
						});
					});
					app.get('/CMon_delete_questions', function(req, res){
					  let sql = 'SELECT * FROM continuous_monitoring';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CMon_delete', {title: "EXAM ", items: row });
						});
					});
					//Edit Questionnaire
					app.get('/Conf_Manage_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM configuration_management';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('Conf_Manage_Edit_Que', {title: "EXAM ", items: row });
						});
					});
					app.get('/ATM_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM automation_testing';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('ATM_Edit', {title: "EXAM ", items: row });
						});
					});
					app.get('/CI_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM ci_questions';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CI_Edit', {title: "EXAM ", items: row });
						});
					});
					app.get('/CDel_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM continuous_delivery';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CDel_Edit', {title: "EXAM ", items: row });
						});
					});
					app.get('/CDep_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM continuous_deployment';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CDep_Edit', {title: "EXAM ", items: row });
						});
					});
					app.get('/IaaS_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM iaas';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('IaaS_Edit', {title: "EXAM ", items: row });
						});
					});
					app.get('/CMon_Edit_questions', function(req, res){
					  let sql = 'SELECT * FROM continuous_monitoring';
						connection.query(sql,function(err, row,fields){
							if(err) throw err;
						res.render('CMon_Edit', {title: "EXAM ", items: row });
						});
					});
				}
				res.redirect('/AdminRights');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});
//Delete Questons

app.post('/CM_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM configuration_management WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});

app.post('/ATM_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM automation_testing WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});

app.post('/CDel_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM continuous_delivery WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});

app.post('/CDep_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM continuous_deployment WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});

app.post('/CI_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM ci_questions WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});

app.post('/IaaS_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM iaas WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});

app.post('/CMon_delete', function(req, res, next) {
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.select;
	for(var i = 0; i < rank.length; i++){
		 
		var sql = "DELETE FROM continuous_monitoring WHERE Rank = '"+ rank[i] +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/');
	
});
app.post('/Reset', function(req, res, next){
	var uname = req.body.uname;
	var pass = req.body.password;
	var Cpass = req.body.Cpassword;
	if(pass == Cpass){
		var sql = "UPDATE user SET pass = '"+ Cpass +"' WHERE username = '"+ uname +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
		});
		res.redirect('/Login');
	}
	res.redirect('/ResetPass');
});
//Edit Questionnaire

app.post('/Conf_M_Edit', function(req, res, next) {
    var rank = req.body.rank;
	var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	if(1<rank.length){
		for(var i = 0; i < rank.length; i++){
		 
			var sql = "UPDATE configuration_management SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			
			});
		}
	}
	else{
		var sql = "UPDATE configuration_management SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	
	res.redirect('/AdminRights');
});
app.post('/ATM_Edit', function(req, res, next) {
    var rank = req.body.rank;
	var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	if(1<rank.length){
		for(var i = 0; i < rank.length; i++){
		 
			var sql = "UPDATE automation_testing SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			
			});
		}
	}
	else{
		var sql = "UPDATE automation_testing SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/AdminRights');
});
app.post('/CI_Edit', function(req, res, next) {
	var rank = req.body.rank;
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	if(1<rank.length){
		for(var i = 0; i < rank.length; i++){
			var sql = "UPDATE ci_questions SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			});
		}
	}
	else{
		var sql = "UPDATE ci_questions SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
		});
	}
	res.redirect('/AdminRights');
});

app.post('/CDel_Edit', function(req, res, next) {
	var rank = req.body.rank;
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	if(1< rank.length){
		for(var i = 0; i < rank.length; i++){
		 
			var sql = "UPDATE continuous_delivery SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			
			});
		}
	}
	else{
		var sql = "UPDATE continuous_delivery SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/AdminRights');
});

app.post('/CDep_Edit', function(req, res, next) {
	var rank = req.body.rank;
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	 
	if(1< rank.length){
		for(var i = 0; i < rank.length; i++){
			var sql = "UPDATE continuous_deployment SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			});
		}
	}
	else{
		var sql = "UPDATE continuous_deployment SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
		});
	}
	
	res.redirect('/AdminRights');
});

app.post('/IaaS_Edit', function(req, res, next) {
	var rank = req.body.rank;
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	
	if(1<rank.length){
		for(var i = 0; i < rank.length; i++){
		 
			var sql = "UPDATE iaas SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			
			});
		}
	}
	else{
		var sql = "UPDATE iaas SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
			
		});
	}
	res.redirect('/AdminRights');
});

app.post('/CMon_Edit', function(req, res, next) {
	var rank = req.body.rank;
    var qname = req.body.question_name;
	var oA = req.body.A;
	var oB = req.body.B;
	var oC = req.body.C;
	var oD = req.body.D;
	var oE = req.body.E;
    var rank = req.body.rank;
	
	if(1<rank.length){
		for(var i = 0; i < rank.length; i++){
		 
			var sql = "UPDATE continuous_monitoring SET Question_Name = '"+ qname[i] +"', A = '"+ oA[i] +"', B= '"+ oB[i] +"', C='"+ oC[i] +"', D ='"+ oD[i] +"', E = '"+ oE[i] +"' WHERE Rank = '"+ rank[i] +"' ";
			connection.query(sql,function (err, data) {
				if (err) throw err;
			
			});
		}
	}
	else{
		var sql = "UPDATE continuous_monitoring SET Question_Name = '"+ qname +"', A = '"+ oA +"', B= '"+ oB +"', C='"+ oC +"', D ='"+ oD +"', E = '"+ oE +"' WHERE Rank = '"+ rank +"' ";
		connection.query(sql,function (err, data) {
			if (err) throw err;
		
		});
	}
	res.redirect('/AdminRights');
});

//insert Questions
app.post('/ci', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO ci_questions(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});
app.post('/configurationM', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO configuration_management(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});
app.post('/IaaS', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO iaas(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});
app.post('/AMT', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO automation_testing(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});
app.post('/continuousD', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO continuous_delivery(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});

app.post('/cdeploy', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO continuous_deployment(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});
app.post('/cmonitor', function(req, res, next) {
	 var rank = req.body.rank_no;
     var qname = req.body.question_name;
     var oA = req.body.A;
     var oB = req.body.B;
     var oC = req.body.C;
     var oD = req.body.D;
     var oE = req.body.E;
	
	var sql = "INSERT IGNORE INTO continuous_monitoring(Rank, Question_Name, A, B, C, D, E) VALUES('"+ rank +"','"+ qname +"', '"+ oA +"', '"+ oB +"', '"+ oC +"', '"+ oD +"', '"+ oE +"')";
	connection.query(sql,function (err, data) {
		if (err) throw err;
		res.redirect('/AdminRights');
	});
});
// Ans&Score

var Conf_manage_Total = 0;
var CI_Exam_Total = 0;
var IaaS_Exam_Total = 0;
var CD_Exam_Total = 0;
var CDep_Exam_Total = 0;
var AMT_Exam_Total = 0;
var CMon_Exam_Total = 0;
var Total = 0;

app.post('/Conf_manage_Exam', function(req, res, next) {
	CM_Ans = req.body.answer;
	for(i = 0; i < CM_Ans.length; i++)
	{
		if(CM_Ans[i] == 'A')
		{
			Conf_manage_Total = Conf_manage_Total+0;
		}
		if(CM_Ans[i] == 'B')
		{
			Conf_manage_Total = Conf_manage_Total+1;
		}
		if(CM_Ans[i] == 'C')
		{
			Conf_manage_Total = Conf_manage_Total+3;
		}
		if(CM_Ans[i] == 'D')
		{
			Conf_manage_Total = Conf_manage_Total+5;
		}
		if(CM_Ans[i] == 'E')
		{
			Conf_manage_Total = Conf_manage_Total+7;
		}
		
	}
	console.log('Configuration_Management');
	console.log(Conf_manage_Total);
	res.redirect('/Continuous_Integration');
});
app.post('/CI_Exam_Sub', function(req, res, next) {
	CI_Ans = req.body.answer;
	for(i = 0; i < CI_Ans.length; i++)
	{
		if(CI_Ans[i] == 'A')
		{
			CI_Exam_Total = CI_Exam_Total+0;
		}
		if(CI_Ans[i] == 'B')
		{
			CI_Exam_Total = CI_Exam_Total+1;
		}
		if(CI_Ans[i] == 'C')
		{
			CI_Exam_Total = CI_Exam_Total+3;
		}
		if(CI_Ans[i] == 'D')
		{
			CI_Exam_Total = CI_Exam_Total+5;
		}
		if(CI_Ans[i] == 'E')
		{
			CI_Exam_Total = CI_Exam_Total+7;
		}
		
	}
	console.log('Continuous_Integration');
	console.log(CI_Exam_Total);
	res.redirect('/Automation_Testing');
});
app.post('/IaaS_Exam_Sub', function(req, res, next) {
	IaaS_Ans = req.body.answer;
	for(i = 0; i < IaaS_Ans.length; i++)
	{
		if(IaaS_Ans[i] == 'A')
		{
			IaaS_Exam_Total = IaaS_Exam_Total+0;
		}
		if(IaaS_Ans[i] == 'B')
		{
			IaaS_Exam_Total = IaaS_Exam_Total+1;
		}
		if(IaaS_Ans[i] == 'C')
		{
			IaaS_Exam_Total = IaaS_Exam_Total+3;
		}
		if(IaaS_Ans[i] == 'D')
		{
			IaaS_Exam_Total = IaaS_Exam_Total+5;
		}
		if(IaaS_Ans[i] == 'E')
		{
			IaaS_Exam_Total = IaaS_Exam_Total+7;
		}
		
	}
	console.log('IaaS');
	console.log(IaaS_Exam_Total);
	res.redirect('/Continuous_Delivery');
});
app.post('/CD_Exam_Sub', function(req, res, next) {
	CDel_Ans = req.body.answer;
	for(i = 0; i < CDel_Ans.length; i++)
	{
		if(CDel_Ans[i] == 'A')
		{
			CD_Exam_Total = CD_Exam_Total+0;
		}
		if(CDel_Ans[i] == 'B')
		{
			CD_Exam_Total = CD_Exam_Total+1;
		}
		if(CDel_Ans[i] == 'C')
		{
			CD_Exam_Total = CD_Exam_Total+3;
		}
		if(CDel_Ans[i] == 'D')
		{
			CD_Exam_Total = CD_Exam_Total+5;
		}
		if(CDel_Ans[i] == 'E')
		{
			CD_Exam_Total = CD_Exam_Total+7;
		}
		
	}
	console.log('Continuous_Delivery');
	console.log(CD_Exam_Total);
	res.redirect('/Continuous_Deployment');
});
app.post('/CDep_Exam_Sub', function(req, res, next) {
	CD_Ans = req.body.answer;
	for(i = 0; i < IaaS_Ans.length; i++)
	{
		if(CD_Ans[i] == 'A')
		{
			CDep_Exam_Total = CDep_Exam_Total+0;
		}
		if(CD_Ans[i] == 'B')
		{
			CDep_Exam_Total = CDep_Exam_Total+1;
		}
		if(CD_Ans[i] == 'C')
		{
			CDep_Exam_Total = CDep_Exam_Total+3;
		}
		if(CD_Ans[i] == 'D')
		{
			CDep_Exam_Total = CDep_Exam_Total+5;
		}
		if(CD_Ans[i] == 'E')
		{
			CDep_Exam_Total = CDep_Exam_Total+7;
		}
		
	}
	console.log('Continuous_Deployment');
	console.log(CDep_Exam_Total);
	res.redirect('/Continuous_Monitoring');
});
app.post('/AMT_Exam_Sub', function(req, res, next) {
	AMT_Ans = req.body.answer;
	for(i = 0; i < AMT_Ans.length; i++)
	{
		if(AMT_Ans[i] == 'A')
		{
			AMT_Exam_Total = AMT_Exam_Total+0;
		}
		if(AMT_Ans[i] == 'B')
		{
			AMT_Exam_Total = AMT_Exam_Total+1;
		}
		if(AMT_Ans[i] == 'C')
		{
			AMT_Exam_Total = AMT_Exam_Total+3;
		}
		if(AMT_Ans[i] == 'D')
		{
			AMT_Exam_Total = AMT_Exam_Total+5;
		}
		if(AMT_Ans[i] == 'E')
		{
			AMT_Exam_Total = AMT_Exam_Total+7;
		}
		
	}
	console.log('Automation_Testing');
	console.log(AMT_Exam_Total);
	res.redirect('/IaaS_Exam');
});
app.post('/CMon_Exam_Sub', function(req, res, next) {
	CMonitor_Ans = req.body.answer;
	for(i = 0; i < CMonitor_Ans.length; i++)
	{
		if(CMonitor_Ans[i] == 'A')
		{
			CMon_Exam_Total = CMon_Exam_Total+0;
		}
		if(CMonitor_Ans[i] == 'B')
		{
			CMon_Exam_Total = CMon_Exam_Total+1;
		}
		if(CMonitor_Ans[i] == 'C')
		{
			CMon_Exam_Total = CMon_Exam_Total+3;
		}
		if(CMonitor_Ans[i] == 'D')
		{
			CMon_Exam_Total = CMon_Exam_Total+5;
		}
		if(CMonitor_Ans[i] == 'E')
		{
			CMon_Exam_Total = CMon_Exam_Total+7;
		}
		
	}
	console.log('Continuous_Monitoring');
	console.log(CMon_Exam_Total);
	Total = CDep_Exam_Total + CI_Exam_Total + IaaS_Exam_Total + CMon_Exam_Total+ Conf_manage_Total+ AMT_Exam_Total+ CD_Exam_Total;
	if(User != null){
		var sql = "INSERT IGNORE INTO user_answer(Name, Configuration_Management, Continuous_Integration, IaaS, Automation_Testing, Continuous_Delivery, Continuous_Monitoring, Continuous_Deployment, Total) VALUES('"+ User +"', '"+ Conf_manage_Total +"', '"+ CI_Exam_Total +"', '"+ IaaS_Exam_Total +"', '"+ AMT_Exam_Total +"', '"+ CD_Exam_Total +"', '"+ CMon_Exam_Total +"', '"+ CDep_Exam_Total +"', '"+ Total +"')";
		connection.query(sql,function (err, data) {
		if (err) throw err;
		});
	}
	res.redirect('/report');
});

/////////////////////////////////////////////////////////////
app.listen(8080,()=>{
  console.log('Server is running on port 8000');
});
