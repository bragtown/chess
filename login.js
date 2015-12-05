var loggedIn = false;
window.onload = function(){
	var validLogin = true;
	var myForm = document.getElementById("submit")
	if(myForm != null){
		myForm.addEventListener("click", function(){
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			var data = "userName="+username+"&password="+password;
			var xmlHTML = new XMLHttpRequest();
			xmlHTML.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
			xmlHTML.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlHTML.send(data);
			var response = JSON.parse(xmlHTML.response)
			console.log(response.result);
			if(response.result == "invalid"){
				document.getElementById("loginStatus").style.display = "block";
				validLogin = false;
			}
			if(validLogin == false && response.result == "valid"){
				document.getElementById("loginStatus").style.display = "none";
				validLogin = true;	
			}
			if(response.result == "valid"){
				var storage = username+' '+response.timestamp;
				localStorage.setItem('cs2550timestamp', storage);
				loggedIn = true;
			}
		});
	}
	var logout = document.getElementById("logout")
	if(logout != null){
		logout.addEventListener("click", function(){
			localStorage.removeItem('cs2550timestamp');
			document.getElementById('userInfo').innerHTML = localStorage.getItem('cs2550timestamp');
		});
	}
}

