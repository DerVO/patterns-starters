enum VideoPlayerStates {
    READY = 'READY',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    STOPPED = 'STOPPED'
}

class VideoPlayer {

    private STATE: VideoPlayerStates = VideoPlayerStates.READY;

    public play() {
        if (this.STATE === VideoPlayerStates.READY || this.STATE === VideoPlayerStates.STOPPED) {
            console.log('Start playing');
            this.STATE = VideoPlayerStates.PLAYING;
        } else if (this.STATE === VideoPlayerStates.PLAYING) {
            console.log('Already Playing, do nothing');
        } else if (this.STATE === VideoPlayerStates.PAUSED) {
            console.log('Resume Playing');
        } else {
            console.log('Unknown State');
        }
    }

    public stop(){
        if (this.STATE === VideoPlayerStates.READY || this.STATE === VideoPlayerStates.STOPPED) {
            console.log('Not playing, do nothing');
        } else if (this.STATE === VideoPlayerStates.PLAYING) {
            console.log('Pause');
            this.STATE = VideoPlayerStates.PAUSED;
        } else if (this.STATE === VideoPlayerStates.PAUSED) {
            console.log('Stop');
            this.STATE = VideoPlayerStates.STOPPED;
        } else {
            console.log('Unknown State');
        }
    }
}

// todo: video player starts with a video at position 0 ready to play
const videoPlayer = new VideoPlayer();

// todo: if ready: play the video
videoPlayer.play();

// todo: if already playing: do nothing
videoPlayer.play();

// todo: if was playing: stop the video at current position (pause)
videoPlayer.stop();

// todo: if paused: return to start position
videoPlayer.stop();
