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

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');




const app = {
    currentIndex: 0,

    songs: [
        {
            name: 'Du cho tan the',
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
            name: 'Ngay dau sau chia tay',
            singer: 'Duc Phuc',
            path: './assets/music/Ngay Đầu Sau Chia Tay.mp3',
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

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;

            console.log(newCdWidth)
        }
    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        
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


