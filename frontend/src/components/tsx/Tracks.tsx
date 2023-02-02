import Track from './Track';
import { ReactElement } from 'react';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTrackContext } from '../../context/TrackContextProvider';
import { useTracksContext } from '../../context/TracksContextProvider';
import axios from '../../api/axios';
import '../css/tracks.css';
const LAST_PLAY_URL = '/user/tracking/lastPlay/';

const Tracks = (): ReactElement => {
    const { updateTrackContextState } = useTrackContext();
    const {
        tracksContextState: { tracks }
    } = useTracksContext();

    const setLastPlaying = (trackId: string | any) => () => {
        axios
            .patch(`${LAST_PLAY_URL}${trackId}`, JSON.stringify({ trackId }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(() => {
                updateTrackContextState({ selectedTrackId: trackId });
            });
    };

    return (
        <div className="tracks-container overflow-auto">
            <div className="tracks-header d-flex flex-column text-white align-items-center">
                <div className="tracks-title mt-5">Thư viện</div>
            </div>
            <div className="playlist-view-content-container d-flex flex-column">
                <div className="track-data-header d-flex text-white">
                    <div className="index-header me-5">#</div>
                    <div className="title-header ms-3">TIÊU ĐỀ</div>
                    <div className="created-at">NGÀY TẠO</div>
                    <div className="duration">
                        <FontAwesomeIcon
                            icon={faClockFour}
                            color="white"
                            className="clock-font"
                            title="duration"
                        />
                    </div>
                </div>
                <div className="playlist-track-content d-flex flex-column mb-5">
                    {tracks.map((track, index) => (
                        <div
                            className="set-track"
                            onClick={setLastPlaying(track._id)}
                            key={track._id}
                        >
                            <Track item={track} itemIndex={index} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tracks;
