import React from 'react'
import SongIndexItem from './song_index_item'

class SongIndex extends React.Component {
    constructor(props) {
        super(props)
        
        this.lastUpload = this.lastUpload.bind(this)
    }

    componentDidMount() {
        this.props.receiveAllArtists()
            .then(this.props.receiveAllSongs())
    }


    lastUpload() {
        if (this.props.latestSong) {
            return(
                this.props.songs.filter(song => (
                    song.id === this.props.latestSong.id
                )).map(song => (
                    <SongIndexItem
                        song={song}
                        key={song.id}
                        audioUrl={song.audioUrl}
                        photoUrl={song.photoUrl}
                        currentUser={this.props.currentUser}
                        openModal={this.props.openModal}
                        deleteSong={this.props.deleteSong}
                        artists={this.props.artists}
                        receiveSong={this.props.receiveSong}
                    />
                ))   
            )
        }
    }
    
    render() {
        const currentUser = this.props.currentUser
        // debugger
        return(
            <div className='discovery-container'>
                <div className='discovery-left'>
                {/* <h1>Discover More! </h1> */}
                    {this.props.songs.map(song => (
                        <SongIndexItem
                            songs={this.props.songs}
                            song={song}
                            key={song.id}
                            audioUrl={song.audioUrl}
                            photoUrl={song.photoUrl}
                            currentUser={currentUser}
                            openModal={this.props.openModal}
                            deleteSong={this.props.deleteSong}
                            artists={this.props.artists}
                            receiveSong={this.props.receiveSong}
                        />
                    ))}
                </div>
                <div className='discovery-sidebar'>
                    <div className="latest-upload" >
                        <h3>Your Last Upload</h3>
                        {this.lastUpload()}
                    </div>
                    <div className='comments-container'>
                        <h3>Recent Comments</h3>
                        <div className="recent-comments">
                            <p>This song really bumps. Keep up the great work! I'll make sure to share this around.</p>
                            <p>OOOH!</p>
                            <p>I listen to this when I need help falling asleep!</p>
                        </div>
                    </div>
                    <div className='link-container'>
                        <h3>Click These Links</h3>
                        <ul className='affiliate-links'>
                            <li><a href="https://www.instagram.com/soundcloud/?hl=en">Instagram</a></li>
                            <li><a href="https://twitter.com/scsupport?lang=en">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
} 


export default SongIndex;