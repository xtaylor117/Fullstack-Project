import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import CommentForm from '../comment_form/comment_form'

class SongIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prevSong: this.props.prevSong,
            currentSong: this.props.currentSong,
            nextSong: {}
        }

        this.settingsAuth = this.settingsAuth.bind(this);
    }

    componentDidMount() {
        $("audio").on("play", function () {
            $("audio").not(this).each(function (index, audio) {
                audio.pause();
            });
        });
    }

    playSong() {
        let song;
        let background;
        let playbar;

        if (this.props.currentSong && this.props.currentSong.id != this.props.song.id) {
            background = document.getElementById(this.props.currentSong.id + 1000)
            background.style.backgroundImage = "url('https://sunnysounds-seed.s3-us-west-1.amazonaws.com/play_button.png')"
            this.props.receivePrevSong(this.props.currentSong.id)
            this.props.receiveCurrentSong(this.props.song.id)
        } else {
            this.props.receiveCurrentSong(this.props.song.id);
        }

        song = document.getElementById(this.props.song.id);
        background = document.getElementById(this.props.song.id + 1000)
        playbar = document.getElementById(this.props.song.id + 2000)
        
        if (song.paused) {
            // playbar.classList.toggle("play")
            background.style.backgroundImage = "url('https://sunnysounds-seed.s3-us-west-1.amazonaws.com/pause_button.png')"
            song.play()
        } else {
            // playbar.classList.toggle("play")
            background.style.backgroundImage = "url('https://sunnysounds-seed.s3-us-west-1.amazonaws.com/play_button.png')"
            song.pause()
        }
    }

    settingsAuth() {
        let songId = this.props.song.id;
        if (this.props.currentUser.id === this.props.song.artist_id) {
            return(
                <div className="song-edit-button">
                    <i className="fas fa-cogs"></i>
                    <div className="song-dropdown">
                        <button onClick={() => this.props.openModal({formType:"edit", song:this.props.song})}>Edit</button>
                        <button onClick={() => this.props.deleteSong(songId)}>Delete</button>
                    </div>
                </div>
            )
        }
    }

    render() {
        if (!this.props.artists[this.props.song.artist_id - 1]) return null

        const { title, artist_id, genre, id } = this.props.song;
        let name = this.props.artists[this.props.song.artist_id - 1]["username"]

        return (
            <>
                <div className="index-item-info">
                    <div className="item-info-left">
                        <div onClick={() => this.playSong()} className="custom-audio-player">
                        <img className='song-box-photo' src={this.props.photoUrl}/>
                            <button className="play-button" id={this.props.song.id + 1000} />
                            {/* <AudioPlayer /> */}
                            {/* <div className="playbar-controls" id={this.props.song.id + 2000} >
                                <button onClick={() => this.prevSong()} className="playbar-prev-song-button"><i className="fas fa-backward"></i></button>
                                <button onClick={() => this.playSong()} className="playbar-play-button"><i className="fas fa-play"></i></button>
                                <button onClick={() => this.pauseSong()} className="playbar-pause-button"><i className="fas fa-pause"></i></button>
                                <button onClick={() => this.nextSong()} className="playbar-next-song-button"><i className="fas fa-forward"></i></button>
                                <button className="playbar-volume-button"><i className="fa fa-volume"></i></button>
                            </div> */}
                            <audio controls className='audio-player' id={this.props.song.id}>
                                <source src={this.props.audioUrl} type="audio/mpeg" />   
                            </audio>
                        </div>
                        <div className="song-info">
                            <div className="index-item-genre">Genre: {genre}</div>
                            <div className="index-item-title">
                                <Link to={`/songs/${id}`}>{title}</Link>
                            </div>
                            <div className="index-item-artist">
                                <Link to={`/artists/${artist_id}`}>{name}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item-info-right">
                        <CommentForm songId={this.props.song.id} createComment={this.props.createComment} currentUser={this.props.currentUser}/>
                    </div>
                </div>
                {this.settingsAuth()}
            </>
        );
    }
}


export default withRouter(SongIndexItem);


