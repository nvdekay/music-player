/*
    1. Render songs
    2. Scroll top
    3. Play / pause / seek
    4. CD rotate
    5. Next / prev
    6. Random
    7. Next / Repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');




const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Dù Cho Tận Thế',
            singer: 'Erik',
            path: './assets/music/Dù Cho Tận Thế.mp3',
            image: './assets/img/Du cho tan the.jpg'
        },
        {
            name: 'Dat nuoc tron niem vui',
            singer: 'Ta Minh Tam',
            path: './assets/music/Đất Nước Trọn Niềm Vui.mp3',
            image: './assets/img/Dat nuoc tron niem vui.jpg'
        },
        {
            name: 'Dung lam trai tim anh dau',
            singer: 'Son Tung M-TP',
            path: './assets/music/Đừng Làm Trái Tim Anh Đau.mp3',
            image: './assets/img/Dung lam trai tim anh dau.jpg'
        },
        {
            name: 'Ngày Đầu Sau Chia Tay',
            singer: 'Duc Phuc',
            path: './assets/music/Ngày Đầu Sau Chia Tay.mp3',
            image: './assets/img/Ngay dau sau chia tay.jpg'
        },
        {
            name: 'Phep mau',
            singer: 'Minh Toc',
            path: './assets/music/Phép Màu.mp3',
            image: './assets/img/Phep mau.jpg'
        }
    ],

    render: function () {
        const htmls = this.songs.map((song) => {
            return `
                <div class="song">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth;

        // Xử lý khi scroll playlist (phóng to/thu nhỏ cd)
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;

            console.log(newCdWidth)
        }

        // Xử lý khi click vào play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Xử lý CD quay/dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Khi bài hát được play
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi bài hát bị pause
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // Xử lý khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = Math.floor(e.target.value * audio.duration / 100);
            audio.currentTime = seekTime;
        }

        // Xử lý khi next bài hát
        nextBtn.onclick = function () {
            app.nextSong();
            audio.play();
            app.render();
        }

        // Xử lý khi previus bài hát
        prevBtn.onclick = function () {
            app.preSong();
            audio.play();
            app.render();
        }

    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

    },
    // Next Song
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            app.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    // Previus Song
    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            app.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe và xử lí các sự kiện
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render ra danh sách bài hát (playlist)
        this.render();
    }
}

app.start();


