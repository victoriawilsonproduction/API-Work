var loggedInUser = null;
$('#login').click(function(){
	fetch('http://jsonplaceholder.typicode.com/users?username=' + $('#username').val())
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			var user = json[0];

			$('#loginForm').hide();
			$('#homepage').show();

			$('#name').html(user.name);

			loggedInUser = user;

			var userPosts = fetch('http://jsonplaceholder.typicode.com/posts?userId=' + user.id);
			var userAlbums = fetch('http://jsonplaceholder.typicode.com/albums?userId=' + user.id);

			return Promise.all([userPosts, userAlbums]);
		})
		.then(function(results){
			var posts = results[0].json();
			var albums = results[1].json();

			posts.forEach(function(post){
				var li = $('<li></li>');
				li.text(post.title);
				$('#posts').append(li);
			})

			albums.forEach(function(album){
				var li = $('<li></li>');
				li.text(album.title);
				$('#albums').append(li);
			})
		})
		.catch(function(error){
			alert(error);
		})
});

