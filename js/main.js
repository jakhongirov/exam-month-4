//Element DOM List
const elUsersList = document.querySelector('.users__list');
const elPostsList = document.querySelector('.posts__list');
const elCommentsList = document.querySelector('.comments__list');

//Element template
const elUsersTemplate = document.querySelector('.users__template').content;
const elPostsTempalte = document.querySelector('.posts__template').content;
const elCommentsTemplate = document.querySelector(
	'.comments__template',
).content;

//Links
const usersLink = 'https://jsonplaceholder.typicode.com/users';
const postsLink = 'https://jsonplaceholder.typicode.com/posts';
const commentsLink = 'https://jsonplaceholder.typicode.com/comments?postId=';
const geoLink = 'https://www.google.com/maps/place/';

//ARR
let users = [];
let posts = [];
let comments = [];

// Function USERS
function renderUesrs(arr, node) {
	node.innerHTML = null;

	const fragmetList = document.createDocumentFragment();

	arr.forEach((user) => {
		const clonedUsersTemplate = elUsersTemplate.cloneNode(true);

		clonedUsersTemplate.querySelector('.btn-post').dataset.userId = user.id;
		clonedUsersTemplate.querySelector('.username').textContent =
			user.username;
		clonedUsersTemplate.querySelector('.user__full--name').textContent =
			user.name;
		clonedUsersTemplate.querySelector('.user__email').href =
			'mailto:' + user.email;
		clonedUsersTemplate.querySelector('.user__email').textContent =
			user.email;
		clonedUsersTemplate.querySelector('.user__website').href = user.website;
		clonedUsersTemplate.querySelector('.user__address').textContent =
			user.address.street +
			' ' +
			user.address.suite +
			' ' +
			user.address.city +
			' ' +
			user.address.zipcode;
		clonedUsersTemplate.querySelector('.user__geo').href =
			geoLink + user.address.geo.lat + ',' + user.address.geo.lng;

		fragmetList.appendChild(clonedUsersTemplate);
	});

	node.appendChild(fragmetList);
}

// Function POSTS
function renderPosts(arr, node) {
	node.innerHTML = null;

	const fragmetList = document.createDocumentFragment();

	arr.forEach((post) => {
		const clonedPostsTemplate = elPostsTempalte.cloneNode(true);

		clonedPostsTemplate.querySelector('.btn-comment').dataset.postsID =
			post.id;
		clonedPostsTemplate.querySelector('.post__title').textContent =
			post.title;
		clonedPostsTemplate.querySelector('.post__text').textContent = post.body;

		fragmetList.appendChild(clonedPostsTemplate);
	});

	node.appendChild(fragmetList);
}

// Function COMMENTS
function renderComments(arr, node) {
	node.innerHTML = null;

	const fragmetList = document.createDocumentFragment();

	arr.forEach((comment) => {
		const clonedCommentsTemplate = elCommentsTemplate.cloneNode(true);

		clonedCommentsTemplate.querySelector(
			'.comments__item',
		).dataset.commentID = comment.postId;
		clonedCommentsTemplate.querySelector('.comment__title').textContent =
			comment.name;
		clonedCommentsTemplate.querySelector('.user__email-comment').href =
			'mailto:' + comment.email;
		clonedCommentsTemplate.querySelector('.user__email-comment').textContent =
			comment.email;
		clonedCommentsTemplate.querySelector('.comment__text').textContent =
			comment.body;

		fragmetList.appendChild(clonedCommentsTemplate);
	});

	node.appendChild(fragmetList);
}

// Async Function USERS
async function getUsers() {
	const res = await fetch(usersLink);

	const data = await res.json();

	users = data;

	renderUesrs(users, elUsersList);
}

// Async Function POSTS
async function getPosts() {
	const res = await fetch(postsLink);

	const data = await res.json();

	posts = data;
}

// Async Function COMMENTS
async function getComments(page) {
	const res = await fetch(commentsLink + page);

	const data = await res.json();

	comments = data;

	renderComments(comments, elCommentsList);
}

// listened users list
elUsersList.addEventListener('click', function (evt) {
	if (evt.target.matches('.btn-post')) {
		const userId = evt.target.dataset.userId;

		const foundPost = posts.filter((post) => post.userId == userId);

		elPostsList.innerHTML = null ; 
		elCommentsList.innerHTML = null;
		
		renderPosts(foundPost, elPostsList);
	}
});

//listened posts list
elPostsList.addEventListener('click', (evt) => {
	if (evt.target.matches('.btn-comment')) {
		const postId = evt.target.dataset.postsID;

		const foundcomment = Number(
			comments.find((comment) => postId === comment.postId),
		);

		getComments(postId);
	}
});

getUsers();
getPosts();
// getComments(1);
