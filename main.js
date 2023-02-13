// Function Step by step
/**
 * 1. render songsList -> ok
 * 2. scroll top -> ok
 * 3. Play / pause / seek (progress) -> ok
 * 4. CD rotate -> ok
 * 5. Previos / next
 * 6. Random
 * 7. Next / repeat when ended
 * 8. Active song
 * 9. scroll active song into view
 * 10. play song when click
 */

// khai báo biến
// bind
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
// khai báo
let playlist = $('.playlist');
let cd = $('.cd');
let player = $('.player');
let heading = $('header h4');
let cdThumb = $('.cd-thumb');
let audio = $('#audio');
let playBtn = $('.btn-toggle-play');
let progress = $('#progress');
let prevBtn = $('.btn-prev');
let nextBtn = $('.btn-next');
let randomBtn = $('.btn-random');

// songsList list
const app = {
	currentIndex: 0,
	isPlaying: false,
	isShuffling: false,
	songsList: [
		{
			name: 'Flower',
			singer: 'Miley Cyrus',
			path: './assets/Music/Flowers - Miley Cyrus.mp3',
			image: './assets/img/1673583001776_640.jpg',
		},
		{
			name: 'Co don tren Sofa',
			singer: 'Ho Ngoc Ha',
			path: './assets/Music/Co Don Tren Sofa - Ho Ngoc Ha - NhacHay360.mp3',
			image: './assets/img/1666185034236_300.jpg',
		},
		{
			name: 'Di vang nhat nhoa',
			singer: 'Ha Nhi',
			path: './assets/Music/Di Vang Nhat Nhoa - Ha Nhi - NhacHay360.mp3',
			image: './assets/img/1542009008716_300.jpg',
		},
		{
			name: 'Chuyen doi ta',
			singer: 'EmceeL ft Muoi',
			path: './assets/Music//Chuyen Doi Ta - Emcee L (Da LAB), Muoii - NhacHay360.mp3',
			image: './assets/img/1637809824703_300.jpg',
		},
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

	// start app
	start: function () {
		// định nghĩa các thuộc tính
		this.defineProperties();

		// lắng nghe, xử lí các event tuong tac (DOM events)
		this.handleEvents();

		// load thông tin bài hát đầu tiên vào UI khi chạy app
		this.loadCurrentSong();

		// render playlist
		this.render();
	},

	// render list songsList
	render: function () {
		let html = this.songsList.map((song, index) => {
			return `
				<div class="song ${index === this.currentIndex ? 'active' : ''}">
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

	// Play, pause
	defineProperties: function () {
		// cần đọc đọc phần Object.defineProperty
		Object.defineProperty(this, 'currentSong', {
			get: function () {
				return this.songsList[this.currentIndex];
			},
		});
	},

	/**
	 * loading current song
	 */
	loadCurrentSong() {
		// get element cần thiết để làm việc với các element này
		heading.textContent = this.currentSong.name;
		cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
		audio.src = this.currentSong.path;
	},

	/**
	 * handling all events function
	 */
	handleEvents: function () {
		let _this = this;

		// scroll to zoom in/out CD image
		let cdWidth = cd.offsetWidth;
		document.onscroll = function () {
			let scrollTopPosition =
				window.scrollY || document.documentElement.scrollTop;

			let newCdWidth = cdWidth - scrollTopPosition;

			cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
			cd.style.opacity = newCdWidth / cdWidth;
		};

		// xử lí Click play/pause
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		};

		// khi song played
		audio.onplay = function () {
			_this.isPlaying = true;
			player.classList.add('playing');
			cdThumbAnimate.play();
		};

		//khi song paused
		audio.onpause = function () {
			_this.isPlaying = false;
			player.classList.remove('playing');
			cdThumbAnimate.pause();
		};

		// progressing
		audio.ontimeupdate = function () {
			if (audio.duration) {
				let progressPercent = Math.floor(
					(audio.currentTime / audio.duration) * 100
				);
				progress.value = progressPercent;
			}
		};

		// Xử lý khi tua song o progress bar
		progress.onchange = function (e) {
			let seekTime = (audio.duration / 100) * e.target.value;
			audio.currentTime = seekTime;
		};

		// 4. CD rotate
		let cdThumbAnimate = cdThumb.animate(
			[
				{
					transform: 'rotate(360deg)',
				},
			],
			{
				duration: 10000,
				iteration: Infinity,
			}
		);
		cdThumbAnimate.pause();
		console.log('This is: ', cdThumbAnimate);

		// prev song button click handler
		prevBtn.onclick = function () {
			if (_this.isShuffling) {
				_this.randomSong();
			} else {
				_this.prevSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};

		// next song button clicking handler
		nextBtn.onclick = function () {
			if (_this.isShuffling) {
				_this.randomSong();
			} else {
				_this.nextSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};

		randomBtn.onclick = function (e) {
			_this.isShuffling = !_this.isShuffling;
			randomBtn.classList.toggle('active', _this.isShuffling);
		};

		audio.onended = function () {
			console.log(12313212312);
			if (_this.isShuffling) {
				_this.randomSong();
			}
			_this.nextSong();
			audio.play();
		};
	},

	// prev song function
	prevSong() {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songsList.length - 1;
		}
		this.loadCurrentSong();
	},

	// next song function
	nextSong() {
		this.currentIndex++;
		if (this.currentIndex >= this.songsList.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},

	// random btn handler function
	randomSong() {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.songsList.length);
		} while (newIndex === this.currentIndex);

		this.currentIndex = newIndex;
		this.loadCurrentSong();
	},

	scrollToActiveSong() {
		setTimeout(() => {
			$('.song.active').scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		}, 500);
	},
};

// run app when start
app.start();
