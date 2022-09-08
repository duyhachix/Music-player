// Function Step by step
/**
 * 1. render songs
 * 2. scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Previos / next
 * 6. Random
 * 7. Next / repeat when ended
 * 8. Active song
 * 9. scroll active song into view
 * 10. play song when click
 */

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let playlist = $('.playlist');
console.log('danh sách playlits', playlist);

let cd = $('.cd');
let player = $('.player');
let heading = $('header h4');
let cdThumb = $('.cd-thumb');
let audio = $('#audio');

let playBtn = $('.btn-toggle-play');

// songs list
const app = {
	currentIndex: 0,
	songs: [
		{
			name: 'Out of time',
			singer: 'The Weekend',
			path: './assets/Music/Out Of Time - The Weeknd.mp3',
			image: './assets/img/images.jpg',
		},
		{
			name: 'Late night talking',
			singer: 'Harry Styles',
			path: './assets/Music/LateNightTalking-HarryStyles-7448116.mp3',
			image: './assets/img/latenighttalking.png',
		},
		{
			name: 'Chronologie 4',
			singer: 'Jean Michel Jarre',
			path: './assets/Music/Chronologie4-JeanMichelJarre-3226085.mp3',
			image:
				'./assets/img/chronologie-part-4--vente-speciale-juke-box--p-image-97314-grande.jpg',
		},
		{
			name: 'Havana',
			singer: 'Camila Cabello',
			path: './assets/Music/Havana-CamilaCabelloYoungThug-5817730.mp3',
			image: './assets/img/havana.jpg',
		},
		{
			name: 'Love yourself',
			singer: 'Justin Bieber',
			path: './assets/Music/LoveYourself-JustinBieber-5319409.mp3',
			image: './assets/img/loveyourself.jpg',
		},
		{
			name: 'Dusk till dawn',
			singer: 'Zayn',
			path: './assets/Music/DuskTillDawn-ZaynSia-5164057.mp3',
			image: './assets/img/dusktilldawn.jpg',
		},
	],

	// 1.render list songs
	render: function () {
		console.log(123);
		let html = this.songs.map((song) => {
			return `
      <div class="song">
					<div class="thumb">
						<img src="${song.image}" alt="" />
					</div>
					<div class="body">
						<h3 class="title">${song.name}</h3>
						<p class="author">${song.singer}</p>
					</div>
					<div class="option">
						<i class="fa-solid fa-circle-chevron-down"></i>
					</div>
				</div>`;
		});
		$('.playlist').innerHTML = html.join('');
	},

	// 2. scroll top
	handleEvents: function () {
		document.onscroll = function () {
			// let cd = $('.cd');
			let cdWidth = cd.offsetWidth;

			// xử lí Zoom in/  zoomout cd
			document.onscroll = function () {
				let scrollTop =
					window.scrollY || document.documentElement.scrollTop;
				// console.log(window.scrollY);
				console.log('croll top: ', scrollTop);
				let newCdWidth = cdWidth - scrollTop;
				// console.log(newCdWidth);
				console.log('new cd width: ', newCdWidth);
				cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
				cd.style.opacity = newCdWidth / cdWidth;
			};

			// xử lí Click play
			playBtn.onclick = function () {
				audio.play();
				player.classList.add('playing');
			};
		};
	},

	// Play, pause
	defineProperties: function () {
		// cần đọc đọc phần Object.defineProperty
		Object.defineProperty(this, 'currentSong', {
			get: function () {
				return this.songs[this.currentIndex];
			},
		});
	},

	loadCurrentSong() {
		// get element cần thiết để làm việc với các element này

		heading.textContent = this.currentSong.name;
		cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
		audio.src = this.currentSong.path;

		// console.log(heading, cdThumb, audio);
	},

	start: function () {
		// định nghĩa các thuộc tính
		this.defineProperties();

		// load thông tin bài hát đầu tiên vào UI khi chạy app
		this.loadCurrentSong();

		// lắng nghe, xử lí các event (DOM events)
		this.handleEvents();

		// render playlist
		this.render();
	},
};

app.start();
