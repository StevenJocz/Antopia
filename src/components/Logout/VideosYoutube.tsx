import ReactPlayer from 'react-player/youtube'


interface YouTubeVideoProps {
    videoUrl: string | undefined | null;
}
const VideosYoutube: React.FC<YouTubeVideoProps> = ({ videoUrl }) => {
    if (!videoUrl) {
        return <div></div>;
    }
    return (
        <div>
            <ReactPlayer url={videoUrl} controls={true} width='100%'  />
        </div>
    );

}

export default VideosYoutube;