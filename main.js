(function () {

	var partialsCache = {}


function fetchFile(path,callback){
	
	var request = new XMLHttpRequest();
	
	// request.onload = function() {
	// 	callback(request.responseText);
	// 	var btn1 = document.getElementById("btn1");
	// 	btn1.addEventListener('click',function(event){
	// 	console.log(btn1);
	// 	},true);
		
	// }

	var str_join = "";
	request.onload = function() {
		console.log(path)
		callback(request.responseText);
		console.log(path);
	var db = openDatabase("mydb",'1.0','Test DB',2 * 1024 * 1024);
		db.transaction(function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS HEALTH (NAME unique, AGE, GENDER, PHOTO, MEDICATIONS, NOTES)');
				});
    var form = document.querySelector("form");
    var capture = document.querySelector("camera")
    console.log(form);
    console.log(path);
    if (path == "Health.html"){
    	console.log("In health");
    	form.onsubmit = submitted_2.bind(form);


    }
    else if (path == "Demographics.html"){
    	console.log("In Demographics");
    	form.onsubmit = submitted_1.bind(form);
    	capture.onclick = capture_1.bind(capture);
    }
    else
    {
    	
    	
    	db.transaction(function (tx){
    			var html = '<table align="center"><thead><th>NAME</th><th>AGE</th><th>GENDER</th><th>PHOTO</th><th>MEDICATIONS</th><th>NOTES</th></thead><tbody>';
				tx.executeSql('SELECT * FROM HEALTH',[],function(tx,data){
					for (var i = 0; i<data.rows.length;i++){
						html += '<tr><td'+ '</td><td bgcolor="#85C1E9">' + data.rows[i].NAME + '</td><td bgcolor="#76D7C4">' + data.rows[i].AGE  
                        + '</td><td bgcolor="#85C1E9">' + data.rows[i].GENDER + '</td><td bgcolor="#76D7C4">' + data.rows[i].PHOTO
                        + '</td><td bgcolor="#85C1E9">' + data.rows[i].MEDICATIONS + '</td><td bgcolor="#76D7C4">' + data.rows[i].NOTES+'</td></tr>';
					};
					 html += '</tbody></table>';
                    $('#myTab').html(html);
				});
				});
    	



    }
    console.log(str_join);	
    
function submitted_2(event,str_join){

		console.log("in html")
				// var queryString = decodeURIComponent(window.location.search);
				// queryString = queryString.substring(1);
				// var queries = queryString.split("&");
				// var str_join = queries[0]+queries[1];
				console.log(str_join);
				
				var medications = document.getElementById("med").value;
				var notes = document.getElementById("notes").value;
				console.log(medications);
				console.log(notes);

				
				console.log(str_join);
				db.transaction(function (tx) {
					tx.executeSql('UPDATE HEALTH SET NOTES = ?, MEDICATIONS = ? WHERE NAME = ?'[notes,medications,str_join]);
				});

				
	
}

function capture_1(event){

	var video = document.getElementById("video");
			
			var capture = document.getElementById("startbutton");
			
			

			navigator.getUserMedia = (navigator.getUserMedia || 
								 navigator.webkitGetUserMedia ||
								 navigator.mozGetUserMedia ||
								 navigator.msGetUserMedia);
			var video_properties = {video:true, audio:false};

			function onSuccess(stream)
			{
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}
			function onError(error)
			{
				console.log("Video capture error: ", error.code);
			}

			if (navigator.getUserMedia != null){
				navigator.getUserMedia(video_properties,onSuccess,onError);
			}
			else
			{
				alert("Webcam not working");
			}
}

function submitted_1(event) {
	
		console.log("In submit");
		var fname = document.getElementById("fname").value;
		var last_name = document.getElementById("last_name").value;
		var gender =document.getElementById("Gender").value;
		var notes = document.getElementById("notes").value;
		var age = document.getElementById("age").value;
		str_join = fname + " " + last_name;
		console.log(str_join);
		var photo = null;
		var medications = null;
		// var queryString = "?para1=" + fname + "&para2=" + last_name + "&para3=" + gender + "&para4=" +
		// notes + "&para5" + age;
		// window.location.href = "Demographics.html" + queryString;
		db.transaction(function (tx) {
				tx.executeSql('INSERT INTO HEALTH (NAME, AGE, GENDER, PHOTO, MEDICATIONS, NOTES) VALUES (?,?,?,?,?,?)', [str_join, age, gender, photo, medications, notes]);
				});
	
	
}
	}
	request.open("GET",path);
	request.send(null);
}



function getfragmentID(fragmentId,callback)
{
	if(partialsCache[fragmentId]){
		callback(partialsCache[fragmentId]);
	}else{
		fetchFile(fragmentId+".html",function (content) {

      // Store the fetched content in the cache.
      partialsCache[fragmentId] = content;

      // Pass the newly fetched content to the callback.
      callback(content);
    });
  }
	
}

function setActiveLink(fragmentId){
	var navbarDiv = document.getElementById("navbar");
	links = navbarDiv.children;
	 var i, link, pageName;
	for (i=0; i< links.length;i++)
	{
		link = links[i];
		pageName = link.getAttribute("href").substr(1);
		if (pageName == fragmentId){
			link.setAttribute("class","active");
		}
		else
		{
			link.removeAttribute("class");
		}
	}
	
}


function navigate(){
	var contentDiv = document.getElementById("content");
	fragmentId = location.hash.substr(1);

	getfragmentID(fragmentId, function (content) {
		contentDiv.innerHTML = content;
	});
	setActiveLink(fragmentId);
}

if(!location.hash){
	location.hash = "#Demographics";
}


// function save(){
// 	
// }

navigate();
//save();

window.addEventListener("hashchange", navigate)
//window.addEventListener("submit",save)
//window.onload = 

}());

