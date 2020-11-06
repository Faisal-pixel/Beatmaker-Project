class DrumKit {
    constructor () {
        this.pad = document.querySelectorAll('.pad');
        this.play = document.querySelector('.play')
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad(){
        this.classList.toggle('active');
    }
    repeat () {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach( bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            //Check if it contains active class
            if(bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++
    }

    start () {
        const interval = (60/this.bpm) * 1000;
        if (!this.isPlaying) {
         this.isPlaying =  setInterval(()=> {
                this.repeat()
            }, interval)            
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }

    }

    updateBtn () {
        if (!this.isPlaying) {
            this.play.innerHTML = 'Play';
            this.play.classList.remove('active')
        } else {
            this.play.innerHTML = 'Stop';
            this.play.classList.add('active')
        }
    }
    changeSound(e) {
        var selectName = e.target.name;
        var selectValue = e.target.value;

        switch (selectName) {
            case 'kick-select':
                this.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectValue;
            break;
        }
    }
    mute(e) {
        const muteBtnTracker = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            switch(muteBtnTracker) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch(muteBtnTracker) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }

    updateTempo(e) {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if (this.play.classList.contains('active')) {
            this.start();
        }
    }
}

var drumkit = new DrumKit();

drumkit.pad.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function() {
        pad.style.animation = '';
    })
})
drumkit.play.addEventListener('click', () => {
    drumkit.start();
    drumkit.updateBtn();
})
drumkit.selects.forEach(select => {
    select.addEventListener('change', function(e) {
        drumkit.changeSound(e)
    })
})

drumkit.muteBtn.forEach(mute => {
    mute.addEventListener('click', function(e) {
        drumkit.mute(e);
    })
})

drumkit.tempoSlider.addEventListener('input', function (e) {
    drumkit.changeTempo(e);
  })

drumkit.tempoSlider.addEventListener('change', function (e) {
    drumkit.updateTempo(e);
  })

